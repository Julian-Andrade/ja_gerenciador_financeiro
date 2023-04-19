import styled from 'styled-components'

export const InputStyleContainer = styled.input`
  height: 3rem;
  margin-bottom: 1.5rem;
  padding: 0 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors['gray-300']};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors['base-input']};
  transition: 0.4s;

  &:focus {
    border-color: ${({ theme }) => theme.colors['red-300']};
  }

  color: ${({ theme }) => theme.colors['base-text']};
  font-size: ${({ theme }) => theme.textSizes['text-bold-s']};

  &::placeholder {
    color: ${({ theme }) => theme.colors['base-label']};
  }
`

export const InputLabel = styled.label`
  font-weight: bold;
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  position: relative;

  > p {
    color: ${({ theme }) => theme.colors['base-error']};
    font-size: 0.8rem;
    font-weight: bold;
    margin-top: -0.8rem;
    margin-bottom: 1rem;
  }
`
