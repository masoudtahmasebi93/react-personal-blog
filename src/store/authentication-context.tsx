import { createContext, useState } from 'react'
import { AuthInterface } from '../models/auth.Interface'

const AuthContext = createContext<AuthInterface>({
  isLogged: true,
  theme: 'dark',
  changeAuth: (auth: any) => {},
})
export default AuthContext
export function AuthContextProvider(props: any) {
  const [auth, setAuth] = useState<boolean>()
  const context: AuthInterface = {
    isLogged: auth ?? false,
    theme: 'dark',
    changeAuth: changeAuthHandler,
  }
  function changeAuthHandler(newAuth: boolean) {
    setAuth((oldAuth) => {
      return newAuth
    })
  }
  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  )
}


