import React, {memo, useState} from 'react';
import { Table, TableColumnsType, Tag } from 'antd';
import {IFInvoiceOrder} from '@models/IFInvoice';
import {utils} from '@src/utils';
import FormOrderDetail from '@components/organisms/FormOrderDetail';

const columns: TableColumnsType<IFInvoiceOrder> = [
  {
    title: 'Mã hóa đơn',
    dataIndex: 'orderId',
    key: 'orderId'
  },
  {
    title: 'Trạng thái yêu cầu',
    dataIndex: 'status',
    render: (_, record) => {
      const color = record.status === 'pending' ? 'geekblue' : (record.status === 'cancel' ? 'volcano' : 'green');
      return (
        <Tag color={color} key={record.status}>
          {record.status.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: 'Giảm giá',
    dataIndex: 'discount',
    render: (_, record) => {
      const currency = record.orderItems[0] ? record.orderItems[0].currency : 'vnd';
      return utils.numberWithCurrency(record.discount, currency) + ` ${currency?.toLocaleUpperCase()}`;
    },
  },
  {
    title: 'Phí giao hàng',
    dataIndex: 'deliveryFee',
    render: (_, record) => {
      const currency = record.orderItems[0] ? record.orderItems[0].currency : 'vnd';
      return utils.numberWithCurrency(record.deliveryFee, currency) + ` ${currency?.toLocaleUpperCase()}`;
    },
  },
  {
    title: 'Thanh toán',
    dataIndex: 'total',
    render: (_, record) => {
      const currency = record.orderItems[0] ? record.orderItems[0].currency : 'vnd';
      return utils.numberWithCurrency(record.total, currency) + ` ${currency?.toLocaleUpperCase()}`;
    },
  }
];

const TableInvoice = ({ data }: { data: IFInvoiceOrder[] }) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      bordered={true}
      expandable={{
        expandedRowRender: (record) => (
          <FormOrderDetail
            customer={record.customer}
            orderItems={record.orderItems}
            orderDate={record.createdAt}
            totalInVoice={record.total}
            orderId={record.orderId}
            orderStatus={record.status}
            isExpand={isExpand}
          />
        ),
        rowExpandable: (record) => record.orderId !== 'Not Expandable',
        onExpand: (expanded: boolean) => setIsExpand(expanded),
      }}
      rowKey={(record) => record._id}
    />
  );
};

export default memo(TableInvoice);