import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { blogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const result = await blogServices.createBlogIntoDB(req.user, req.body);

  sendResponse(res, {
    success: true,
    message: 'Blog created successful',
    statusCode: 201,
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await blogServices.updateBlogIntoDB(req.user, id, req.body);

  sendResponse(res, {
    success: true,
    message: 'Updated Blog Title',
    statusCode: 201,
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogServices.getAllblogFromDB(req.query);

  sendResponse(res, {
    success: true,
    message: 'All blogs retrived successfully',
    statusCode: 200,
    data: result,
  });
});
export const blogControllers = {
  getAllBlogs,
  createBlog,
  updateBlog,
};
