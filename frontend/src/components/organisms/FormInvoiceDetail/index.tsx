import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import FormControl from '@components/molecules/FormControl';
import Collapse from '@components/molecules/Collapse';
import {Flex, CollapseProps, Col, Row, Button} from 'antd';
import {utils} from '@src/utils';
import { useLocation } from 'react-router-dom';
import {useInvoice} from '@hooks/useInvoice';
import TableInvoiceItems from '@components/organisms/Tables/TableInvoiceItems';

const FormInvoiceDetail = ({
  isExpand,
  data
}: {
  isExpand: boolean;
  data: any
}) => {
  const { updateStatusInvoiceOrder, updateStatusInvoicePurchase } = useInvoice();
  const location: any = useLocation();
  const [ isLoading, setLoading ] = useState<boolean>(false);
  const {setValue, register, formState} = useForm<any>();

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Chi tiết',
      children: <TableInvoiceItems data={data?.orderItems ?? data?.purchaseItems ?? []} />
    },
  ];

  useEffect(() => {
    const currency = data?.orderItems ? data?.orderItems[0].currency : data?.purchaseItems[0].currency;
    setValue('voucherDate', utils.formatInvoiceDate(data.createdAt));
    setValue('userCode', data?.customer?.userCode ?? data?.supplier?.userCode);
    setValue('userName', data?.customer?.fullName ?? data?.supplier?.fullName);
    setValue(
      'totalInVoice',
      utils.numberWithCurrency(data.total, currency) + ` ${currency?.toLocaleUpperCase()}`
    );
  }, [ location, data ]);

  const handleSubmit = async (status: 'success' | 'cancel') => {
    setLoading(true);
    if (data?.orderId) {
      updateStatusInvoiceOrder({
        data: {
          status
        },
        params: {
          orderId: data?.orderId
        }
      })
        .unwrap().then(utils.handleApiSuccess).catch().finally(() => setLoading(false));
    } else if (data?.purchaseId) {
      updateStatusInvoicePurchase({
        data: {
          status
        },
        params: {
          purchaseId: data?.purchaseId
        }
      })
        .unwrap().then(utils.handleApiSuccess).finally(() => setLoading(false));
    } else {
      utils.toasts('error', 'Đã có lỗi xảy ra');
    }
  };

  return (
    <form style={{ width: '100%' }}>
      <Row gutter={{ md: 60, xl: 100 }}>
        <Col span={24} md={12}>
          <FormControl
            label={data?.orderId ? 'Mã khách hàng' : data?.purchaseId ? 'Mã nhà cung cấp' : 'Không cung cấp'}
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
            label={data?.orderId ? 'Tên khách hàng' : data?.purchaseId ? 'Tên nhà cung cấp' : 'Không cung cấp'}
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
        <Button
          htmlType={'submit'} disabled={isLoading || data.status !== 'pending'}
          onClick={() => handleSubmit('success')}
        >
          Lưu
        </Button>
        <Button
          htmlType={'submit'}
          disabled={isLoading || data.status !== 'pending'}
          onClick={() => handleSubmit('cancel')}
        >
          Hủy
        </Button>
      </Flex>
    </form>
  );
};

export default FormInvoiceDetail;