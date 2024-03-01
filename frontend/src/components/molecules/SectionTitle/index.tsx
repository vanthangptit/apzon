import React from 'react';
import styled from 'styled-components';
import EscapeHTML from '@components/atoms/EscapeHTML/DivEscapeHTML';
import {Align} from '@components/molecules/Titles/TitlePage';

const SectionTitle = ({
  title,
  des,
  $align
}: {
  title: string
  des?: string
  $align?: Align
}) => {
  return (
    <Hgroup $align={$align}>
      <Heading>{title}</Heading>
      {des && (
        <Desc htmlString={des} />
      )}
    </Hgroup>
  );
};

export default SectionTitle;

const Hgroup = styled.hgroup<{ $align?: string }>`
  padding: 15px 0 20px;
  text-align: ${({ $align }) => $align ?? 'left'};
`;

const Heading = styled.h3`
  font-size: 18px;
  color: ${({ theme }) => theme.primary1};
  font-family: ${({ theme }) => theme.fontRobotoBold};
  line-height: 1.3;

  @media (min-width: 768px) {
    font-size: 22px;
  }
`;

const Desc = styled(EscapeHTML)`
  font-size: 20px;
  color: ${({ theme }) => theme.primary1};
`;
