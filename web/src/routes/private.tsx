import { Navigate } from 'react-router-dom'

const Private = ({ Component }: any) => {
  const session = JSON.parse(localStorage.getItem('ger_fin') || '{}')

  return session?.token ? <Component /> : <Navigate to='/login' />
}

export default Private
