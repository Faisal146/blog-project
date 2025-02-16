import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

const createUser = catchAsync(async (req, res) => {
  const result = await authServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: 201,
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: 200,
    data: {
      token: result,
    },
  });
});
export const authControllers = {
  createUser,
  loginUser,
};
