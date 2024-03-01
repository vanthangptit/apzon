import React, {memo, useState} from 'react';
import { Table, TableColumnsType, Tag } from 'antd';
import {utils} from '@src/utils';
import FormInvoiceDetail from '@components/organisms/FormInvoiceDetail';

const columns: TableColumnsType<any> = [
  {
    title: 'Mã hóa đơn',
    dataIndex: 'invoiceId',
    render: (_, record) => {
      return record?.orderId ?? record?.purchaseId;
    },
  },
  {
    title: 'Trạng thái yêu cầu',
    dataIndex: 'status',
    render: (_, record) => {
      const color = record.status === 'pending' ? 'geekblue' : (record.status === 'cancel' ? 'volcano' : 'green');
      return (
        <Tag color={color} key={record.status}>
          {(record.status === 'success' ? 'complete' : record.status).toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: 'Giảm giá',
    dataIndex: 'discount',
    render: (_, record) => {
      const currency = record?.orderItems ? record?.orderItems[0].currency : record?.purchaseItems[0].currency;
      return utils.numberWithCurrency(record.discount, currency) + ` ${currency?.toLocaleUpperCase()}`;
    },
  },
  {
    title: 'Phí giao hàng',
    dataIndex: 'deliveryFee',
    render: (_, record) => {
      const currency = record?.orderItems ? record.orderItems[0].currency : record?.purchaseItems[0].currency;
      return utils.numberWithCurrency(record.deliveryFee, currency) + ` ${currency?.toLocaleUpperCase()}`;
    },
  },
  {
    title: 'Ngày tạo đơn',
    dataIndex: 'deliveryFee',
    render: (_, record) => utils.formatInvoiceDate(record.createdAt),
  },
  {
    title: 'Thanh toán',
    dataIndex: 'total',
    render: (_, record) => {
      const currency = record?.orderItems ? record?.orderItems[0].currency : record?.purchaseItems[0].currency;
      return utils.numberWithCurrency(record.total, currency) + ` ${currency?.toLocaleUpperCase()}`;
    },
  }
];

const TableInvoice = ({ data }: { data: any[] }) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      bordered={true}
      expandable={{
        expandedRowRender: (record) => (
          <FormInvoiceDetail
            data={record}
            isExpand={isExpand}
          />
        ),
        rowExpandable: (record) => (record?.orderId ?? record?.purchaseId) !== 'Not Expandable',
        onExpand: (expanded: boolean) => setIsExpand(expanded),
      }}
      rowKey={(record) => record._id}
    />
  );
};

export default memo(TableInvoice);