import React from 'react';
import Raven from 'raven-js';
import { LocaleProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import { Switch, Redirect, Route } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Loadable from 'react-loadable';
import 'antd/dist/antd.css';
import { ThemeProvider } from 'styled-components';
import { TranslationProvider, declareResources } from 'admin-on-rest';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store, { history } from './redux/store';
import PrivateLayout from './layouts/PrivateLayout';
import PublicLayout from './layouts/PublicLayout';
import ErrorLayout from './layouts/ErrorLayout';
import Loading from './components/common/LoadingScreen';
import AppLocale from './languageProvider';
import themes from './config/themes';
import { themeConfig } from './config';
import config, { getCurrentLanguage } from './containers/common/LanguageSwitcher/config';
import StyleHolder from './appStyle';
import { PostList } from './containers/Post';

const target = document.querySelector('#root');

const currentAppLocale = AppLocale[getCurrentLanguage(config.defaultLanguage || 'english').locale];

store.dispatch(declareResources([{ name: 'Grade' }]));

render(
  <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
    <ThemeProvider theme={themes[themeConfig.theme]}>
      <StyleHolder>
        <Provider store={store}>
          <TranslationProvider>
            <ConnectedRouter history={history}>
              <MuiThemeProvider>
                <ErrorLayout
                  path="/error"
                  component={Loadable({
                    loader: () => import('./routes/ErrorRoute'),
                    loading: Loading,
                  })}
                />
                <PublicLayout
                  path="/auth"
                  component={Loadable({
                    loader: () => import('./routes/PublicRoute'),
                    loading: Loading,
                  })}
                  locale={currentAppLocale.antd.locale}
                  selectedTheme={themeConfig.theme}
                />
                <PrivateLayout
                  path="/"
                  component={Loadable({
                    loader: () => import('./routes/PrivateRoute'),
                    loading: Loading,
                  })}
                  locale={currentAppLocale.antd.locale}
                  selectedTheme={themeConfig.theme}
                />
              </MuiThemeProvider>
            </ConnectedRouter>
          </TranslationProvider>
        </Provider>
      </StyleHolder>
    </ThemeProvider>
  </IntlProvider>,
  target,
);

export { AppLocale };

Raven.config(process.env.REACT_APP_SENTRY_IO_URL).install();
