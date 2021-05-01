import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { firebase } from "../../firebase";

import logoImg from '../../assets/logo.svg';

function Login() {
  const firebaseAuthConfig = {
    signInFlow: "popup",
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false,
      },
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      },
    ],
    signInSuccessUrl: "/home",
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  }));
  const classes = useStyles();

  const Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © Minha Localização, todos direitos reservados.'}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img alt='Logo Minha Localização' src={logoImg}></img>
        <Typography style={{ marginTop: '1rem' }} component="h1" variant="h5">
          Acessar com
        </Typography>
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );

}

export default Login;