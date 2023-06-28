import { ButtonHTMLAttributes } from 'react'
import { ItensContainer, ItensIcons } from './styles'

interface IconsWithInfoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  text: string | React.ReactNode
}

export function IconsWithInfo({ icon, text, ...props }: IconsWithInfoProps) {
  return (
    <ItensContainer {...props}>
      <ItensIcons>{icon}</ItensIcons>
      {typeof text === 'string' ? <p>{text}</p> : text}
    </ItensContainer>
  )
}
