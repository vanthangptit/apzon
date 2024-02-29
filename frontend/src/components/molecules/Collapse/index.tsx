import React from 'react';
import {CollapseProps, Collapse } from 'antd';
import styled from 'styled-components';


export default ({ items }: { items: CollapseProps['items']}) => {
  return (
    <CollapseBox>
      <Collapse items={items} className={'collapse'} expandIconPosition={'end'} bordered={false}/>
    </CollapseBox>
  );
};

const CollapseBox = styled.div<{ $height?: string }>`
  width: 100%;
  .collapse {
    background-color: rgba(0, 0, 0, 0);

    .ant-collapse-header {
      margin-bottom: 15px;
      border-bottom: 1px solid  #ccc;
      font-weight: 600;
      max-width: 60%;

      * {
        color: #2381d5;
      }
    }
  }
`;
