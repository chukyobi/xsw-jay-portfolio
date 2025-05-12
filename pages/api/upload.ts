import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";
import formidable, { type Options } from "formidable";
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';


interface ExtendedOptions extends Options {
  progressHandler?: (bytesReceived: number, bytesExpected: number) => void;
}


const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);


type ProgressEvent = {
  type: 'fileUpload' | 'storageUpload';
  progress: number;
};

type CompleteEvent = {
  type: 'complete';
  url: string;
};

type ErrorEvent = {
  type: 'error';
  message: string;
};

type SSEEvent = ProgressEvent | CompleteEvent | ErrorEvent;

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false, 
  },
};


const sendEvent = (res: NextApiResponse, event: SSEEvent) => {
  res.write(`data: ${JSON.stringify(event)}\n\n`);
  
  const response = res as NextApiResponse & { flush?: () => void };
  if (response.flush && typeof response.flush === 'function') {
    response.flush();
  }
};


const uploadToSupabaseWithProgress = async (
  filePath: string, 
  fileName: string, 
  mimeType: string,
  res: NextApiResponse
) => {
  try {
    
    const stats = await fs.promises.stat(filePath);
    const totalSize = stats.size;
    
    
    sendEvent(res, { type: 'storageUpload', progress: 0 });
    
    
    sendEvent(res, { type: 'storageUpload', progress: 25 });
    const fileBuffer = await fs.promises.readFile(filePath);
    
    
    sendEvent(res, { type: 'storageUpload', progress: 50 });
    
    
    const uint8Array = Uint8Array.from(fileBuffer); 
    
    
    sendEvent(res, { type: 'storageUpload', progress: 75 });
    
    
    const { data, error } = await supabase.storage
      .from('projects')
      .upload(fileName, uint8Array, {
        contentType: mimeType || 'application/octet-stream',
        upsert: false,
      });
      
    
    sendEvent(res, { type: 'storageUpload', progress: 100 });
    
    if (error) throw error;
    
    
    const { data: urlData } = supabase.storage
      .from('projects')
      .getPublicUrl(fileName);
    
    if (!urlData || !urlData.publicUrl) {
      throw new Error('Failed to retrieve public URL');
    }
    
    return { publicUrl: urlData.publicUrl };
  } catch (error) {
    throw error;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  
  let lastProgressSent = 0;
  const form = formidable({
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    filter: (part) => {
      // Only accept images and PDFs
      return (
        part.name === 'file' && 
        (part.mimetype?.includes('image/') || part.mimetype === 'application/pdf')
      );
    },
    progressHandler: (bytesReceived, bytesExpected) => {
      const progress = Math.round((bytesReceived / bytesExpected) * 100);
      
      
      if (progress - lastProgressSent >= 5 || progress === 100) {
        lastProgressSent = progress;
        sendEvent(res, { type: 'fileUpload', progress });
      }
    }
  } as ExtendedOptions);

  try {
    // Parse the form
    const [fields, files] = await form.parse(req);
    
    // Get the file from the form data
    const file = files.file?.[0];
    
    if (!file) {
      sendEvent(res, { type: 'error', message: 'No file uploaded' });
      return res.end();
    }

    // Extract file information
    const fileExtension = path.extname(file.originalFilename || '').slice(1);
    if (!fileExtension) {
      sendEvent(res, { type: 'error', message: 'Invalid file extension' });
      return res.end();
    }

    // Generate a unique file name
    const fileName = `${randomUUID()}.${fileExtension}`;
    
    try {
      // Ensure the file exists
      const fileStats = await fs.promises.stat(file.filepath);
      if (fileStats.size === 0) {
        sendEvent(res, { type: 'error', message: 'File is empty' });
        return res.end();
      }
      
      // Upload to Supabase with progress tracking
      let publicUrl;
      try {
        const result = await uploadToSupabaseWithProgress(
          file.filepath,
          fileName,
          file.mimetype || 'application/octet-stream',
          res
        );
        publicUrl = result.publicUrl;
      } catch (uploadError) {
        sendEvent(res, { 
          type: 'error', 
          message: uploadError instanceof Error ? uploadError.message : 'Upload process failed' 
        });
        
        // Clean up the temporary file on error
        await fs.promises.unlink(file.filepath).catch(err => {
          console.warn('Failed to delete temporary file after upload error:', err);
        });
        
        return res.end();
      }
      
      // Send completion event with URL
      sendEvent(res, { type: 'complete', url: publicUrl });
      
      // Clean up the temporary file
      await fs.promises.unlink(file.filepath).catch(err => {
        console.warn('Failed to delete temporary file:', err);
      });
      
      // End the response
      return res.end();
      
    } catch (error) {
      console.error('Supabase upload error:', error);
      sendEvent(res, { 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Upload failed' 
      });
      
      // Clean up the temporary file on error as well
      await fs.promises.unlink(file.filepath).catch(err => {
        console.warn('Failed to delete temporary file after error:', err);
      });
      
      return res.end();
    }

  } catch (error) {
    console.error('Upload process error:', error);
    sendEvent(res, { 
      type: 'error', 
      message: error instanceof Error ? error.message : 'Upload process failed' 
    });
    return res.end();
  }
}
