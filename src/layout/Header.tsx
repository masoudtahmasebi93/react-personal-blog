import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../service/firebase'
import './Header.css'
import AuthContext from '../store/authentication-context'
import React from 'react'


interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}

function Header(props: HeaderProps) {
  const { sections, title } = props;

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
                <a onClick={Logout}>Logout</a>
              </div>
            ) : (
              <Link to="/login">Login/Registration</Link>
            )}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
    // <React.Fragment>
    //   <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
    //     <Button size="small">Subscribe</Button>
    //     <Typography
    //       component="h2"
    //       variant="h5"
    //       color="inherit"
    //       align="center"
    //       noWrap
    //       sx={{ flex: 1 }}
    //     >
    //       {title}
    //     </Typography>
    //     <IconButton>
    //       <SearchIcon />
    //     </IconButton>
    //     <Button variant="outlined" size="small">
    //       Sign up
    //     </Button>
    //   </Toolbar>
    //   <Toolbar
    //     component="nav"
    //     variant="dense"
    //     sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
    //   >
    //     {sections.map((section) => (
    //       <Link
    //         color="inherit"
    //         noWrap
    //         key={section.title}
    //         variant="body2"
    //         href={section.url}
    //         sx={{ p: 1, flexShrink: 0 }}
    //       >
    //         {section.title}
    //       </Link>
    //     ))}
    //   </Toolbar>
    // </React.Fragment>
  )
}

export default Header
