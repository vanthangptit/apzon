import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';
import * as invoiceStore from '@store/invoice';
import {
  IFUpdateInvoiceOrderRequest,
  IFUpdateInvoicePurchaseRequest
} from '@models/IFInvoice';

export const useInvoice = () => {
  const dispatch = useAppDispatch();
  const userStores = useAppSelector((state: RootState) => state.invoice);

  const getAllInvoiceOrder = () => {
    return dispatch(invoiceStore.getAllInvoiceOrder());
  };

  const updateStatusInvoiceOrder = (requestData: IFUpdateInvoiceOrderRequest) => {
    return dispatch(invoiceStore.updateStatusInvoiceOrder(requestData));
  };

  const getAllInvoicePurchase = () => {
    return dispatch(invoiceStore.getAllInvoicePurchase());
  };

  const updateStatusInvoicePurchase = (requestData: IFUpdateInvoicePurchaseRequest) => {
    return dispatch(invoiceStore.updateStatusInvoicePurchase(requestData));
  };

  return {
    ...userStores,
    getAllInvoiceOrder,
    updateStatusInvoiceOrder,
    getAllInvoicePurchase,
    updateStatusInvoicePurchase
  };
};
