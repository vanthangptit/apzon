import React, {useEffect} from 'react';
import {useInvoice} from '@hooks/useInvoice';
import TableInvoice from '@components/organisms/Tables/TableInvoice';
import TitlePage from '@components/molecules/Titles/TitlePage';
import Container from '@components/atoms/Container/Container';
import {useLocation} from 'react-router-dom';

const SalesOrder = () => {
  const location: any = useLocation();
  const { getAllInvoiceOrder, allInvoicesOrder } = useInvoice();

  useEffect(() => {
    getAllInvoiceOrder();
  }, [location]);

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