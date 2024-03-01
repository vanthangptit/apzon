import React, {useEffect} from 'react';
import {useInvoice} from '@hooks/useInvoice';
import TableInvoice from '@components/organisms/Tables/TableInvoice';
import TitlePage from '@components/molecules/Titles/TitlePage';
import Container from '@components/atoms/Container/Container';

const SalesOrder = () => {
  const { getAllInvoiceOrder, allInvoicesOrder } = useInvoice();

  useEffect(() => {
    getAllInvoiceOrder();
  }, []);

  return (
    <React.Fragment>
      <Container>
        <TitlePage title={'Danh sách bán hàng'} />
      </Container>
      <Container>
        {allInvoicesOrder && allInvoicesOrder?.length > 0 && (
          <TableInvoice data={allInvoicesOrder}/>
        )}
      </Container>
    </React.Fragment>
  );
};

export default SalesOrder;