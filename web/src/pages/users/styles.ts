import styled from 'styled-components'

export const TransactionsContainer = styled.main`
  width: 100%;

  margin: 0 auto;
  margin-top: 4rem;
`

export const TransactionsTable = styled.table`
  width: 100%;

  border-collapse: separate;
  border-spacing: 0 0.5rem;

  margin-top: 1.5rem;

  th {
    text-align: center;
  }

  td {
    padding: 0.5rem 0.5rem;
    background: ${(props) => props.theme.colors['gray-100']};
  }
`

export const ButtonTableContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`
