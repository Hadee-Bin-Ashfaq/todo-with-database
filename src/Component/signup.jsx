import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SimpleSnackbar from '../container/snackbar';
import CircularUnderLoad from '../container/loader';
import { AppBar } from '@material-ui/core';
import * as firebase from 'firebase';
import './config';

class SignupPage extends Component {
  constructor() {
    super();
    this.state = {
      uid: '',
      user: '',
      email: '',
      password: '',
      isSignIn: true,
      success: '',
      editing: false,
      errorState: false,
      isLoading: false,
      dialogOpen: false,
      loginError: {}
    }
    this.ref = firebase.database().ref();
  }
  changeHandler = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }
  
  submitHandler = () => {
    const { email, password, isSignIn, loginError} = this.state;
    this.setState({
      isLoading: true
    })
    if (email.indexOf('@') !== -1 && email.indexOf('.com') !== -1) {
      if (password.length >= 6) {
        if (!isSignIn) {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
              this.setState({
                errorState: false,
                success: 'Email and Password successfully Made',
                dialogOpen: true,
                isSignIn: true,
                user: '',
                email: '',
                password: '',
                isLoading: false
              })
            })
            .catch(error => {
              this.onError(true, error, true, false);
            })
        }
        else {
          firebase.auth().signInWithEmailAndPassword(email, password)
            .then(resp => {
              const uid = resp.user.uid;
              this.setState({
                uid,
                isLoading: false,
                errorState: false
              });
              this.props.history.replace('/Todo', uid);
            })
            .catch(error => {
              this.onError(true, error, true, false);
            })
        }
      }
      else {
        loginError.message = 'Password must contain atleast six (6) character';
        this.onError(true, loginError, true, false);
      }
    }
    else {
      loginError.message = 'User Name must contain "@" & ".com"';
      this.onError(true, loginError, true, false);
    }
  }
  changeLoginPage = () => {
    this.setState(state => ({
      isSignIn: !state.isSignIn
    }))
  }
  handleClose = () => {
    this.setState({
      dialogOpen: false
    })
  }
  onError = (errorState, loginError, dialogOpen, isLoading) => {
    this.setState({ errorState, loginError, dialogOpen, isLoading })
  }

  render() {
    const { classes } = this.props;
    const { user,email, password, loginError, errorState, success, dialogOpen, isSignIn, isLoading } = this.state;
    console.log(this.state.user);
    if (isLoading) {
      return (
        <div className={classes.loader}>
          <CircularUnderLoad/>
        </div>
      )
    }
    else {
      return (
        <div>
          <React.Fragment>
            <div className={classes.root}>
              <AppBar position="static">
                <Typography variant="title" color="inherit">
                  Todo Application (Connected with Firebase)
            </Typography>
              </AppBar>
            </div>
            <CssBaseline />
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  {isSignIn ? 'Login Form' : 'SignUp Form'}
                </Typography>
                <form className={classes.form}>
                  {(!isSignIn) ? (
                    <div>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="text">User Name</InputLabel>
                        <Input name="user" autoFocus
                          value={user}
                          onChange={this.changeHandler} />
                      </FormControl>

                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email" autoComplete="email" autoFocus
                          value={email}
                          onChange={this.changeHandler} />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                          name="password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          value={password}
                          onChange={this.changeHandler}
                        />
                      </FormControl>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      /> </div>
                  ) : (<div>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="email">Email Address</InputLabel>
                      <Input id="email" name="email" autoComplete="email" autoFocus
                        value={email}
                        onChange={this.changeHandler} />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={this.changeHandler}
                      />
                    </FormControl>
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                  </div>)
                  }
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={this.submitHandler}
                  >
                    {isSignIn ? 'Log In' : 'Sign Up'}
                  </Button>
                </form>
                <small>{isSignIn ? 'Dont have an Account?' : 'Already have an Account'}</small>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={this.changeLoginPage}>
                  {isSignIn ? 'Sign Up' : 'Log In'}
                </Button>
              </Paper>
            </main>
          </React.Fragment>
          <SimpleSnackbar
            open={dialogOpen} close={this.handleClose}
            message={errorState ? loginError.message : success} />
        </div>
      );
    }
  }
}



const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 2 * 1)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 1,
  },
  root: {
    flexGrow: 1,
    padding: 10
  },
  loader: {
    display : 'flex',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center',
    height:'100vh'
  }
});
export default withStyles(styles)(SignupPage);