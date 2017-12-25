import React, { Component } from 'react';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import * as actions from 'redux/actions/userActions';

import styles from './styles';
import theme from './theme';

class Login extends Component {

  static defaultProps = {
    loading: false
  };

  state = {
    user:{}
  };

  handleChange = (val, field) => {
    this.setState((state) => {
      const user = state.user;

      user[field] = val;

      return {
        ...state,
        user
      };
    });
  };

  handleLogin = () => {
    this.props.authUser(this.state.user);
  }

  render() {
    const { classes, user: { loading, error } } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <Card className={classes.card}>
          <CardContent>
            <TextField
              autoFocus
              margin='dense'
              id='login'
              label='Login'
              type='text'
              fullWidth
              onChange={(e) => this.handleChange(e.target.value, 'username')}
            />
            <TextField
              margin='dense'
              id='password'
              label='Password'
              type='password'
              fullWidth
              onChange={(e) => this.handleChange(e.target.value, 'password')}
            />
            {!isEmpty(error) && <div className={classes.error}>{ error }</div> }
          </CardContent>
          <CardActions>
            <div className={classes.dialogButtonWrapper}>
              <Button className={classes.button} raised color='primary'
                onClick={this.handleLogin}
              >
                Login
              </Button>
              {loading && <CircularProgress size={24} className={classes.dialogButtonProgress} />}
            </div>
          </CardActions>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default connect(state => state, actions)(withStyles(styles)(Login));
