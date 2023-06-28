import { Content, Button, Loading } from '../../components'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'
import {
  TransactionsContainer,
  TransactionsTable,
  ButtonTableContainer,
} from './styles'
import { useEffect, useState } from 'react'
import moment from 'moment'

interface SalesProps {
  id: string
  date_sale: string
  turn: number
  vendor: string
  over: number
  fault: number
  cash: number
  credit_card: number
  debit_cart: number
  pix: number
  promissory: number
  payment: number
  tobacco: number
  total_sale: number
  rent_part: number
  carlton_part: number
  purchase_part: number
  contabilitie_part: number
  thirteenth_part: number
  energetic_part: number
  energy_part: number
  gudang_part: number
  tax_part: number
  ticket_part: number
  salary_part: number
  security_part: number
  icecream_part: number
  total_geral_part: number
}

export default function Entry() {
  const navigate = useNavigate()

  const [sales, setSales] = useState<SalesProps[]>([])
  const [loading, setLoading] = useState(false)

  const session = JSON.parse(localStorage.getItem('ger_fin') || '{}')

  const { colors } = useTheme()

  const getSales = async () => {
    try {
      setLoading(true)

      const sales = await api.get('/sales', {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      })
      setSales(sales?.data)
      setLoading(false)
    } catch (error) {
      alert('Error, tente novamente')
      setLoading(false)
    }
  }

  useEffect(() => {
    getSales()
  }, [])

  const convertValue = (value: number) => {
    const convert = value.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })
    return convert
  }

  return (
    <Content>
      <Button
        text='Cadastrar'
        bg={colors['base-button']}
        onClick={() => navigate('/entry/create')}
      />
      <TransactionsContainer>
        {loading && <Loading />}
        {!loading && (
          <TransactionsTable>
            <thead>
              <tr>
                <th>#</th>
                <th>Data</th>
                <th>Turno</th>
                <th>Vendedor</th>
                <th>Sobra</th>
                <th>Falta</th>
                <th>Dinheiro</th>
                <th>C. Crédito</th>
                <th>C. Débito</th>
                <th>Pix</th>
                <th>Promissória</th>
                <th>Pagamentos</th>
                <th>Tabacaria</th>
                <th>T. Venda</th>
                <th>Aluguel</th>
                <th>Carlton</th>
                <th>Pagamentos</th>
                <th>Contabilidade</th>
                <th>Décimo</th>
                <th>Energético</th>
                <th>Energia</th>
                <th>Gudang</th>
                <th>Imposto</th>
                <th>Salário</th>
                <th>Salário</th>
                <th>Segurança</th>
                <th>Sorvete</th>
                <th>Total Geral</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {sales?.length
                ? sales.map((data, index) => (
                    <tr key={data.id}>
                      <td>{index + 1}</td>
                      <td>{moment(data.date_sale).format('DD/MM/YYYY')}</td>
                      <td>{data.turn}</td>
                      <td>{data.vendor}</td>
                      <td>{convertValue(data.over)}</td>
                      <td>{convertValue(data.fault || 0)}</td>
                      <td>{convertValue(data.cash || 0)}</td>
                      <td>{convertValue(data.credit_card || 0)}</td>
                      <td>{convertValue(data.debit_cart || 0)}</td>
                      <td>{convertValue(data.pix || 0)}</td>
                      <td>{convertValue(data.promissory || 0)}</td>
                      <td>{convertValue(data.payment || 0)}</td>
                      <td>{convertValue(data.tobacco || 0)}</td>
                      <td>{convertValue(data.total_sale || 0)}</td>
                      <td>{convertValue(data.rent_part || 0)}</td>
                      <td>{convertValue(data.carlton_part || 0)}</td>
                      <td>{convertValue(data.purchase_part || 0)}</td>
                      <td>{convertValue(data.contabilitie_part || 0)}</td>
                      <td>{convertValue(data.thirteenth_part || 0)}</td>
                      <td>{convertValue(data.energetic_part || 0)}</td>
                      <td>{convertValue(data.energy_part || 0)}</td>
                      <td>{convertValue(data.gudang_part || 0)}</td>
                      <td>{convertValue(data.tax_part || 0)}</td>
                      <td>{convertValue(data.ticket_part || 0)}</td>
                      <td>{convertValue(data.salary_part || 0)}</td>
                      <td>{convertValue(data.security_part || 0)}</td>
                      <td>{convertValue(data.icecream_part || 0)}</td>
                      <td>{convertValue(data.total_geral_part || 0)}</td>
                      <td>
                        <ButtonTableContainer>
                          <Button text='Editar' bg={colors['green-300']} />
                          <Button bg={colors['base-error']} text='Excluir' />
                        </ButtonTableContainer>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </TransactionsTable>
        )}
      </TransactionsContainer>
    </Content>
  )
}
