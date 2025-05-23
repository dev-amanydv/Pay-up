"use strict";

// Simple placeholder for environment variables in client context
// Next.js handles .env files automatically, so this is just for clarity

// Using hardcoded value because Next.js will pull from .env files automatically
const DATABASE_URL = process.env.DATABASE_URL || 
  "postgresql://neondb_owner:npg_lCjA9xigo3PY@ep-lucky-smoke-a4bxlmh5-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require";

console.log('Loaded DATABASE_URL:', DATABASE_URL);

// Export the DATABASE_URL to ensure it's accessible
export { DATABASE_URL }; 