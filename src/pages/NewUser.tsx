import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./NewUser.css";
import { createUser, signIn } from "../service/firebase";
import AuthContext from "../store/authentication-context";
import { Box, Button, TextField } from "@mui/material";

function NewUser() {
  // const NameRef = useRef<HTMLInputElement>(null)
  const EmailRef = useRef<HTMLInputElement>(null);
  const PasswordRef = useRef<HTMLInputElement>(null);

  const history = useHistory();
  const authctx = useContext(AuthContext);
  function SetUserLoggedIn() {
    authctx.changeAuth(true);
  }
  function SaveUser() {
    createUser(EmailRef.current?.value ?? "", PasswordRef.current?.value ?? "")
      .then((userCredential) => {
        console.log("userc", userCredential);
        // Signed in
        // const user = userCredential.user
        SetUserLoggedIn();
        history.replace("/");
        // ...
      })
      .catch((error) => {
        console.error("error", error);
        // const errorCode = error.code
        // const errorMessage = error.message
        // ..
      });
  }
  function LoginUser() {
    signIn(EmailRef.current?.value ?? "", PasswordRef.current?.value ?? "")
      .then((userCredential) => {
        console.log("userc", userCredential);
        SetUserLoggedIn();
        history.replace("/");
        // Signed in
        // const user = userCredential.user
        // ...
      })
      .catch((error) => {
        console.error("error", error);
        // const errorCode = error.code
        // const errorMessage = error.message
        // ..
      });
  }
  return (
    <>
      {/* <label htmlFor="name">Name:</label>
      <TextField type="text" name="name" id="name" required inputRef={NameRef} />
      <br></br> */}
      {/* <label htmlFor="email">Email:</label> */}
      <TextField
        label="Email"
        type="email"
        name="email"
        id="email"
        required
        inputRef={EmailRef}
      />
      <br></br>
      <br></br>
      {/* <label htmlFor="password">Password:</label> */}
      <TextField
        type="password"
        name="password"
        id="password"
        label="password"
        required
        inputRef={PasswordRef}
      />
      <br></br>

      <br></br>
      <br></br>
      <br></br>
      <Button onClick={SaveUser}>Save</Button>
      <Button onClick={LoginUser}>Login</Button>
    </>
  );
}

export default NewUser;
