import React, { useRef, useState } from 'react';
import { login } from './UserFunctions';
import { TextField, Button, makeStyles } from '@material-ui/core';
import { useHistory } from "react-router";


const Login = () => {

  const useStyles = makeStyles(() => ({
    form: {
      width: '30%',
      display: 'flex',
      margin: '25% auto',
      flexDirection: 'column'
    }
  }));

  const history = useHistory();
  const classes = useStyles();
  const emailInput = useRef('');
  const passwordInput = useRef('');
  const [error, setError] = useState('');

  const validate = () => {
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if ( regex.test(String(emailInput.current.value).toLowerCase())
      && passwordInput.current.value.trim().length > 3) {
        return true;
    } else return false;
  }

  const onSubmit = () => {
    const user = {
      email: emailInput.current.value,
      password: passwordInput.current.value
    }
    if(validate()) {
      login(user)
      .then(res => {
        if (!res.error) {
          history.push({
              pathname:  "/profile"
           });
        } else {
          setError(res.error);
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }

    return (
      <div className={classes.form}>
      <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            inputRef={emailInput}
        />
        <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            inputRef={passwordInput}
            onKeyDown={event => {
                if(event.key === "Enter"){
                  event.preventDefault();
                  onSubmit();
                }
              }}
        />
        {error ? <p style={{color: 'red'}}>{error}</p> : ''}
        <Button
        variant="contained"
        color="primary"
        onClick={onSubmit}
      >
          Log In
      </Button>
        </div>
    )
}

export default Login;
