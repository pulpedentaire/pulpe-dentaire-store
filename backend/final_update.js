require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Update Medicine
    await prisma.book.update({
      where: { isbn: "978-93-344-0482-1" },
      data: { image: "/general-medicine.png" }
    });
    console.log("Updated General Medicine image to .png (Final)");

    // Update Pathology
    await prisma.book.update({
      where: { isbn: "978-93-344-2283-2" },
      data: { image: "/oral-pathology.png" }
    });
    console.log("Updated Oral Pathology image to .png (Final)");

    // Update Surgery
    await prisma.book.update({
      where: { isbn: "978-93-343-9228-9" },
      data: { image: "/general-surgery.png" }
    });
    console.log("Updated General Surgery image to .png (Final)");

  } catch (e) {
    console.error('ERROR:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
