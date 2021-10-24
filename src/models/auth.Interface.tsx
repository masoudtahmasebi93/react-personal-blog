import { User } from 'firebase/auth'

export interface AuthInterface {
  isLogged: boolean | User
  theme: string
  changeAuth: Function
}
