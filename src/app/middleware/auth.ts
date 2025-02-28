import config from '../config';
import AppError from '../errors/AppError';
import { CustomRequest } from '../interface/customRequest';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = (...requiredRoles: any) => {
  return catchAsync(async (req: CustomRequest, res, next) => {
    const tokenWithBearer = req.headers.authorization;
    const token = tokenWithBearer?.split(' ')[1];
    // console.log(token);

    console.log(tokenWithBearer);

    if (!token) {
      throw new AppError(500, 'you are not authorized');
    }

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(401, 'invalid token');
    }

    const { role, email, iat } = decoded;

    const user = await User.isEmailExists(email);

    if (!user) {
      throw new AppError(404, 'This user is not found !');
    }

    if (user?.isBlocked) {
      throw new AppError(403, 'This user is Blocked !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(500, 'you are not authorized');
    }

    //   console.log(decoded);

    req.user = decoded as JwtPayload;

    // console.log(req.user);

    next();
  });
};

export default auth;
