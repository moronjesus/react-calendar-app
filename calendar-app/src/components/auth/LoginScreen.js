import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';

import imagelogin  from '../../assets/img/imgCalendar.jpg';


const initForm = ()=>({
  
  email:'',
  password:'',

});

export const LoginScreen = () => {



    const dispatch = useDispatch();
    const classes = useStyles();
    const [ formValues, handleInputChange ]  = useForm( initForm );
    const { email, password } = formValues;


    const handleSubmit=(e)=>{

      e.preventDefault();
      dispatch( startLogin( email, password ) );

    }



    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
       <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
             {/*  <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={ handleSubmit }>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value= { email }
                autoComplete="email"
                autoFocus
                onChange= { handleInputChange }
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value= { password }
                autoComplete="current-password"
                onChange= { handleInputChange }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
                  <Link to= "/auth/register" >
                    {"Don't have an account? Sign Up"}
                  </Link>
              <Box mt={5}>
                
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
    }

    
  
  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
   
      backgroundImage: `url(${imagelogin})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(1),
      textAlign:'center',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },

  }));