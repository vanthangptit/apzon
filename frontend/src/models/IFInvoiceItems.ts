import {IFProduct} from '@models/IFProduct';
import {IFInvoiceOrder, IFInvoicePurchase} from '@models/IFInvoice';

export type Currency = 'vnd' | 'usd' | 'eur';

export interface IFInvoiceOrderItems {
  quantity: number
  price: number
  orderId: string

  currency?: Currency

  product: IFProduct
  order: IFInvoiceOrder
  _id: string
  createdAt: string
  updatedAt: string
}

export interface IFInvoicePurchaseItems {
  quantity: number
  price: number
  purchaseId: string

  currency?: Currency

  product: IFProduct
  purchase: IFInvoicePurchase
  _id: string
  createdAt: string
  updatedAt: string
}