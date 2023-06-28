import styled from 'styled-components'

export const TransactionsContainer = styled.main`
  width: 100%;

  display: flex;
  justify-content: space-between;

  margin-top: 4rem;

  border-collapse: collapse;
  overflow-x: auto;
`

export const TransactionsTable = styled.table`
  th {
    text-align: center;
  }

  td {
    padding: 0.5rem 2rem;
    background: ${(props) => props.theme.colors['gray-100']};
  }
`

export const ButtonTableContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`
