import styled from 'styled-components'

export const RegisterContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  height: 100vh;

  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 1.5rem;
`
export const RegisterContent = styled.div`
  width: 30rem;

  background-color: ${(props) => props.theme.colors['gray-100']};
  box-shadow: 3px 3px 10px #aaaaaa;
  border-radius: 0.5rem;

  padding: 1.25rem;

  form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
  }
`

export const Logo = styled.h2`
  margin-bottom: 2rem;

  font-size: ${({ theme }) => theme.textSizes['title-title-l']};
  color: ${({ theme }) => theme.colors['base-label']};
`

export const ContentText = styled.p`
  margin-bottom: 2rem;

  line-height: 130%;
`

export const ButtonContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  gap: 2rem;
  justify-content: space-between;
`
