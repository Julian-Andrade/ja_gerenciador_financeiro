import { Input, Button } from '../../components'
import { useNavigate } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import api from '../../services/api'
import {
  RegisterContainer,
  Logo,
  RegisterContent,
  ContentText,
  ButtonContainer,
} from './styles'

const confirmRegisterFormValidationSchema = zod.object({
  name: zod.string().min(1, 'Campo obrigatório'),
  email: zod.string().min(1, 'E-mail obgrigatório').email('E-mail inválido'),
  password: zod.string().min(6, 'Mínimo de 6 caracteres'),
})

export type RegisterData = zod.infer<
  typeof confirmRegisterFormValidationSchema
> & {
  name: string
  email: string
  password: string
}

type ConfirmRegisterData = RegisterData

interface ErrorsType {
  errors: {
    [key: string]: {
      message: string
    }
  }
}

export default function Register() {
  const navigate = useNavigate()

  const confirmRegisterForm = useForm<ConfirmRegisterData>({
    resolver: zodResolver(confirmRegisterFormValidationSchema),
  })

  const { handleSubmit, register, formState } = confirmRegisterForm

  const { errors } = formState as unknown as ErrorsType

  const handleUserRegister = async (data: ConfirmRegisterData) => {
    await api.post('/user', data)
    alert('Usuário cadastrado com sucesso!')
  }

  return (
    <RegisterContainer>
      <RegisterContent>
        <Logo>Cadastro</Logo>
        <ContentText>
          Preencha os campos abaixo para efetuar o cadastro.
        </ContentText>
        <FormProvider {...confirmRegisterForm}>
          <form onSubmit={handleSubmit(handleUserRegister)}>
            <Input
              label='Nome'
              placeholder='Digite seu nome'
              {...register('name')}
              error={errors.name?.message}
            />
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
            <ButtonContainer>
              <Button
                onClick={() => navigate('/login')}
                text='Voltar'
                color='green'
              />
              <Button text='Cadastrar' type='submit' />
            </ButtonContainer>
          </form>
        </FormProvider>
      </RegisterContent>
    </RegisterContainer>
  )
}
