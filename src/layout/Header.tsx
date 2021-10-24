import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../service/firebase'
import './Header.css'
import AuthContext from '../store/authentication-context'

function Header() {
  const authContext = useContext(AuthContext)

  useEffect(() => {
    // if (getCurrentUser()) {
    //   console.log('aaa')

    //   authContext.changeAuth(true)
    // }
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log('aaa')

        authContext.changeAuth(true)
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid
        // ...
      } else {
        // User is signed out
        // ...
      }
    })
  }, [authContext])
  function Logout() {
    logoutUser()
      .then(() => {
        authContext.changeAuth(false)
        // Sign-out successful.
      })
      .catch((error) => {
        console.log('auth error', error)
        // An error happened.
      })
  }
  return (
    <AppBar>
      <Toolbar>
        <div className="">
          <Typography variant="h6" component="h1">
            Masoud Tahmasebi Blog
          </Typography>
        </div>
        <div className="justify-end">
          {' '}
          <Button>
            <Link to="/">Home</Link>
          </Button>
          <Button>
            {authContext.isLogged ? (
              <div className="">
                <Link to="/new">New Post</Link>
                <Button onClick={Logout}>Logout</Button>
              </div>
            ) : (
              <Link to="/login">Login/Registration</Link>
            )}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
