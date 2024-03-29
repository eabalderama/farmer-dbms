import { PrismaClient, roles } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.accounts.create({
    data: {
      email: "admin@example.com",
      password: hash("Password@123"),
      role: roles.ADMIN,
      user: {
        create: {
          name: "Admin User",
          contact_number: "+6391111111189",
        },
      },
    },
    include: {
      user: true,
    },
  });

  const { password, ...rest } = user;

  console.log("User created", rest);
}

function hash(password: string) {
  return bcrypt.hashSync(password, 10);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
