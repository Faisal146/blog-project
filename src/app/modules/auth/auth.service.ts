import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { Tlogin } from './auth.interface';
import { createToken } from './auth.utils';

const createUserIntoDB = async (payload: TUser) => {
  const emailExists = await User.findOne({ email: payload.email });

  if (emailExists) {
    throw new AppError(400, 'This email already exists');
  }
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: Tlogin) => {
  console.log(payload);

  const emailExists = await User.findOne({ email: payload.email });

  if (!emailExists) {
    throw new AppError(400, 'This email does not exists');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    emailExists.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(401, 'Invalid credentials');
  }

  const jwtPayload = {
    email: payload.email,
    role: emailExists.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return accessToken;
};

export const authServices = {
  createUserIntoDB,
  loginUser,
};
