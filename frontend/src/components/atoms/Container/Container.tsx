import React from 'react';
import {Section} from '@components/atoms/Section';
import styled from 'styled-components';

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContainerBox>
      <Section>
        {children}
      </Section>
    </ContainerBox>
  );
};

export default Container;

export const ContainerBox = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  max-width: 1200px;
`;