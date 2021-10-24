import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import ListPage from './pages/ListPage'
import MainLayout from './layout/MainLayout'
import NewPost from './pages/NewPost'
import { AuthContextProvider } from './store/authentication-context'
import NewUser from './pages/NewUser'

function App() {

  return (
    <AuthContextProvider>
      <MainLayout>
        <Switch>
          <Route path="/" exact>
            <ListPage></ListPage>
          </Route>
          <Route path="/new">
            <NewPost></NewPost>
          </Route>
          <Route path="/login">
            <NewUser></NewUser>
          </Route>
        </Switch>
      </MainLayout>
    </AuthContextProvider>
  )
}

export default App
