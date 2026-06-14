const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function test() {
  const user = await prisma.user.create({
    data: {
      email: "test@mail.com",
      password: "123456",
    },
  });

  console.log(user);
}

test()
  .catch(console.error)
  .finally(() => prisma.$disconnect());