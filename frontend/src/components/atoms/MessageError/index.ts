import styled from 'styled-components';

export const MessageError = styled.label<{ $align?: 'center' | 'right' | 'left' }>`
  display: inline-block;
  width: 100%;
  color: ${({ theme }) => theme.error1};
  margin-bottom: 25px;
  font-size: 13px;
  font-weight: 400;
  text-align: ${({ $align }) => $align ?? 'left'};
`;
