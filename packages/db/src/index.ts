// Import environment variables first
import './env.js';
import { PrismaClient } from '../generated/prisma';

export { PrismaClient };

// Create a singleton instance of PrismaClient
export const prisma = new PrismaClient();
