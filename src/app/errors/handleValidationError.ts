import mongoose from 'mongoose';
import { TErrorSource } from '../interface/error';

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const statusCode = 400;

  const errorSources: TErrorSource = Object.values(err.errors).map(
    (error: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: error?.path,
        message: error?.message,
      };
    },
  );

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
