import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as notifications } from 'react-notification-system-redux';
import { adminReducer, localeReducer } from 'admin-on-rest';
import { reducer as formReducer } from 'redux-form';
import { login } from './login/reducer';
import { loading } from './loading/reducer';
import LanguageSwitcher from './languageSwitcher/reducer';
import App from './app/reducer';

export default combineReducers({
  routing: routerReducer,
  admin: adminReducer,
  locale: localeReducer(),
  form: formReducer,
  login,
  loading,
  notifications,
  LanguageSwitcher,
  App,
});
