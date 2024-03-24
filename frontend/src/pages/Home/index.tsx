import React, { useState } from 'react';
import Container from '@components/atoms/Container/Container';
import TitlePage from '@components/molecules/Titles/TitlePage';
import { Link } from 'react-router-dom';
import SectionTitle from '@components/molecules/SectionTitle';
import {Button, Flex} from 'antd';
import InputFile from '@components/atoms/InputFile';

export const validateFileTypes = [ 'image/jpg', 'image/jpeg', 'image/png' ];

export const convertSize = (originSize: number) => {
  let mbSize: any = originSize / (1024 * 1000);
  let unit = 'MB';

  if (mbSize < 0.01) {
    mbSize = Math.round(originSize);
    unit = 'Bytes';
  } else if (mbSize < 1) {
    mbSize = mbSize * 1000;
    mbSize = mbSize.toFixed(2);
    unit = 'KB';
  } else {
    mbSize = mbSize.toFixed(2);
  }

  return {
    size: mbSize,
    unit
  };
};

export const validationMaxSize = (file: any) => {
  const fileConverted = convertSize(file.size);

  if (
    ((fileConverted.unit === 'Bytes') && fileConverted.size > 5000000)
    || (fileConverted.unit === 'KB' && fileConverted.size > 5000)
    || (fileConverted.unit === 'MB' && fileConverted.size > 5)
  ) {
    return {
      message: 'File too big. Maximum file size is 5MB.'
    };
  }
};

const Home: React.FC = () => {
  const [ validated, setValidated ] = useState<string>('');
  const [ isFileChange, setIsFileChange ] = useState<boolean>(false);
  const [ file, setFile ] = useState<any>({
    name: ''
  });

  // eslint-disable-next-line no-console
  console.log({
    validated,
    isFileChange,
    file
  });

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
          <InputFile
            setFile={setFile}
            setValidated={setValidated}
            setIsFileChange={setIsFileChange}
            isFileChange={isFileChange}
            isHidden={false}
            validate={{
              accept: '.xml,.html,.repx',
              maxSize: 2
            }}
          />
        </Flex>
      </Container>
    </React.Fragment>
  );
};

export default Home;