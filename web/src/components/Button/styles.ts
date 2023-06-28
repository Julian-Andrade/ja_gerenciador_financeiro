import styled from 'styled-components'

interface ButtonContainerProps {
  bg?: string
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  padding: 0.75rem 2.8rem;

  background: ${({ bg }) => bg};
  color: ${({ theme }) => theme.colors['brand-white']};

  font-weight: 700;

  line-height: 1.3rem;

  border: none;

  transition: 0.4s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    opacity: 0.8;
  }
`
