import { put, fork, takeEvery, call } from 'redux-saga/effects';

import api from 'api';

import * as actions from 'redux/actions/userActions';

export function * users() {
  try {
    const result = yield api().get('/users');

    yield put(actions.getUsersSuccess(result.data));
  } catch (error) {
    console.error('getUsers error', error);
    yield put(actions.getUsersFailed(error));
    return error;
  }
}

export function * delUser(action) {
  try {
    const user = action.user;
    const result = yield api().post('/deleteUser', {
      user
    });

    yield put(actions.deleteUserSuccess(result.data));
    yield call(users);
  } catch (error) {
    console.error('delUser error', error);
    yield put(actions.deleteUserFailed(error));
    return error;
  }
}

export function * newUser(action) {
  try {
    const user = action.user;
    const result = yield api().post('/user', {
      user
    });

    yield put(actions.createUserSuccess(result.data));
    yield call(users);
  } catch (error) {
    console.error('newUser error', error);
    yield put(actions.createUserFailed(error));
    return error;
  }
}

export function * edUser(action) {
  try {
    const user = action.user;
    const result = yield api().patch('/user', {
      user
    });

    yield put(actions.editUserSuccess(result.data));
    yield call(users);
  } catch (error) {
    console.error('edUser error', error);
    yield put(actions.editUserFailed(error));
    return error;
  }
}

export function * login(action) {
  try {
    const user = action.user;
    const result = yield api().post('/auth', {
      ...user
    });

    yield put(actions.authUserSuccess(result.data));
    window.location = '/';
  } catch (error) {
    console.error('login error', error);
    yield put(actions.authUserError('Invalid Username or Password'));
    return error;
  }
}

export function * logout() {
  try {
    yield api().get('/logout');
    window.location = '/login';
  } catch (error) {
    console.error('getUsers error', error);
    return error;
  }
}


export function * getUsers() {
  yield takeEvery(actions.GET_USERS, users);
}

export function * createUser() {
  yield takeEvery(actions.CREATE_USER, newUser);
}

export function * editUser() {
  yield takeEvery(actions.EDIT_USER, edUser);
}

export function * deleteUser() {
  yield takeEvery(actions.DELETE_USER, delUser);
}

export function * authUser() {
  yield takeEvery(actions.AUTH_USER, login);
}

export function * getLogout() {
  yield takeEvery(actions.LOGOUT, logout);
}

export default function * root() {
  yield fork(getUsers);
  yield fork(deleteUser);
  yield fork(createUser);
  yield fork(editUser);
  yield fork(authUser);
  yield fork(getLogout);
}
