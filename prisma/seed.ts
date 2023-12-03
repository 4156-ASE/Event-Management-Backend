import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const saltOrRounds = 10;
  const password = 'adminpassword';
  const hashedPassword = await bcrypt.hash(password, saltOrRounds);
  await prisma.user.create({
    data: {
      email: 'admin@gmail.com',
      password: hashedPassword,
      last_name: 'admin',
      first_name: 'admin',
      role: 'admin',
    },
  });

  const password2 = '12345678';
  const hashedPassword2 = await bcrypt.hash(password2, saltOrRounds);
  await prisma.user.create({
    data: {
      email: 'abc@gmail.com',
      password: hashedPassword2,
      last_name: 'abc',
      first_name: 'abc',
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
