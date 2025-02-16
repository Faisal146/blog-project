import { Types } from 'mongoose';

export type Tblog = {
  title: string;
  content: string;
  author?: Types.ObjectId;
  isPublished: boolean;
};
