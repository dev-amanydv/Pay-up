// Import environment variables and PrismaClient
import './src/env.js'; 
import { PrismaClient } from './generated/prisma/index.js';

async function testConnection() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  
  try {
    const prisma = new PrismaClient();
    console.log('PrismaClient initialized');
    
    console.log('Connecting to database...');
    const users = await prisma.user.findMany();
    console.log('Connection successful!');
    console.log('Users:', users);
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error connecting to the database:');
    console.error(error);
  }
}

testConnection(); 