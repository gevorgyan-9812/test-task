import React, { useRef, useState } from 'react';
import { register } from './UserFunctions';
import { TextField, Fab, Button, StepLabel, Step, Stepper, makeStyles } from '@material-ui/core';
import logo from '../Logo.png';
import { useHistory } from "react-router";

const Register = () => {

  const useStyles = makeStyles(() => ({
    root: {
      marginTop: '20%'
    },
    img: {
      display: 'flex',
      margin: '40px auto',
      justifyContent: 'center'
    },
    step_label_root: {
      fontSize: '10px',
      transform: 'scale(1.8)',
    },
    buttons: {
      float: 'right',
      marginTop: '20px'
    },
    form: {
      flexDirection: 'row',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '30px',
    },
    inputs: {
      display: 'flex',
      justifyContent: 'space-evenly'
    }
  }));

  const getSteps = () => {
    return ['Create your account Password', 'Upload an Image', 'Complete'];
  }
  
  const history = useHistory();
  const classes = useStyles();
  const steps = getSteps();

  const nameInput = useRef('');
  const emailInput = useRef('');
  const passwordInput = useRef('');
  const confirmPasswordInput = useRef('');
  const imageInput = useRef('');
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');

  const handleNext = () => {
    if(validate()) {
      if(activeStep === 1) {
        handleRegister();
      }
      if(activeStep === 0) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleRegister = () => {
      const formData = new FormData();
      const file = imageInput.current.files[0];
      formData.append(
        'avatar',
        file
      );

      formData.append('name', nameInput.current.value)
      formData.append('email', emailInput.current.value)
      formData.append('password', passwordInput.current.value)
    
      register(formData).then(res => {
        if(!res.error) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          history.push({
            pathname:  "/login"
          });
        } else {
          setError(res.error);
        }
      }) 
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setError('');
    emailInput.current.value = '';
    nameInput.current.value = '';
    passwordInput.current.value = '';
    confirmPasswordInput.current.value = '';
  };

  const validate = () => {
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if ( regex.test(String(emailInput.current.value).toLowerCase()) 
      && nameInput.current.value.trim().length
      && passwordInput.current.value.trim().length > 3
      && passwordInput.current.value === confirmPasswordInput.current.value) {
        return true;
    } else return false;
  }

    return  (
      <div className={classes.root}>
          <img className={classes.img} alt="Lvatar alt text" src={logo} />
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel classes={{ label: classes.step_label_root, iconContainer: classes.step_label_root }}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className={classes.form}>
            <div style={{width: '70%'}}>
              {
               (activeStep === 0 || activeStep === 1) ? 
                (<div>
                <div style={{width: '100%', backgroundColor: '#C5DCFA', textAlign: 'center', fontSize: '20px'}}>Create Your Account</div>
                    <div className={classes.inputs}>
                      <TextField
                            label="Name"
                            variant="outlined"
                            margin="normal"
                            style={{marginRight: '15px'}}
                            inputRef={nameInput}
                            disabled={activeStep === 1}
                      />
                      <TextField
                          label="Email"
                          variant="outlined"
                          margin="normal"
                          type='email'
                          disabled={activeStep === 1}                          
                          inputRef={emailInput}
                      />
                    </div>
                    <div className={classes.inputs}>
                      <TextField
                          label="Password"
                          variant="outlined"
                          margin="normal"
                          style={{marginRight: '15px'}}
                          inputRef={passwordInput}
                          disabled={activeStep === 1}                          
                          type='password'
                      />
                      <TextField
                          label="Confirm Password"
                          variant="outlined"
                          margin="normal"
                          type='password'
                          disabled={activeStep === 1}                          
                          inputRef={confirmPasswordInput}
                      />
                    </div>
                    {
                      activeStep === 1 ? (
                        <label style={{marginLeft: '40%'}}>
                          <input
                              style={{display:"none"}}
                              id="upload-avatar"
                              name="upload-avatar"
                              ref={imageInput}
                              type="file"
                              accept="image/x-png,image/gif,image/jpeg,image/png"
                          />
                          <Fab
                              color="inherit"
                              size="small"
                              component="span"
                              aria-label="add"
                              variant="extended"
                          >
                            Upload avatar
                          </Fab>
                    </label>
                      ) : ''
                    }
                </div> ) 
                : ''
              }
              {error ? <div style={{color: 'red', display: 'flex', justifyContent: 'flex-end'}}>{error}</div> : ''}
              {error ? (<div className={classes.buttons}><Button onClick={handleReset}>Reset</Button></div>) :
              (<div className={classes.buttons}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Save & Next'}
                </Button>
              </div>)
              } 
            </div>
          </div>
        </div>
        )
}

export default Register;
