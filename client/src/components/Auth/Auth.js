import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
// import Icon from "./icon";
// import {GoogleLogin} from 'react-google-login';
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import {signin,signup} from "../../actions/auth"
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";

const initialState={
  firstName:"",
  lastName:"",
  email:"", 
  password:"",
  confirmPassword:""
}
const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch=useDispatch();
  const [showPassword,setShowPassword]=useState(false);
  const [isSignUp,setIsSignUp]=useState(false);
  const [formData,setFormData]=useState(initialState);

  const handleShowPassword=()=>setShowPassword((prevShowPassword)=>!prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)

    if(isSignUp){
      dispatch(signup(formData,history))
    }else{
      dispatch(signin(formData,history))

    }
  };

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const switchMode=()=>{
      setIsSignUp((prevIsSignUp)=>!prevIsSignUp);
      setShowPassword(false)
      
      // console.log(isSignUp)
  };

  // const googleSuccess=async(res)=>{
  //       console.log(res)
  // };

  // const googleError=(error)=>{
  //     console.log("Google SIgn In was unsuccessfull.Try Again later",error);
  // };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                <Input name="lastName" label="last Name" handleChange={handleChange} half/>
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type='email'/>
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword}/>
            { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
          </Grid>
     
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignUp?"Sign Up":"Sign In"}
          </Button>

          {/* <GoogleLogin
             clientId="68787477377-3sdbh7o9dug4driq5cseho71819oi7pg.apps.googleusercontent.com"
             render={(renderProps)=>(
               <Button
                 className={classes.googleButton}
                 color="primary"
                 fullWidth
                 onClick={renderProps.onClick}
                 disabled={renderProps.disabled}
                 startIcon={<Icon/>}
                 variant="contained"
               >
                Google Sign In
               </Button>
             )}
             onSuccess={googleSuccess}
             onFailure={googleFailure}
             cookiePolicy="single_host_origin"
          /> */}
            {/* <GoogleLogin
            clientId="68787477377-2enhu76ievk8nniief617qa6mbk7p9m5.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
            
          /> */}
          <Grid container justifyContent="flex-end">
            <Grid item>
                <Button onClick={switchMode}>
                  {
                    isSignUp?"Already have an account? Sign In ":"Don't have an acount?Sign Up"
                  }
                </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};


export default SignUp;