// Simple env loader to ensure DATABASE_URL is available
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to load environment variables from .env file
function loadEnvFile() {
  try {
    const envPath = path.resolve(__dirname, '../.env');
    
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const envVars = envContent.split('\n').filter(Boolean);
      
      for (const line of envVars) {
        const [key, ...valueParts] = line.split('=');
        const value = valueParts.join('=').trim();
        
        if (key && value) {
          const trimmedKey = key.trim();
          // Remove quotes from the value if they exist
          const trimmedValue = value.replace(/^["']|["']$/g, '');
          process.env[trimmedKey] = trimmedValue;
        }
      }
      
      console.log('Loaded DATABASE_URL:', process.env.DATABASE_URL);
    } else {
      console.warn('No .env file found at', envPath);
    }
  } catch (error) {
    console.error('Error loading .env file:', error);
  }
}

// Load environment variables
loadEnvFile();

// Export the DATABASE_URL to ensure it's accessible
export const DATABASE_URL = process.env.DATABASE_URL; 