import { query } from 'express';
import { Tblog } from './blog.interface';
import { Blog } from './blog.model';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../builders/QueryBuilder';

const createBlogIntoDB = async (user: any, payload: Tblog) => {
  const Currentuser = await User.findOne({ email: user.email });

  if (!Currentuser) {
    throw new AppError(404, 'User not found');
  }

  payload.author = Currentuser?._id;

  //  console.log(payload, Currentuser);

  const result = (await Blog.create(payload)).populate('author');

  return result;
};

const updateBlogIntoDB = async (
  user: any,
  id: string,
  payload: Partial<Tblog>,
) => {
  const updateBlogUser = await Blog.findById(id).select('author');

  if (!updateBlogUser) {
    throw new AppError(404, 'blog not found');
  }

  const Currentuser = await User.findOne({ email: user.email });

  //   console.log(Currentuser?._id, updateBlogUser?.author);

  // check if the blog written by logined user

  if (String(Currentuser?._id) !== String(updateBlogUser?.author)) {
    throw new AppError(401, 'You are not authorized to update this blog');
  }

  // updating with id

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteBlogFromDB = async (user: any, id: string) => {
  const deleteBlogUser = await Blog.findById(id).select('author');

  if (!deleteBlogUser) {
    throw new AppError(404, 'blog not found');
  }

  const Currentuser = await User.findOne({ email: user.email });

  //   console.log(Currentuser?._id, updateBlogUser?.author);

  // check if the blog written by logined user

  if (String(Currentuser?._id) !== String(deleteBlogUser?.author)) {
    throw new AppError(401, 'You are not authorized to Delete this blog');
  }

  // deleting from databaseeee
  const result = await Blog.findByIdAndDelete(id);

  return result;
};

const getAllblogFromDB = async (query: any) => {
  console.log(query);

  const searchableFields = ['title', 'content'];

  const getQuery = new QueryBuilder(Blog.find(), query)
    .search(searchableFields)
    .sort()
    .filter();

  // run query builder

  const result = await getQuery.modelQuery.find();

  return result;
};

export const blogServices = {
  createBlogIntoDB,
  getAllblogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
