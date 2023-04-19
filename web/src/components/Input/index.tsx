import { InputHTMLAttributes, forwardRef } from 'react'
import { InputStyleContainer, InputWrapper, InputLabel } from './styles'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, ...props }, ref) => {
    return (
      <InputWrapper>
        {label && <InputLabel>{label}</InputLabel>}
        <InputStyleContainer {...props} ref={ref} />
        {error && <p>{error}</p>}
      </InputWrapper>
    )
  }
)
