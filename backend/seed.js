require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const defaultFeatures = [
  "Easy-to-understand explanations",
  "Exam-focused content from previous KUHS papers",
  "Hand-drawn diagrams for better visualization",
  "Simplified concepts for faster learning"
];

async function main() {
  console.log("Seeding initial books...");

  const books = [
    {
      isbn: "978-93-344-0482-1",
      title: "Pulpe Dentaire – General Medicine",
      description: "Simplified approach to General Medicine with hand-drawn diagrams designed for 3rd-year dental students to pass university exams effortlessly.",
      price: 250,
      image: "/general-medicine.jpg",
      features: defaultFeatures
    },
    {
      isbn: "978-93-344-2283-2",
      title: "Pulpe Dentaire – Oral Pathology",
      description: "Master Oral Pathology with structured points, easy-to-digest concepts, and illustrations that make revising quick and efficient.",
      price: 250,
      image: "/oral-pathology.jpg",
      features: defaultFeatures
    },
    {
      isbn: "978-93-343-9228-9",
      title: "Pulpe Dentaire – General Surgery",
      description: "General Surgery simplified for dental students. Focuses strictly on essential knowledge required for exams without the unnecessary fluff.",
      price: 250,
      image: "/general-surgery.jpg",
      features: defaultFeatures
    }
  ];

  for (const bookData of books) {
    const exists = await prisma.book.findUnique({ where: { isbn: bookData.isbn } });
    if (!exists) {
      await prisma.book.create({ data: bookData });
      console.log("Created: " + bookData.title);
    } else {
      console.log("Already exists: " + bookData.title);
    }
  }

  console.log("Seeding complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
