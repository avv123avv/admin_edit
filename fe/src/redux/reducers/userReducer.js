import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILED,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
  AUTH_USER,
  AUTH_USER_SUCCESS,
  AUTH_USER_ERROR
} from 'redux/actions/userActions';

const initialState = {
  users: [],
  loading: false,
  error: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        loading: action.loading,
        error: {}
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        users: action.users,
        error: {}
      };
    case GET_USERS_FAILED:
      return {
        ...state,
        loading: action.loading,
        error: action.error
      };

    case DELETE_USER:
      return {
        ...state,
        loading: action.loading
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        error: {}
      };
    case DELETE_USER_FAILED:
      return {
        ...state,
        error: action.error,
        loading: action.loading
      };

    case CREATE_USER:
      return {
        ...state,
        loading: action.loading
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        error: {}
      };
    case CREATE_USER_FAILED:
      return {
        ...state,
        error: action.error,
        loading: action.loading
      };

    case EDIT_USER:
      return {
        ...state,
        loading: action.loading
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        error: {}
      };
    case EDIT_USER_FAILED:
      return {
        ...state,
        error: action.error,
        loading: action.loading
      };

    case AUTH_USER:
      return {
        ...state,
        loading: action.loading
      };
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        error: {}
      };
    case AUTH_USER_ERROR:
      return {
        ...state,
        error: action.error,
        loading: action.loading
      };
    default:
      return state;
  }
}
