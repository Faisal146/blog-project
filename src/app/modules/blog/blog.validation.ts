import { z } from 'zod';

const createBlogShema = z.object({
  title: z.string(),
  content: z.string(),
  author: z.string().optional(),
  isPublished: z.boolean().optional(),
});
const updateBlogShema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  author: z.string().optional(),
  isPublished: z.boolean().optional(),
});

export const blogValidations = {
  createBlogShema,
  updateBlogShema,
};
