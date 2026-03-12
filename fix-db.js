const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://postgres.hdhvmwhfpikhesplxruc:IsUVhTfQZnbXXQoH@aws-0-us-east-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    await client.query(`ALTER TABLE experience ADD COLUMN IF NOT EXISTS location TEXT;`);
    console.log('Location column added successfully');
  } catch (err) {
    console.error('Error adding location column', err);
  } finally {
    await client.end();
  }
}

run();
