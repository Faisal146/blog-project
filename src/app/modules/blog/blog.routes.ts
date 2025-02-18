import { Router } from 'express';
import validationReq from '../../middleware/validateRequest';
import { blogControllers } from './blog.controller';
import auth from '../../middleware/auth';
import { blogValidations } from './blog.validation';

const router = Router();

router.post(
  '/',
  auth('admin', 'user'),
  validationReq(blogValidations.createBlogShema),
  blogControllers.createBlog,
);

router.patch(
  '/:id',
  auth('admin', 'user'),
  validationReq(blogValidations.updateBlogShema),
  blogControllers.updateBlog,
);
router.delete(
  '/:id',
  auth('admin', 'user'),
  validationReq(blogValidations.updateBlogShema),
  blogControllers.deleteBlog,
);

router.get('/', blogControllers.getAllBlogs);

export const blogRoutes = router;
