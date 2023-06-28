import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import { useTheme } from 'styled-components'
import { Button, Content, Input, Loading } from '../../../components'
import { EntryContainer, FormContainer, ButtonContainer } from './styles'

const confirmCreateEntryValidationSchema = zod.object({
  date_sale: zod.date(),
  turn: zod.number().min(1, 'Informe o turno'),
  vendor: zod.string().min(4, 'Informe o vendedor'),
  over: zod.number().min(1, 'Informe a falta'),
  cash: zod.number().min(1, 'Informe a venda em dinheiro'),
  credit_card: zod.number().min(1, 'Informe a venda em cartão de crédito'),
  debit_card: zod.number().min(1, 'Informe a venda em cartão de débito'),
  pix: zod.number().min(1, 'Informe a venda pix'),
  promissory: zod.number().min(1, 'Informe a venda em promissória'),
  payment: zod.number().min(1, 'Informe o total em pagamentos'),
  tobacco: zod.number().min(1, 'Informe a venda em tabacaria'),
  rent_part: zod.number().min(1, 'Informe a retirada para aluguel'),
  carlton_part: zod.number().min(1, 'Informe a retirada para carlton'),
  purchase_part: zod.number().min(1, 'Informe a retirada para compras'),
  contabilitie_part: zod
    .number()
    .min(1, 'Informe a retirada para contabilidade'),
  thirteenth_part: zod
    .number()
    .min(1, 'Informe a retirada para décimo terceiro'),
  energetic_part: zod.number().min(1, 'Informe a retirada para energético'),
  energy_part: zod.number().min(1, 'Informe a retirada para energia'),
  gudang_part: zod.number().min(1, 'Informe a retirada para gudang'),
  ticket_part: zod.number().min(1, 'Informe a retirada para ticket'),
  salary_part: zod.number().min(1, 'Informe a retirada para salário'),
  security_part: zod.number().min(1, 'Informe a retirada para segurança'),
  icecream_part: zod.number().min(1, 'Informe a retirada para sorvete'),
})

const confirmUpdateEntryValidationSchema = zod.object({
  name: zod.string().min(1, 'Nome Obrigatório'),
  email: zod.string().min(1, 'E-mail obgrigatório').email('E-mail inválido'),
  password: zod.string(),
})

export type CreateData = zod.infer<typeof confirmCreateEntryValidationSchema>

type ConfirmCreateUser = CreateData

interface ErrorsType {
  errors: {
    [key: string]: {
      message: string
    }
  }
}

export default function EntryCreate() {
  const navigate = useNavigate()
  const location = useLocation()

  const { colors } = useTheme()

  const session = JSON.parse(localStorage.getItem('ger_fin') || '{}')

  const [loading, setLoading] = useState(false)

  const createUserForm = useForm<ConfirmCreateUser>({
    resolver: zodResolver(
      location?.state?.id
        ? confirmUpdateEntryValidationSchema
        : confirmCreateEntryValidationSchema
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

      // setValue('name', response?.data?.name)
      // setValue('email', response?.data?.email)

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
        <EntryContainer onSubmit={handleSubmit(handleCreateUser)}>
          <FormContainer>
            <Input
              label='Data'
              placeholder='Data'
              type='date'
              {...register('date_sale')}
              error={errors.date_sale?.message}
            />
            <Input
              label='Turno'
              placeholder='00'
              type='number'
              {...register('turn')}
              error={errors.turn?.message}
            />
            <Input
              label='Vendedor'
              placeholder='Nome do Vendedor'
              type='name'
              {...register('vendor')}
              error={errors.vendor?.message}
            />
            <Input
              label='Falta'
              placeholder='R$ 0,00'
              type='number'
              {...register('over')}
              error={errors.over?.message}
            />
            <Input
              label='Dinheiro'
              placeholder='R$ 0,00'
              type='number'
              {...register('cash')}
              error={errors.cash?.message}
            />
            <Input
              label='Cartão de Crédito'
              placeholder='R$ 0,00'
              type='number'
              {...register('credit_card')}
              error={errors.credit_card?.message}
            />
            <Input
              label='Cartão de Débito'
              placeholder='R$ 0,00'
              type='number'
              {...register('debit_card')}
              error={errors.debit_card?.message}
            />
            <Input
              label='Pix'
              placeholder='R$ 0,00'
              type='number'
              {...register('pix')}
              error={errors.pix?.message}
            />
            <Input
              label='Promissoria'
              placeholder='R$ 0,00'
              type='number'
              {...register('promissory')}
              error={errors.promissory?.message}
            />
            <Input
              label='Pagamentos'
              placeholder='R$ 0,00'
              type='number'
              {...register('payment')}
              error={errors.payment?.message}
            />
            <Input
              label='Tabacaria'
              placeholder='R$ 0,00'
              type='number'
              {...register('tobacco')}
              error={errors.tobacco?.message}
            />
            <Input
              label='Aluguel'
              placeholder='R$ 0,00'
              type='number'
              {...register('rent_part')}
              error={errors.rent_part?.message}
            />
            <Input
              label='Carlton'
              placeholder='R$ 0,00'
              type='number'
              {...register('carlton_part')}
              error={errors.carlton_part?.message}
            />
            <Input
              label='Compras'
              placeholder='R$ 0,00'
              type='number'
              {...register('purchase_part')}
              error={errors.purchase_part?.message}
            />
            <Input
              label='Contabilidade'
              placeholder='R$ 0,00'
              type='number'
              {...register('contabilitie_part')}
              error={errors.contabilitie_part?.message}
            />
            <Input
              label='Décimo Terceiro'
              placeholder='R$ 0,00'
              type='number'
              {...register('thirteenth_part')}
              error={errors.thirteenth_part?.message}
            />
            <Input
              label='Energético'
              placeholder='R$ 0,00'
              type='number'
              {...register('energetic_part')}
              error={errors.energetic_part?.message}
            />
            <Input
              label='Energia'
              placeholder='R$ 0,00'
              type='number'
              {...register('energy_part')}
              error={errors.energy_part?.message}
            />
            <Input
              label='Gudang'
              placeholder='R$ 0,00'
              type='number'
              {...register('gudang_part')}
              error={errors.gudang_part?.message}
            />
            <Input
              label='Ticket'
              placeholder='R$ 0,00'
              type='number'
              {...register('ticket_part')}
              error={errors.ticket_part?.message}
            />
            <Input
              label='Salário'
              placeholder='R$ 0,00'
              type='number'
              {...register('salary_part')}
              error={errors.salary_part?.message}
            />
            <Input
              label='Segurança'
              placeholder='R$ 0,00'
              type='number'
              {...register('security_part')}
              error={errors.security_part?.message}
            />
            <Input
              label='Sorvete'
              placeholder='R$ 0,00'
              type='number'
              {...register('icecream_part')}
              error={errors.icecream_part?.message}
            />
          </FormContainer>
          <ButtonContainer>
            <Button
              text='Cancelar'
              bg={colors['base-error']}
              onClick={() => navigate('/entry')}
            />
            <Button text='Cadastrar' bg={colors['base-button']} type='submit' />
          </ButtonContainer>
        </EntryContainer>
      )}
    </Content>
  )
}
