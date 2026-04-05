require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Revert Medicine
    await prisma.book.update({
      where: { isbn: "978-93-344-0482-1" },
      data: { image: "/general-medicine.jpg" }
    });
    console.log("Reverted General Medicine image to .jpg (temporarily)");

    // Revert Pathology
    await prisma.book.update({
      where: { isbn: "978-93-344-2283-2" },
      data: { image: "/oral-pathology.jpg" }
    });
    console.log("Reverted Oral Pathology image to .jpg (temporarily)");

    // Revert Surgery
    await prisma.book.update({
      where: { isbn: "978-93-343-9228-9" },
      data: { image: "/general-surgery.jpg" }
    });
    console.log("Reverted General Surgery image to .jpg (temporarily)");

  } catch (e) {
    console.error('ERROR:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
