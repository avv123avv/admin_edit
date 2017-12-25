export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILED = 'GET_USERS_FAILED';

export const EDIT_USER = 'EDIT_USER';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILED = 'EDIT_USER_FAILED';

export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILED = 'DELETE_USER_FAILED';

export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILED = 'CREATE_USER_FAILED';

export const AUTH_USER = 'AUTH_USER';
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const AUTH_USER_ERROR = 'AUTH_USER_ERROR';
export const LOGOUT = 'LOGOUT';

// get users
export function getUsers() {
  return {
    type: GET_USERS,
    loading: true
  };
}

export function getUsersSuccess(users) {
  return {
    type: GET_USERS_SUCCESS,
    users,
    loading: false
  };
}

export function getUsersFailed(error) {
  return {
    type: GET_USERS_FAILED,
    error,
    loading: false
  };
}

// create user
export function createUser(user) {
  return {
    type: CREATE_USER,
    user,
    loading: true
  };
}

export function createUserSuccess(user) {
  return {
    type: CREATE_USER_SUCCESS,
    user,
    loading: false
  };
}

export function createUserFailed(error) {
  return {
    type: CREATE_USER_FAILED,
    error,
    loading: false
  };
}

// edit user
export function editUser(user) {
  return {
    type: EDIT_USER,
    user,
    loading: true
  };
}

export function editUserSuccess(user) {
  return {
    type: EDIT_USER_SUCCESS,
    user,
    loading: false
  };
}

export function editUserFailed(error) {
  return {
    type: EDIT_USER_FAILED,
    error,
    loading: false
  };
}

// delete user
export function deleteUser(user) {
  return {
    type: DELETE_USER,
    user,
    loading: true
  };
}

export function deleteUserSuccess(user) {
  return {
    type: DELETE_USER_SUCCESS,
    user,
    loading: false
  };
}

export function deleteUserFailed(error) {
  return {
    type: DELETE_USER_FAILED,
    error,
    loading: false
  };
}

// login
export function authUser(user) {
  return {
    type: AUTH_USER,
    user,
    loading: true
  };
}

export function authUserSuccess(user) {
  return {
    type: AUTH_USER_SUCCESS,
    user,
    loading: false
  };
}

export function authUserError(error) {
  return {
    type: AUTH_USER_ERROR,
    error,
    loading: false
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
