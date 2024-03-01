import {IFUser} from '@models/IFUser';

export interface IFProduct {
  name: string
  slug?: string
  price: number
  quantity: number,
  brand: string,
  description?: string,
  published?: boolean,
  productCode: string
  productImage?: string

  owner: IFUser
  carts: string[]
  category: string
  _id: string
  createdAt: string
  updatedAt: string
}
