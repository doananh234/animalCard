import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Redirect, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Layout } from 'antd';
import { Debounce } from 'react-throttle';
import WindowResizeListener from 'react-window-size-listener';
import Topbar from '../../containers/common/Topbar';
import Sidebar from '../../containers/common/Sidebar';
import Loading from '../../components/common/LoadingScreen';
import AuthorizeRoute from '../subRoute/AuthorizeRoute';
import { siteConfig } from '../../config';
import appActions from '../../redux/app/actions';
import AppHolder from './style';
import { PostList } from '../../containers/Post';

const { Content, Footer } = Layout;
const { toggleAll } = appActions;

// Pages
const authorizedRoutes = [
  {
    path: '/',
    component: Loadable({
      loader: () => import('../../containers/Home'),
      loading: Loading,
    }),
    exact: true,
  },
  {
    path: '/profile',
    component: Loadable({
      loader: () => import('../../containers/Profile'),
      loading: Loading,
    }),
    role: [],
  },
  {},
];

class PrivateRoute extends Component {
  componentDidMount() {}
  render() {
    const { match } = this.props;
    return (
      <div className="authorized-layout">
        <AppHolder>
          <Layout style={{ height: '100vh' }}>
            <Debounce time="1000" handler="onResize">
              <WindowResizeListener
                onResize={windowSize =>
                  this.props.toggleAll(windowSize.windowWidth, windowSize.windowHeight)}
              />
            </Debounce>
            <Topbar />
            <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
              <Sidebar />
              <Layout
                className="isoContentMainLayout"
                style={{
                  height: '100vh',
                }}
              >
                <Content
                  className="isomorphicContent"
                  style={{
                    padding: '70px 0 0',
                    flexShrink: '0',
                    background: '#f1f3f6',
                  }}
                >
                  <Switch>
                    {/* {authorizedRoutes.map(
                      ({ path, component, exact, role }) => {
                        const fullPath =
                          match.path === '/' ? path : match.path + path;
                        return (
                          <AuthorizeRoute
                            exact={exact}
                            path={fullPath}
                            component={component}
                            role={role}
                            key={fullPath}
                          />
                        );
                      },
                    )}
                    <Redirect
                      to={
                        match.path === '/'
                          ? authorizedRoutes[0].path
                          : match.path + authorizedRoutes[0].path
                      }
                    /> */}
                    <Route
                      exact
                      path="/grades"
                      hasCreate
                      render={routeProps => <PostList resource="Grade" {...routeProps} />}
                    />
                  </Switch>
                </Content>
                <Footer
                  style={{
                    background: '#ffffff',
                    textAlign: 'center',
                    borderTop: '1px solid #ededed',
                  }}
                >
                  {siteConfig.footerText}
                </Footer>
              </Layout>
            </Layout>
          </Layout>
        </AppHolder>
      </div>
    );
  }
}

PrivateRoute.propTypes = {
  match: PropTypes.object,
  toggleAll: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return {
    toggleAll: () => {
      dispatch(toggleAll());
    },
  };
};

export default connect(null, mapDispatchToProps)(PrivateRoute);
