import React, {useEffect} from 'react';
import {useInvoice} from '@hooks/useInvoice';
import {useLocation} from 'react-router-dom';
import Container from '@components/atoms/Container/Container';
import TitlePage from '@components/molecules/Titles/TitlePage';
import TableInvoice from '@components/organisms/Tables/TableInvoice';

const PurchaseOrder = () => {
  const location: any = useLocation();
  const { getAllInvoicePurchase, allInvoicesPurchase } = useInvoice();

  useEffect(() => {
    getAllInvoicePurchase();
  }, [location]);

  return (
    <React.Fragment>
      <Container>
        <TitlePage title={'Danh sách mua hàng'} />
      </Container>
      <Container>
        {allInvoicesPurchase && allInvoicesPurchase.length > 0 && (
          <TableInvoice data={allInvoicesPurchase}/>
        )}
      </Container>
    </React.Fragment>
  );
};

export default PurchaseOrder;