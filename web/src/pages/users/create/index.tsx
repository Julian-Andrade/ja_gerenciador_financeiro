import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import { useTheme } from 'styled-components'
import { Button, Content, Input, Loading } from '../../../components'
import { FormContainer, ButtonContainer } from './styles'

const confirmCreateUserValidationSchema = zod.object({
  name: zod.string().min(1, 'Nome Obrigatório'),
  email: zod.string().min(1, 'E-mail obgrigatório').email('E-mail inválido'),
  password: zod.string().min(6, 'Mínimo de 6 caracteres'),
})

const confirmUpdateUserValidationSchema = zod.object({
  name: zod.string().min(1, 'Nome Obrigatório'),
  email: zod.string().min(1, 'E-mail obgrigatório').email('E-mail inválido'),
  password: zod.string(),
})

export type CreateData = zod.infer<typeof confirmCreateUserValidationSchema>

type ConfirmCreateUser = CreateData

interface ErrorsType {
  errors: {
    [key: string]: {
      message: string
    }
  }
}

export default function Create() {
  const navigate = useNavigate()
  const location = useLocation()

  const { colors } = useTheme()

  const session = JSON.parse(localStorage.getItem('ger_fin') || '{}')

  const [loading, setLoading] = useState(false)

  const createUserForm = useForm<ConfirmCreateUser>({
    resolver: zodResolver(
      location?.state?.id
        ? confirmUpdateUserValidationSchema
        : confirmCreateUserValidationSchema
    ),
  })

  const { handleSubmit, register, formState, setValue } = createUserForm

  const { errors } = formState as unknown as ErrorsType

  const handleCreateUser = async (data: ConfirmCreateUser) => {
    try {
      setLoading(true)

      if (!location?.state?.id) {
        await api.post('/user', data, {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        })

        alert('Usuário cadastrado com sucesso')
      } else {
        await api.put(`/user/${location?.state?.id}`, data, {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        })

        alert('Usuário cadastrado com sucesso')
      }

      setLoading(false)

      navigate('/users')
    } catch (error) {
      alert('Não foi possível cadastrar o usuário')

      setLoading(false)
    }
  }

  const getUserById = async () => {
    setLoading(true)

    try {
      const response = await api.get(`/user/${location?.state?.id}`, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      })

      setValue('name', response?.data?.name)
      setValue('email', response?.data?.email)

      setLoading(false)
    } catch (error) {
      alert('Não foi possível encontrar o usuário')

      setLoading(false)
    }
  }

  useEffect(() => {
    if (location?.state?.id) {
      getUserById()
    }
  }, [])

  return (
    <Content>
      {loading && <Loading />}
      {!loading && (
        <FormContainer onSubmit={handleSubmit(handleCreateUser)}>
          <Input
            label='Nome'
            placeholder='Digite o seu nome'
            type='name'
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            label='E-mail'
            placeholder='Digite o seu email'
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
              text='Cancelar'
              bg={colors['base-error']}
              onClick={() => navigate('/users')}
            />
            <Button text='Cadastrar' bg={colors['base-button']} type='submit' />
          </ButtonContainer>
        </FormContainer>
      )}
    </Content>
  )
}
