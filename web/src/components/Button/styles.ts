import styled, { css } from 'styled-components'

interface ButtonContainerProps {
  color?: 'green'
}

export const ButtonContainer = styled.button`
  padding: 0.75rem 2.8rem;

  background: ${({ theme }) => theme.colors['base-button']};
  color: ${({ theme }) => theme.colors['brand-white']};

  font-weight: 700;

  line-height: 1.3rem;

  border: none;
  border-radius: 0.5rem;

  margin-bottom: 1rem;

  transition: 0.4s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    opacity: 0.8;
  }

  ${({ color }) =>
    color === 'green' &&
    css`
      background: ${({ theme }) => theme.colors['red-500']};
      color: ${({ theme }) => theme.colors['brand-white']};
    `}
`
