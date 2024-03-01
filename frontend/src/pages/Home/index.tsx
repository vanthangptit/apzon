import React from 'react';
import Container from '@components/atoms/Container/Container';
import TitlePage from '@components/molecules/Titles/TitlePage';
import { Link } from 'react-router-dom';
import SectionTitle from '@components/molecules/SectionTitle';
import {Button, Flex} from 'antd';

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Container>
        <TitlePage title={'Welcom to my project'} $align={'center'}/>
      </Container>
      <Container>
        <SectionTitle
          title={'Hi sir! Cảm ơn đã mời tôi tham gia bài test thú vị này.'}
          des={'Dưới đây là 2 link để đến 2 chức năng tôi đã hoàn thành:'}
          $align={'center'}
        />

        <Flex gap={'20px'} style={{paddingBottom: '100px'}} justify={'center'}>
          <Button htmlType={'button'} style={{padding: 0}}>
            <Link to={'/quan-ly-ban-hang'} style={{padding: '10px 15px'}}>Đơn bán hàng</Link>
          </Button>
          <Button htmlType={'button'} style={{padding: 0}}>
            <Link to={'/quan-ly-mua-hang'} style={{padding: '10px 15px'}}>Đơn mua hàng</Link>
          </Button>
        </Flex>
      </Container>
    </React.Fragment>
  );
};

export default Home;