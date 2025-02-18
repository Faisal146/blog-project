import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { adminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await adminServices.blockUserIntoDB(userId);

  sendResponse(res, {
    success: true,
    message: 'User is blocked successfully',
    statusCode: 200,
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await adminServices.deleteBlogFromDB(id);

  sendResponse(res, {
    success: true,
    message: 'blog deleted successfully',
    statusCode: 200,
    data: result,
  });
});

export const adminControllers = {
  blockUser,
  deleteBlog,
};
