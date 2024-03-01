import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import FormControl from '@components/molecules/FormControl';
import Collapse from '@components/molecules/Collapse';
import {Flex, CollapseProps, Col, Row, Button} from 'antd';
import {IFUser} from '@models/IFUser';
import {IFInvoiceOrderItems} from '@models/IFInvoiceItems';
import TableOrderItems from '@components/organisms/Tables/TableOrderItems';
import {utils} from '@src/utils';
import { useLocation } from 'react-router-dom';
import {useInvoice} from '@hooks/useInvoice';

const FormOrderDetail = ({
  isExpand,
  orderStatus,
  orderId,
  customer,
  orderDate,
  totalInVoice,
  orderItems
}: {
  isExpand: boolean;
  orderStatus: string;
  orderId: string;
  orderDate: string;
  totalInVoice?: string;
  customer: IFUser;
  orderItems: IFInvoiceOrderItems[]
}) => {
  const { updateStatusInvoiceOrder } = useInvoice();
  const location: any = useLocation();
  const [ isLoading, setLoading ] = useState<boolean>(false);
  const {setValue, register, formState} = useForm<any>();

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Chi tiết',
      children: <TableOrderItems data={orderItems} />
    },
  ];

  useEffect(() => {
    if (orderItems.length > 0) {
      const currency = orderItems[0] ? orderItems[0].currency : 'vnd';
      setValue('voucherDate', utils.formatInvoiceDate(orderDate));
      setValue('userCode', customer.userCode);
      setValue('userName', customer.fullName);
      setValue('totalInVoice', utils.numberWithCurrency(totalInVoice, currency) + ` ${currency?.toLocaleUpperCase()}`);
    }
  }, [ location, orderItems ]);

  const handleSubmit = async (status: 'success' | 'cancel') => {
    setLoading(true);
    updateStatusInvoiceOrder({
      data: {
        status
      },
      params: {
        orderId
      }
    })
      .unwrap()
      .then((rs) => {
        setLoading(false);
        if (rs.status === 200) {
          utils.toasts('success', rs?.message);
        } else {
          utils.toasts('error', rs?.message);
        }
      });
  };

  return (
    <form style={{ width: '100%' }}>
      <Row gutter={{ md: 60, xl: 100 }}>
        <Col span={24} md={12}>
          <FormControl
            label={'Mã khách hàng'}
            register={register}
            formState={formState}
            textEr={''}
            typeField={'text'}
            nameField={'userCode'}
            $with={'60%'}
            $height={'45px'}
            $heightLabel={'45px'}
            $withLabel={'40%'}
            $isHorizontal={true}
            disabled={true}
          />
          <FormControl
            label={'Tên khách hàng'}
            register={register}
            formState={formState}
            textEr={''}
            typeField={'text'}
            nameField={'userName'}
            $with={'60%'}
            $height={'45px'}
            $heightLabel={'45px'}
            $withLabel={'40%'}
            $isHorizontal={true}
            disabled={true}
          />
        </Col>
        <Col span={24} md={12}>
          <FormControl
            label={'Ngày chứng từ'}
            register={register}
            formState={formState}
            textEr={''}
            typeField={'text'}
            nameField={'voucherDate'}
            placeholder={'Enter a writer..'}

            $with={'60%'}
            $height={'45px'}
            $heightLabel={'45px'}
            $withLabel={'40%'}
            $isHorizontal={true}
            disabled={true}
          />
          <FormControl
            label={'Tổng tiền'}
            register={register}
            formState={formState}
            textEr={''}
            typeField={'text'}
            nameField={'totalInVoice'}

            $with={'60%'}
            $height={'45px'}
            $heightLabel={'45px'}
            $withLabel={'40%'}
            $isHorizontal={true}
            disabled={true}
          />
        </Col>
      </Row>
      <Flex>
        {isExpand && (
          <Collapse items={items} />
        )}
      </Flex>
      <Flex gap={'20px'}>
        <Button htmlType={'submit'} disabled={isLoading || orderStatus !== 'pending'} onClick={() => handleSubmit('success')}>Lưu</Button>
        <Button htmlType={'submit'} disabled={isLoading || orderStatus !== 'pending'} onClick={() => handleSubmit('cancel')}>Hủy</Button>
      </Flex>
    </form>
  );
};

export default FormOrderDetail;