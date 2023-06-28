import { ButtonHTMLAttributes } from 'react'
import { ButtonContainer } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | number
  bg?: string
}

export function Button({ text, bg, ...props }: ButtonProps) {
  return (
    <ButtonContainer {...props} bg={bg}>
      {text}
    </ButtonContainer>
  )
}
