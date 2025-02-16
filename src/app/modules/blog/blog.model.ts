import mongoose, { model } from 'mongoose';
import { Tblog } from './blog.interface';

const blogSchema = new mongoose.Schema<Tblog>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Blog = model<Tblog>('Blog', blogSchema);
