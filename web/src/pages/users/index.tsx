import { useEffect, useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { Content, Button, Loading } from '../../components'
import {
  TransactionsContainer,
  TransactionsTable,
  ButtonTableContainer,
} from './styles'

interface UsersProps {
  id: number
  name: string
  email: string
}

export default function Users() {
  const { colors } = useTheme()

  const [users, setUsers] = useState<UsersProps[]>([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const session = JSON.parse(localStorage.getItem('ger_fin') || '{}')

  const getUsers = async () => {
    try {
      setLoading(true)

      const users = await api.get('/user', {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      })

      setUsers(users.data)

      setLoading(false)
    } catch (error) {
      alert('Error, tente novamente')
      setLoading(false)
    }
  }

  const handleRemoveUser = async (id: any) => {
    setLoading(true)

    const message = confirm(
      'Deseja excluir este usuário? A ação não pode ser revertida.'
    )

    try {
      if (message) {
        await api.delete(`/user/${id}`, {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        })

        getUsers()
      }
      setLoading(false)
    } catch (error) {
      alert('Não foi possível excluir o usuário')
      setLoading(false)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <Content>
        <Button
          bg={colors['base-button']}
          text='Criar Usuário'
          onClick={() => navigate('/users/create')}
        />
        <TransactionsContainer>
          {loading && <Loading />}
          {!loading && (
            <TransactionsTable>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {users?.length
                  ? users.map((data, index) => (
                      <tr key={data.id}>
                        <td>{index + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>
                          <ButtonTableContainer>
                            <Button
                              text='Editar'
                              bg={colors['green-300']}
                              onClick={() =>
                                navigate('/users/create', {
                                  state: { id: data.id },
                                })
                              }
                            />
                            <Button
                              bg={colors['base-error']}
                              text='Excluir'
                              onClick={() => handleRemoveUser(data.id)}
                            />
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
    </>
  )
}
