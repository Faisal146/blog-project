import AppError from '../../errors/AppError';
import { Blog } from '../blog/blog.model';
import { User } from '../user/user.model';

const blockUserIntoDB = (id: string) => {
  const blockedUser = User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { runValidators: true, new: true },
  );

  // check user exists

  if (!blockedUser) {
    throw new AppError(404, 'this user not found');
  }

  return blockedUser;
};

const deleteBlogFromDB = (id: string) => {
  // find blog exists

  const deletedBlog = Blog.findByIdAndDelete(id);

  if (!deletedBlog) {
    throw new AppError(404, 'this Blog is not exists');
  }


  return deletedBlog;
};

export const adminServices = {
  blockUserIntoDB,
  deleteBlogFromDB,
};
