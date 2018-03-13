import { LoginTypes } from './actions';
import { makeReducerCreator } from '../reduxCreator';

export const initialState = {
  isAuthenticated: false,
  roles: '',
  loginError: false,
  loginSuccess: false,
};

const loginSuccess = state => {
  return {
    ...state,
    isAuthenticated: true,
    loginError: false,
    loginSuccess: true,
  };
};

const loginFail = (state, action) => {
  return {
    ...state,
    isAuthenticated: false,
    loginError: action.error,
    loginSuccess: false,
  };
};

export const login = makeReducerCreator(initialState, {
  [LoginTypes.LOGIN_AUTH_SUCCESS]: loginSuccess,
  [LoginTypes.LOGIN_AUTH_FAIL]: loginFail,
});
