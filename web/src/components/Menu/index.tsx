import { MenuContainer, HeaderContainer, Content, Logo } from './styles'
import { House, Users, ArrowFatLinesUp } from '@phosphor-icons/react'
import { IconsWithInfo } from './IconsWithInfo'
import { useNavigate } from 'react-router-dom'

export function Menu({ children }: any) {
  const navigate = useNavigate()

  return (
    <>
      <HeaderContainer></HeaderContainer>
      <MenuContainer>
        <Logo>Gerenciador Financeiro</Logo>
        <IconsWithInfo
          onClick={() => navigate('/')}
          icon={<House size={24} color='white' weight='bold' />}
          text='Página Inicial'
        />
        <IconsWithInfo
          onClick={() => navigate('/users')}
          icon={<Users size={24} color='white' weight='bold' />}
          text='Usuários'
        />
        <IconsWithInfo
          onClick={() => navigate('/entry')}
          icon={<ArrowFatLinesUp size={24} color='white' weight='bold' />}
          text='Lançamentos'
        />
      </MenuContainer>
      <Content>{children}</Content>
    </>
  )
}
