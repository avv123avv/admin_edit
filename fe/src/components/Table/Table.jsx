import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import { isEmpty } from 'lodash';

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import AddIcon from 'material-ui-icons/Add';
import LogoutIcon from 'material-ui-icons/Input';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';

import * as actions from 'redux/actions/userActions';

import styles from './styles';
import theme from './theme';

class TableComponent extends Component {

  static defaultProps = {
    loading: false
  };

  state = {
    openEdit: false,
    openDelete: false,
    user: {},
    error: false
  };

  componentDidMount() {
    this.props.getUsers();
  }

  componentWillReceiveProps(newProps) {
    if (isEmpty(newProps.user.error) && !newProps.user.loading && this.props.user.loading) {
      this.handleClose();
    }
  }

  handleClickOpenEdit = (val) => {
    this.setState({ openEdit: true, user: val });
  };

  handleClickOpenDelete = (val) => {
    this.setState({ openDelete: true, user: val });
  };

  handleClose = () => {
    this.setState({
      openEdit: false,
      openDelete: false,
      user: {}
    });
  };

  handleLogout = () => {
    this.props.logout();
  }

  handleEditUser = () => {
    const { user } = this.state;

    if (!user.id) {
      this.props.createUser(user);
    } else {
      this.props.editUser(user);
    }
  }

  handleDeleteUser = () => {
    const { user } = this.state;

    this.props.deleteUser(user);
  }

  handleCreateUser = () => {
    this.setState({
      openEdit: true
    });
  }

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

  parseError(error, classes) {
    if (error && error.error) {
      const errors = error.error;

      return Object.keys(errors).map((key) => {
        if (errors[key][0]) return <div className={classes.error}>{ errors[key][0] }</div>;
      });
    }
    return null;
  }

  renderDeleteDialog() {
    const { user: { loading }, classes } = this.props;

    return  (<Dialog
      open={this.state.openDelete}
      onClose={this.handleClose}
      aria-labelledby='form-dialog-title'
             >
      <DialogTitle id='form-dialog-title'>Delete User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you really want to delete this user?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleClose} raised color='accent'>
          No
        </Button>
        <div className={classes.dialogButtonWrapper}>
          <Button
            onClick={this.handleDeleteUser} raised color='primary'
          >
            Yes
          </Button>
          {loading && <CircularProgress size={24} className={classes.dialogButtonProgress} />}
        </div>
      </DialogActions>
    </Dialog>);
  }

  renderEditDialog() {
    const { user: { loading, error }, classes } = this.props;
    const { user } = this.state;

    return (<Dialog
      open={this.state.openEdit}
      onClose={this.handleClose}
      aria-labelledby='form-dialog-title'
            >
      <DialogTitle id='form-dialog-title'>{user.firstname ? 'Edit User' : 'Create User'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='firstName'
          label='Firstname'
          type='text'
          fullWidth
          defaultValue={user.firstname}
          onChange={(e) => this.handleChange(e.target.value, 'firstname')}
        />
        <TextField
          margin='dense'
          id='lastName'
          label='Lastname'
          type='text'
          fullWidth
          defaultValue={user.surname}
          onChange={(e) => this.handleChange(e.target.value, 'surname')}
        />
        <TextField
          margin='dense'
          id='email'
          label='Email Address'
          type='email'
          fullWidth
          defaultValue={user.email}
          onChange={(e) => this.handleChange(e.target.value, 'email')}
        />
        <TextField
          margin='dense'
          id='password'
          label='Password'
          type='password'
          fullWidth
          defaultValue={user.password}
          onChange={(e) => this.handleChange(e.target.value, 'password')}
        />
        {error && this.parseError(error, classes) }
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleClose} raised color='accent'>
          Cancel
        </Button>
        <div className={classes.dialogButtonWrapper}>
          <Button
            onClick={() => this.handleEditUser(user.id)} raised color='primary'
          >
            Save
          </Button>
          {loading && <CircularProgress size={24} className={classes.dialogButtonProgress} />}
        </div>
      </DialogActions>
    </Dialog>);
  }

  get renderData() {
    const { classes, user: { users, loading } } = this.props;

    if (users.length < 1 && loading) return <CircularProgress size={50} className={classes.dialogButtonProgress} />;
    return users.map((val, index) => {
      return (<TableRow key={index}>
        <TableCell>
          {val.firstname}
        </TableCell>
        <TableCell>
          {val.surname}
        </TableCell>
        <TableCell>
          {val.email}
        </TableCell>
        <TableCell>
          {val.password}
        </TableCell>
        <TableCell className={classes.lastCell}>
          <Button className={classes.button} raised color='primary'
            onClick={() => this.handleClickOpenEdit(val)}
          >
            Edit
            <EditIcon className={classes.rightIcon} />
          </Button>
          <Button className={classes.button} raised color='accent'
            onClick={() => this.handleClickOpenDelete(val)}
          >
            Delete
            <DeleteIcon className={classes.rightIcon} />
          </Button>
        </TableCell>
      </TableRow>);
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Firstname
                  </TableCell>
                  <TableCell>
                    Surname
                  </TableCell>
                  <TableCell>
                    Email
                  </TableCell>
                  <TableCell>
                    Password
                  </TableCell>
                  <TableCell className={classes.lastCell}>
                    <Button className={classes.button} onClick={this.handleCreateUser} raised
                      color='primary'
                    >
                    Create User
                    <AddIcon className={classes.rightIcon} />
                    </Button>
                    <Button className={classes.button} onClick={this.handleLogout} raised
                      color='primary'
                    >
                      Logout
                      <LogoutIcon className={classes.rightIcon} />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.renderData}
              </TableBody>
            </Table>
          </div>
          { this.renderEditDialog() }
          { this.renderDeleteDialog() }
        </Paper>
      </MuiThemeProvider>);
  }
}

export default connect(state => state, actions)(withStyles(styles)(TableComponent));
