import {IFUser} from '@models/IFUser';
import {IFInvoiceOrderItems, IFInvoicePurchaseItems} from '@models/IFInvoiceItems';

export type StatusInvoice = 'pending' | 'success' | 'cancel';

export interface IFUpdateInvoiceOrderRequest {
  data: {
    status: StatusInvoice
  }
  params: {
    orderId: string
  }
}

export interface IFInvoiceOrder {
  status: StatusInvoice
  price: bigint
  deliveryFee?: string
  discount?: string
  total?: string
  orderId: string

  orderItems: IFInvoiceOrderItems[]
  customer: IFUser
  _id: string
  createdAt: string
  updatedAt: string
}

export interface IFUpdateInvoicePurchaseRequest {
  data: {
    status: StatusInvoice
  }
  params: {
    purchaseId: string
  }
}

export interface IFInvoicePurchase {
  status: StatusInvoice
  price: bigint
  deliveryFee?: string
  discount?: string
  total?: string
  purchaseId: string

  purchaseItems: IFInvoicePurchaseItems[]
  supplier: IFUser
  _id: string
  createdAt: string
  updatedAt: string
}
