import styled from 'styled-components';

export const Input = styled.input<{ $with?: string; $height?: string }>`
  height: ${({ $height }) => $height ? $height : '40px'};
  width: ${({ $with }) => $with ? $with : 'auto'};
  color: ${({ theme }) => theme.black};
  background-color: ${({ theme }) => theme.transparent};
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${({ theme }) => theme.gray};

  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
    opacity: 1; /* Firefox */
  }

  &::-ms-input-placeholder { /* Edge 12 -18 */
    color: ${({ theme }) => theme.placeholder};
  }
`;
