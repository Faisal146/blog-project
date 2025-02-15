import { Router } from 'express';

const router = Router();

const moduleRoutes = [
  {
    path: '/blogs',
    route: UserRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
