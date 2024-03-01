import React from 'react';
import styled from 'styled-components';

export type Align = 'left' | 'center' | 'right'

const TitlePage = ({
  title,
  des,
  margin,
  $align
}: {
  title: string;
  des?: string;
  margin?: string;
  $align?: Align
}) => {
  return (
    <SectionTitle $margin={margin} $align={$align}>
      <Heading>{title}</Heading>
      {des && (
        <Desc>{des}</Desc>
      )}
    </SectionTitle>
  );
};

export default TitlePage;

const SectionTitle = styled.hgroup<{ $margin?: string, $align?: string }>`
  padding: ${({ $margin }) => $margin ?? '20px 0 45px'};
  text-align: ${({ $align }) => $align ?? 'left'};
`;

const Heading = styled.h1`
  font-size: 48px;
  color: ${({ theme }) => theme.primary1};
  line-height: 1.3;

  @media (min-width: 768px) and (max-width: 991px) {
    font-size: calc(32px + (48 - 32) * (100vw - 768px) / (991 - 768));
  }

  @media (max-width: 767px) {
    font-size: 32px;
  }
`;

const Desc = styled.p`
  font-size: 20px;
  text-align: center;
  color: ${({ theme }) => theme.primary1};
`;
