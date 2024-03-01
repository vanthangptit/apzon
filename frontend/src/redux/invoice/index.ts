import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IFInvoiceOrder,
  IFInvoicePurchase,
  IFUpdateInvoiceOrderRequest,
  IFUpdateInvoicePurchaseRequest
} from '@models/IFInvoice';
import { API_ROOT_URL } from '@src/constants';
import requester from '@store/requester';

interface IFInvoiceState {
  isLoading: boolean
  allInvoicesOrder?: IFInvoiceOrder[]
  allInvoicesPurchase?: IFInvoicePurchase[]
}

const initialState: IFInvoiceState = {
  isLoading: false,
  allInvoicesOrder: undefined,
  allInvoicesPurchase: undefined
};

export const getAllInvoiceOrder = createAsyncThunk<any>('INVOICE_BY_ID', async (_, thunkAPI) => {
  try {
    const response = await requester.get(`${API_ROOT_URL}/invoices/orders`);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const updateStatusInvoiceOrder = createAsyncThunk<any, IFUpdateInvoiceOrderRequest>('INVOICE_UPDATE', async (requestData, thunkAPI) => {
  try {
    const response = await requester.put(`${API_ROOT_URL}/invoices/orders/${requestData.params.orderId}`, requestData.data);
    if (response.status === 200) {
      await thunkAPI.dispatch(getAllInvoiceOrder());
    }
    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const getAllInvoicePurchase = createAsyncThunk<any>('GET_PURCHASE_BY_ID', async (_, thunkAPI) => {
  try {
    const response = await requester.get(`${API_ROOT_URL}/invoices/purchases`);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const updateStatusInvoicePurchase = createAsyncThunk<any, IFUpdateInvoicePurchaseRequest>('PURCHASE_UPDATE', async (requestData, thunkAPI) => {
  try {
    const response = await requester.put(`${API_ROOT_URL}/invoices/purchases/${requestData.params.purchaseId}`, requestData.data);
    if (response.status === 200) {
      await thunkAPI.dispatch(getAllInvoicePurchase());
    }
    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const appInvoiceSlice = createSlice({
  name: 'appInvoice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllInvoiceOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.allInvoicesOrder = action.payload.data;
      })
      .addCase(getAllInvoicePurchase.fulfilled, (state, action: PayloadAction<any>) => {
        state.allInvoicesPurchase = action.payload.data;
      });
  }
});

export default appInvoiceSlice.actions;
