import { type Request, type Response, Router } from 'express';
import { userFormSchema, userUpdateSchema } from '@uma/shared';

import { prisma } from 'src/db/prisma';
import { validate } from 'src/middleware/validate';

export const usersRouter = Router();

usersRouter.get('/', async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(users);
});

usersRouter.get('/:id', async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.id } });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.json(user);
});

usersRouter.post(
  '/',
  validate(userFormSchema),
  async (req: Request, res: Response) => {
    const user = await prisma.user.create({ data: req.body });
    res.status(201).json(user);
  },
);

usersRouter.put(
  '/:id',
  validate(userUpdateSchema),
  async (req: Request, res: Response) => {
    const existing = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    if (!existing) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(user);
  },
);

usersRouter.delete('/:id', async (req: Request, res: Response) => {
  const existing = await prisma.user.findUnique({
    where: { id: req.params.id },
  });

  if (!existing) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  await prisma.user.delete({ where: { id: req.params.id } });
  res.status(204).send();
});
