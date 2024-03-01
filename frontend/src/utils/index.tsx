import {Currency} from '@models/IFInvoiceItems';
import moment from 'moment';
import { toast } from 'react-toastify';

type Type = 'success' | 'warn' | 'error';

export const utils = {
  numberWithCurrency: (x?: string, currency?: Currency) => {
    if (!x || x === '0') {
      return '0';
    }
    const isAddTwoDigits = Number(x) < 10000;

    const value = parseFloat(x).toFixed(2);
    const parts = value.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    if (currency === 'vnd') {
      const str = parts.join(',').replaceAll('.', ',');
      const newStr1 = str.substring(0, str.length -3);
      const newStr2 = '.' + str.substring(str.length -3, str.length).substring(1, 3);
      if (isAddTwoDigits) {
        return newStr1;
      } else {
        return newStr1 + newStr2;
      }
    } else {
      let newParts = parts.join(',');
      if (isAddTwoDigits) {
        newParts = newParts.substring(0, newParts.length - 3);
      }
      return newParts;
    }
  },
  formatInvoiceDate: (date: string) => {
    return `${moment(date).format('DD')}.${moment(date).format('MM')}.${moment(date).format('YYYY')}`;
  },
  toasts: (type: Type, message: string) => {
    return toast[type](message);
  }
};