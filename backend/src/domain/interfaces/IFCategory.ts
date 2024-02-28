import { Document, Types } from 'mongoose';

export interface IFCategoryModel extends Document {
  name: string
  slug?: string
  published?: boolean,
  parentId?: string,
  owner: Types.ObjectId
  products: Types.ObjectId[]
}
