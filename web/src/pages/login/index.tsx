import { Input, Button, Loading } from '../../components'
import { useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import api from '../../services/api'
import {
  LoginContainer,
  Logo,
  LoginContent,
  ContentText,
  CreateAccount,
} from './styles'
import { useState } from 'react'

const confirmLoginFormValidationSchema = zod.object({
  email: zod.string().min(1, 'E-mail obgrigatório').email('E-mail inválido'),
  password: zod.string().min(6, 'Mínimo de 6 caracteres'),
})

export type LoginData = zod.infer<typeof confirmLoginFormValidationSchema>

type ConfirmLoginData = LoginData

interface ErrorsType {
  errors: {
    [key: string]: {
      message: string
    }
  }
}

export default function Login() {
  const [loading, setLoading] = useState(false)

  const { colors } = useTheme()
  const navigate = useNavigate()

  const confirmLoginForm = useForm<ConfirmLoginData>({
    resolver: zodResolver(confirmLoginFormValidationSchema),
  })

  const { handleSubmit, register, formState } = confirmLoginForm

  const { errors } = formState as unknown as ErrorsType

  const handleConfirmLogin = async (data: ConfirmLoginData) => {
    try {
      setLoading(true)

      const response = await api.post('/login', data)

      const token = { token: response?.data?.token }

      localStorage.setItem('ger_fin', JSON.stringify(token))

      setLoading(false)

      navigate('/')
    } catch (error) {
      alert('Error, tente novamente')
      setLoading(false)
    }
  }

  return (
    <LoginContainer>
      <LoginContent>
        {loading ? (
          <Loading />
        ) : (
          <FormProvider {...confirmLoginForm}>
            <Logo>Login</Logo>
            <ContentText>
              Preencha os campos abaixo para efetuar o login.
            </ContentText>
            <form onSubmit={handleSubmit(handleConfirmLogin)}>
              <Input
                label='E-mail'
                placeholder='Digite seu e-mail'
                type='email'
                {...register('email')}
                error={errors.email?.message}
              />
              <Input
                label='Senha'
                placeholder='Digite sua senha'
                type='password'
                {...register('password')}
                error={errors.password?.message}
              />
              <Button text='Acessar' bg={colors['base-button']} type='submit' />
            </form>
            <CreateAccount onClick={() => navigate('/register')}>
              Cadastre-se
            </CreateAccount>
          </FormProvider>
        )}
      </LoginContent>
    </LoginContainer>
  )
}
