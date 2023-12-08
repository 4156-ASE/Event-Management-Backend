import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const saltOrRounds = 10;
  const password = 'WHQ21cd1c689742';
  const hashedPassword = await bcrypt.hash(password, saltOrRounds);
  await prisma.user.create({
    data: {
      email: 'teresewang2000@gmail.com',
      password: hashedPassword,
      lastname: 'terese',
      firstname: 'wang',
      role: 'admin',
    },
  });

  const password2 = '12345678';
  const hashedPassword2 = await bcrypt.hash(password2, saltOrRounds);
  await prisma.user.create({
    data: {
      email: 'abc@gmail.com',
      password: hashedPassword2,
      lastname: 'abc',
      firstname: 'abc',
      role: 'regular',
    },
  });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
