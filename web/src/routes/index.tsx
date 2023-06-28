import { Routes, Route } from 'react-router-dom'
import { Menu } from '../components'
import Private from './private'
import Home from '../pages/home'
import Login from '../pages/login'
import Register from '../pages/register'
import Users from '../pages/users'
import Create from '../pages/users/create'
import Entry from '../pages/entry'
import EntryCreate from '../pages/entry/entryCreate'

export default function RouterDom() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route
        path='/'
        element={
          <Menu>
            <Private Component={Home} />
          </Menu>
        }
      />
      <Route
        path='/users'
        element={
          <Menu>
            <Private Component={Users} />
          </Menu>
        }
      />
      <Route
        path='/users/create'
        element={
          <Menu>
            <Private Component={Create} />
          </Menu>
        }
      />
      <Route
        path='/entry'
        element={
          <Menu>
            <Private Component={Entry} />
          </Menu>
        }
      />
      <Route
        path='/entry/create'
        element={
          <Menu>
            <Private Component={EntryCreate} />
          </Menu>
        }
      />
    </Routes>
  )
}
