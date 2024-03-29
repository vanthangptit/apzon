import React from 'react';
import {CollapseProps, Collapse } from 'antd';
import styled from 'styled-components';

export default ({ items }: { items: CollapseProps['items']}) => {
  return (
    <CollapseBox
      items={items}
      className={'collapse'}
      expandIconPosition={'end'}
      bordered={false}
    />
  );
};

const CollapseBox = styled(Collapse)`
  width: 100%;
  &.collapse {
    background-color: ${({ theme }) => theme.transparent};

    .ant-collapse-header {
      margin-bottom: 15px;
      border-bottom: 1px solid ${({ theme }) => theme.gray};
      font-weight: 600;
      * {
        color: #2381d5;
      }
    }
  }
`;
