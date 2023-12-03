"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
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
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map