import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search;

    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      });
    }

    return this;
  }

  sort() {
    const sortBy = this?.query?.sortBy || 'createdAt'; // Default sorting field
    const order = this?.query?.sortOrder === 'desc' ? -1 : 1; // Default ascending

    //  const users = await User.find().sort({ [sortBy]: order });

    this.modelQuery = this.modelQuery.sort({ [sortBy as string]: order });

    return this;
  }

  filter() {
    const authorId = this?.query?.filter;

    if (authorId) {
      this.modelQuery = this.modelQuery.find({ author: authorId });
    }

    return this;
  }
}

export default QueryBuilder;
