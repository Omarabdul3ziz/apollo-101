import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const createLink = await prisma.link.create({
    data: {
      url: "hello.com",
      description: "just hello",
    },
  });

  const allLinks = await prisma.link.findMany();
  console.log(allLinks);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    prisma.$disconnect();
  });
