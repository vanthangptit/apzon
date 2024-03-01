import React from 'react';
import {Table, TableColumnsType} from 'antd';
import {utils} from '@src/utils';
import {IFInvoiceOrderItems, IFInvoicePurchaseItems} from '@models/IFInvoiceItems';

const columns: TableColumnsType<any> = [
  {
    title: '#',
    dataIndex: 'key',
    render: (_, record, index) => {
      return index + 1;
    },
  },
  {
    title: 'Mã mặt hàng',
    dataIndex: 'orderId',
    render: (_, record) => record.product.productCode,
  },
  {
    title: 'Tên mặt hàng',
    dataIndex: 'name',
    render: (_, record) => record.product.name,
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    key: 'quantity',
    render: (text) => text
  },
  {
    title: 'Đơn giá',
    dataIndex: 'price',
    key: 'price',
    render: (_, record) => {
      const currency = record?.currency ?? 'vnd';
      return utils.numberWithCurrency(
        record.product.price.toString(), currency)
        + ` ${currency?.toLocaleUpperCase()}`;
    },
  },
  {
    title: 'Thành tiền',
    dataIndex: 'subtotal',
    render: (_, record) => {
      const currency = record?.currency ?? 'vnd';
      return utils.numberWithCurrency(
        (record.quantity * record.product.price).toString(), currency)
        + ` ${currency?.toLocaleUpperCase()}`;
    },
  }
];

const TableInvoiceItems = ({ data }: { data: IFInvoiceOrderItems[] | IFInvoicePurchaseItems[] }) => {
  return (
    <Table
      scroll={{ x: 700 }}
      columns={columns}
      dataSource={data}
      pagination={false}
      bordered={true}
      onRow={(record, index: any) => ({
        style: {
          background: index % 2 === 0 ? 'rgba(243,248,255,1)' : 'rgba(249,249,249,1)'
        }
      })}
      rowKey={(record) => record._id}
    />
  );
};

export default TableInvoiceItems;