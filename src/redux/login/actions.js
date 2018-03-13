import { makeConstantCreator, makeActionCreator } from '../reduxCreator';

export const LoginTypes = makeConstantCreator(
  'LOGIN_AUTH_FAIL',
  'LOGIN_AUTH_SUCCESS',
);

export const login = () => makeActionCreator(LoginTypes.LOGIN_AUTH_SUCCESS);
