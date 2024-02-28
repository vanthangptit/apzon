import React, { useState } from 'react';
import {
  Layout,
  Button,
  Flex,
  Segmented,
  FlexProps,
  SegmentedProps
} from 'antd';

const boxStyle: React.CSSProperties = {
  width: '100%',
  height: 120,
  // borderRadius: 6,
  border: '1px solid #40a9ff',
};

const layoutStyle = {
  // borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
  maxWidth: '1200px',
  margin: 'auto'
};

const justifyOptions = [
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
];

const alignOptions = [ 'flex-start', 'center', 'flex-end' ];

const Home: React.FC = () => {
  const [ justify, setJustify ] = useState<FlexProps['justify']>(justifyOptions[0]);
  const [ alignItems, setAlignItems ] = useState<FlexProps['align']>(alignOptions[0]);

  return (
    <Layout style={layoutStyle}>
      <Flex gap="middle" align="start" vertical>
        <p>Select justify :</p>
        <Segmented options={justifyOptions} onChange={setJustify as SegmentedProps['onChange']} />
        <p>Select align :</p>
        <Segmented options={alignOptions} onChange={setAlignItems as SegmentedProps['onChange']} />
        <Flex style={boxStyle} justify={justify} align={alignItems}>
          <Button type="primary">Primary</Button>
          <Button type="primary">Primary</Button>
          <Button type="primary">Primary</Button>
          <Button type="primary">Primary</Button>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Home;