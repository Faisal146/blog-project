import { query } from 'express';
import { Tblog } from './blog.interface';
import { Blog } from './blog.model';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';

const createBlogIntoDB = async (user: any, payload: Tblog) => {
  const Currentuser = await User.findOne({ email: user.email });

  if (!Currentuser) {
    throw new AppError(404, 'User not');
  }

  payload.author = Currentuser?._id;

  //  console.log(payload, Currentuser);

  const result = (await Blog.create(payload)).populate('author');

  return result;
};

const updateBlogIntoDB = async (user: any, id: string, payload: Tblog) => {
  const Currentuser = await User.findOne({ email: user.email });

  if (Currentuser?._id !== payload.author) {
    throw new AppError(404, 'You are not authorized to update this blog');
  }

  payload.author = Currentuser?._id;

  //  console.log(payload, Currentuser);

  const result = await Blog.findByIdAndUpdate(
    id,
    { payload },
    { new: true, runValidators: true },
  );

  return result;
};

const getAllblogFromDB = async (query: any) => {
  console.log(query);

  const result = Blog.find();
  return result;
};

export const blogServices = {
  createBlogIntoDB,
  getAllblogFromDB,
  updateBlogIntoDB,
};
