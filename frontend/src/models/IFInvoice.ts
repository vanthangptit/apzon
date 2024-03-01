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

interface IFInvoice {
  status: StatusInvoice
  price: bigint
  deliveryFee?: string
  discount?: string
  total?: string
  _id: string
  createdAt: string
  updatedAt: string
}

export interface IFInvoiceOrder extends IFInvoice {
  orderId: string
  orderItems: IFInvoiceOrderItems[]
  customer: IFUser
}

export interface IFUpdateInvoicePurchaseRequest {
  data: {
    status: StatusInvoice
  }
  params: {
    purchaseId: string
  }
}

export interface IFInvoicePurchase extends IFInvoice {
  purchaseId: string
  purchaseItems: IFInvoicePurchaseItems[]
  supplier: IFUser
}
