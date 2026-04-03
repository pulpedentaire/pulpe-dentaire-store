require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

prisma.book.findMany()
  .then(r => { console.log('Supabase connected! Books:', r.length); })
  .catch(e => { console.log('ERROR:', e.message); })
  .finally(() => { prisma.$disconnect(); });
