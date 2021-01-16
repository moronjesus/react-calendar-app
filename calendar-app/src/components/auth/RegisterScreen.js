import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startRegister } from '../../actions/auth';

import imagelogin  from '../../assets/img/imgCalendar.jpg';

const initForm = ()=>({

    name:'',
    email:'',
    password:'',
    confirmpassword:'',
  
  });


export const RegisterScreen = () => {
   

    const dispatch = useDispatch();
    const classes = useStyles();
    const [ formValues, handleInputChange ]  = useForm( initForm );
    const { name, email, password, confirmpassword } = formValues;


    const handleSubmit=(e)=>{
        
        e.preventDefault();
        if(password !== confirmpassword ){

            Swal.fire('Error', 'Los password no son iguales', 'error');

        }else{

            dispatch( startRegister( name, email, password ) );
        }

      

    }



    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
       <Grid item xs={false} sm={4} md={7} className={classes.image} /> 
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            </Avatar>
            <Typography component="h1" variant="h5">
             Register
            </Typography>
            <form className={classes.form} noValidate onSubmit={ handleSubmit }>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                onChange= { handleInputChange }
                value= { name }
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange= { handleInputChange }
                value= { email }
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
                autoComplete="current-password"
                onChange= { handleInputChange }
                value= { password }
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                id="confirmpassword"
                label="Confirm password"
                name="confirmpassword"
                onChange= { handleInputChange }
                value= { confirmpassword }
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>

              <Link to="/auth/login" >
                    Alredy registered?
                </Link>
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