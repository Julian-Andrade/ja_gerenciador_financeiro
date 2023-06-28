import styled from 'styled-components'

export const ItensContainer = styled.button`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 1rem;

  background: transparent;
  border: none;

  padding: 1rem;

  &:hover {
    transition: 0.4s;
    opacity: 0.4;
  }

  :focus {
    border: none;
  }

  p {
    color: white;
  }
`

export const ItensIcons = styled.div`
  width: 32px;
  height: 32px;

  border-radius: 999px;

  color: ${({ theme }) => theme.colors['base-input']};

  display: flex;
  align-items: center;
  justify-content: center;
`
