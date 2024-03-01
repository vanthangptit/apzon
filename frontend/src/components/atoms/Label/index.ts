import styled from 'styled-components';

export const LabelField = styled.label<{ $align?: 'left' | 'center' | 'right'; $with?: string; $height?: string }>`
  height: ${({ $height }) => $height ? $height : 'auto'};
  width: ${({ $with }) => $with ? $with : 'auto'};
  line-height: ${({ $height }) => $height ? $height : 'normal'};
  display: block;
  font-size: 16px;
  margin-bottom: 12px;
  font-family: ${({ theme }) => theme.fontRobotoLight};
  color: ${({ theme }) => theme.text1};
  text-align: ${({ $align }) => $align ?? 'left'};
`;
