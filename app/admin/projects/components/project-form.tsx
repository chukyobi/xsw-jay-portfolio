"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  X,
  Check,
  ImageIcon,
  FileText,
  AlertCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProject, updateProject, deleteProject } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";
import type { Project } from "@/lib/types";
import {
  projectFormSchema,
  type ProjectFormData,
  ProjectStatus,
} from "@/lib/validations/project";

type SSEEvent =
  | { type: "fileUpload"; progress: number }
  | { type: "storageUpload"; progress: number }
  | { type: "complete"; url: string }
  | { type: "error"; message: string };

const isValidSSEEvent = (event: unknown): event is SSEEvent => {
  if (!event || typeof event !== "object") return false;
  const e = event as Record<string, unknown>;

  if (!("type" in e)) return false;

  switch (e.type) {
    case "fileUpload":
    case "storageUpload":
      return typeof e.progress === "number";
    case "complete":
      return typeof e.url === "string";
    case "error":
      return typeof e.message === "string";
    default:
      return false;
  }
};

interface ProjectFormProps {
  project?: Project;
  isEditing?: boolean;
}

export function ProjectForm({ project, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const [uploadState, setUploadState] = useState<{
    fileProgress: number;
    storageProgress: number;
    status: "idle" | "uploading" | "complete" | "error";
  }>({
    fileProgress: 0,
    storageProgress: 0,
    status: "idle",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      long_description: project?.long_description || "",
      thumbnail_url: project?.thumbnail_url || "",
      github_url: project?.github_url || "",
      live_url: project?.live_url || "",
      technologies: project?.technologies || [],
      category: project?.category || "",
      status: project?.status ?? "published",
    },
  });

  const watchThumbnailUrl = watch("thumbnail_url");

  useEffect(() => {
    if (watchThumbnailUrl) {
      setPreviewUrl(watchThumbnailUrl);
    }
  }, [watchThumbnailUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const cleanup = () => {
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setPreviewUrl(null);
    setUploadError(null);
    setUploadState({
      fileProgress: 0,
      storageProgress: 0,
      status: "idle",
    });
  };

  useEffect(() => {
    return cleanup;
  }, []);

  const [techInput, setTechInput] = useState("");

  const currentTechnologies = watch("technologies") || [];

  useEffect(() => {
    setTechInput(currentTechnologies.join(", "));
  }, [currentTechnologies]);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError(
        `File size exceeds 10MB limit (${(file.size / (1024 * 1024)).toFixed(
          2
        )}MB)`
      );
      return;
    }

    setIsDragging(false);
    setUploadError(null);

    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    setUploadState({
      fileProgress: 0,
      storageProgress: 0,
      status: "uploading",
    });

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(
          response.ok
            ? "Response has no body"
            : `HTTP error! Status: ${response.status}`
        );
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });

        const events = chunk
          .split("\n\n")
          .filter(Boolean)
          .map((eventText) => {
            try {
              const jsonText = eventText.replace(/^data: /, "");
              const parsedEvent = JSON.parse(jsonText);

              if (!isValidSSEEvent(parsedEvent)) {
                console.warn("Invalid SSE event received:", parsedEvent);
                return null;
              }

              return parsedEvent;
            } catch (e) {
              console.error("Error parsing SSE event:", e);
              return null;
            }
          })
          .filter((event): event is SSEEvent => event !== null);

        for (const event of events) {
          switch (event.type) {
            case "fileUpload":
              setUploadState((prev) => ({
                ...prev,
                fileProgress: event.progress,
              }));
              break;

            case "storageUpload":
              setUploadState((prev) => ({
                ...prev,
                storageProgress: event.progress,
              }));
              break;

            case "complete":
              setValue("thumbnail_url", event.url, { shouldValidate: true });

              setUploadState((prev) => ({
                ...prev,
                fileProgress: 100,
                storageProgress: 100,
                status: "complete",
              }));

              toast({
                title: "Upload Successful",
                description: "File uploaded successfully",
              });

              setTimeout(() => {
                setUploadState({
                  fileProgress: 0,
                  storageProgress: 0,
                  status: "idle",
                });
              }, 1500);
              break;

            case "error":
              setUploadState((prev) => ({
                ...prev,
                status: "error",
              }));

              setUploadError(event.message || "Upload failed");
              setPreviewUrl(null);

              toast({
                title: "Upload Failed",
                description: event.message || "Unknown error",
                variant: "destructive",
              });
              break;

            default:
              console.warn("Unknown event type:");
          }
        }
      }
    } catch (err) {
      setUploadState((prev) => ({
        ...prev,
        status: "error",
      }));

      setUploadError(err instanceof Error ? err.message : "Upload failed");

      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);

      toast({
        title: "Upload Error",
        description:
          err instanceof Error ? err.message : "Unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    multiple: false,
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
  });

  const handleDelete = async () => {
    if (!project) return;
    if (
      !confirm(
        "Are you sure you want to delete this project? This action cannot be undone."
      )
    )
      return;

    setIsDeleting(true);

    try {
      await deleteProject(project.id);
      toast({
        title: "Project deleted",
        description: "Your project has been deleted successfully",
      });
      router.push("/admin/dashboard?tab=projects");
      router.refresh();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete project",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const clearFile = () => {
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setValue("thumbnail_url", "", { shouldValidate: true });
    setUploadError(null);
    setUploadState({
      fileProgress: 0,
      storageProgress: 0,
      status: "idle",
    });
  };

  const getFileTypeIcon = () => {
    if (!previewUrl)
      return <Upload className="h-10 w-10 text-muted-foreground" />;

    if (previewUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
      return <ImageIcon className="h-6 w-6 text-muted-foreground" />;
    }

    return <FileText className="h-6 w-6 text-muted-foreground" />;
  };

  const onSubmit = async (data: ProjectFormData) => {
    setIsLoading(true);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    try {
      if (isEditing && project) {
        await updateProject(project.id, data);
        toast({
          title: "Project updated",
          description: "Your project has been updated successfully",
        });
      } else {
        await createProject(data);
        toast({
          title: "Project created",
          description: "Your project has been created successfully",
        });
      }
      router.push("/admin/dashboard?tab=projects");
      router.refresh();
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save project",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Project" : "Add New Project"}</CardTitle>
        <CardDescription>
          {isEditing
            ? "Update your project details"
            : "Add a new project to your portfolio"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Project Title"
              className={errors.title ? "border-red-500" : ""}
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description *</Label>
            <Textarea
              id="description"
              placeholder="A brief description of your project"
              rows={2}
              className={errors.description ? "border-red-500" : ""}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="long_description">Long Description</Label>
            <Textarea
              id="long_description"
              placeholder="A detailed description of your project"
              rows={5}
              className={errors.long_description ? "border-red-500" : ""}
              {...register("long_description")}
            />
            {errors.long_description && (
              <p className="text-sm text-red-500">
                {errors.long_description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Upload Thumbnail / File</Label>
            <div className="relative">
              <div
                {...getRootProps()}
                className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-200 ${
                  isDragging || isDragActive
                    ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                    : uploadError
                    ? "border-red-300 bg-red-50 dark:bg-red-950/20"
                    : "border-muted hover:bg-muted/5"
                }`}
              >
                <input {...getInputProps()} />

                <div className="flex flex-col items-center justify-center gap-2 text-center">
                  {previewUrl ? (
                    <div className="flex flex-col items-center">
                      {previewUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                        <div className="relative w-32 h-32 mb-2 overflow-hidden rounded-md border">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={previewUrl || "/placeholder.svg"}
                            alt="Preview"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        getFileTypeIcon()
                      )}
                      <p className="text-sm font-medium">
                        {watchThumbnailUrl?.split("/").pop() || "Selected file"}
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearFile();
                        }}
                      >
                        <X className="h-4 w-4 mr-1" /> Remove file
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="rounded-full bg-muted/80 p-3">
                        {getFileTypeIcon()}
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          <span className="text-primary">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Images or PDF (max 10MB)
                        </p>
                      </div>
                    </>
                  )}

                  {uploadError && (
                    <div className="flex items-center text-red-500 mt-2">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span className="text-xs">{uploadError}</span>
                    </div>
                  )}
                </div>
              </div>

              {uploadState.status === "uploading" && (
                <div className="mt-2">
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Uploading file...</span>
                        <span>{uploadState.fileProgress}%</span>
                      </div>
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-muted">
                          <div
                            className="flex flex-col justify-center rounded bg-blue-500 transition-all duration-300 ease-in-out"
                            style={{ width: `${uploadState.fileProgress}%` }}
                          />
                        </div>
                        {uploadState.fileProgress === 100 && (
                          <div className="absolute right-0 -top-1 text-blue-500">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Processing...</span>
                        <span>{uploadState.storageProgress}%</span>
                      </div>
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-muted">
                          <div
                            className="flex flex-col justify-center rounded bg-green-500 transition-all duration-300 ease-in-out"
                            style={{ width: `${uploadState.storageProgress}%` }}
                          />
                        </div>
                        {uploadState.storageProgress === 100 && (
                          <div className="absolute right-0 -top-1 text-green-500">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                placeholder="https://github.com/username/repo"
                className={errors.github_url ? "border-red-500" : ""}
                {...register("github_url")}
              />
              {errors.github_url && (
                <p className="text-sm text-red-500">
                  {errors.github_url.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="live_url">Live URL</Label>
              <Input
                id="live_url"
                placeholder="https://example.com"
                className={errors.live_url ? "border-red-500" : ""}
                {...register("live_url")}
              />
              {errors.live_url && (
                <p className="text-sm text-red-500">
                  {errors.live_url.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies (comma separated)</Label>
            <Input
              id="technologies"
              value={techInput}
              onChange={(e) => {
                setTechInput(e.target.value); 
              }}
              onBlur={() => {
                const technologies = techInput
                  .split(",")
                  .map((tech) => tech.trim())
                  .filter((tech) => tech.length > 0);

                setValue("technologies", technologies, {
                  shouldValidate: true,
                });
              }}
              placeholder="e.g. React, Node.js, PostgreSQL"
              className={errors.technologies ? "border-red-500" : ""}
            />
            {errors.technologies && (
              <p className="text-sm text-red-500">
                {errors.technologies.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="Web Development"
                className={errors.category ? "border-red-500" : ""}
                {...register("category")}
              />
              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${
                  errors.status ? "border-red-500" : ""
                }`}
                {...register("status")}
                value={watch("status")}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              {errors.status && (
                <p className="text-sm text-red-500">{errors.status.message}</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <div className="flex gap-2">
            {isEditing && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            )}
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Saving..."
                : isEditing
                ? "Update Project"
                : "Create Project"}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
