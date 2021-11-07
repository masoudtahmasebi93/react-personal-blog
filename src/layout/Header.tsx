import { Button, IconButton, Toolbar, Typography } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import SearchIcon from '@mui/icons-material/Search';
import { useContext, useEffect } from "react";
import { logoutUser } from "../service/firebase";
import "./Header.css";
import AuthContext from "../store/authentication-context";
import React from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}

function Header(props: HeaderProps) {
  const { sections, title } = props;

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authContext.changeAuth(true);
      } else {
        // User is signed out
        // ...
      }
    });
  }, [authContext]);
  function Logout() {
    logoutUser()
      .then(() => {
        authContext.changeAuth(false);
        // Sign-out successful.
      })
      .catch((error) => {
        console.log("auth error", error);
        // An error happened.
      });
  }
  return (
    // <AppBar>
    //   <Toolbar>
    //     <div className="">
    //       <Typography variant="h6" component="h1">
    //         Masoud Tahmasebi Blog
    //       </Typography>
    //     </div>
    //     <div className="justify-end">
    //       {' '}
    //       <Button>
    //         <Link to="/">Home</Link>
    //       </Button>
    //       <Button>
    //         {authContext.isLogged ? (
    //           <div className="">
    //             <Link to="/new">New Post</Link>
    //             <a onClick={Logout}>Logout</a>
    //           </div>
    //         ) : (
    //           <Link to="/login">Login/Registration</Link>
    //         )}
    //       </Button>
    //     </div>
    //   </Toolbar>
    // </AppBar>
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
          {/* <SearchIcon /> */}
          Search
        </IconButton>
        {authContext.isLogged ? (
          <Link to="/new">New Post</Link>
        ) : (
          <Link to="/login">Sign up</Link>
        )}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            key={section.title}
            to={section.url}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;
