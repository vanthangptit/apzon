import styled from 'styled-components';

export const Input = styled.input<{ $with?: string; $height?: string }>`
  height: ${({ $height }) => $height ? $height : '40px'};
  width: ${({ $with }) => $with ? $with : 'auto'};
  color: #000;
  background-color: transparent;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #ccc;

  &::placeholder {
    color: #7F7F7F;
    opacity: 1; /* Firefox */
  }

  &::-ms-input-placeholder { /* Edge 12 -18 */
    color: #7F7F7F;
  }
`;
