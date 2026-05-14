import 'dotenv/config';

import { Role } from '@uma/shared';

import { prisma } from './prisma';

const seed = async () => {
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: [
      {
        fullName: 'Alice Johnson',
        role: Role.MEMBER,
        dateOfBirthday: '1995-06-15T00:00:00.000Z',
      },
      {
        fullName: 'Bob Smith',
        role: Role.STAFF,
        dateOfBirthday: '1988-03-22T00:00:00.000Z',
      },
      {
        fullName: 'Carol Williams',
        role: Role.MEMBER,
        dateOfBirthday: null,
      },
    ],
  });

  console.log('Seeded 3 users');
};

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
