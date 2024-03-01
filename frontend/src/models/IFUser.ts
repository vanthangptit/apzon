import {IFInvoiceOrder} from '@models/IFInvoice';
import {IFProduct} from '@models/IFProduct';

export interface IFUser {
  fullName: string
  userCode: string
  isVendor: boolean
  email: string
  mobile?: string
  address?: string

  orders: IFInvoiceOrder[]
  categories: string[]
  products: IFProduct[]
  carts: string[]
  _id: string
  createdAt: string
  updatedAt: string
}