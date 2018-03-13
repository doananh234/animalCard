import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';
import { history } from '../../redux/store';
import LoadingScreenTransparent from '../../components/common/LoadingScreenTransparent';
import AppHolder from './style';
import './index.css';

class PrivateLayout extends PureComponent {
  componentWillMount() {}
  componentDidMount() {}
  render() {
    const Component = this.props.component;
    const isAuthenticated = this.props.isAuthenticated;
    if (!isAuthenticated) {
      history.push('/auth/login');
    }
    return (
      <div>
        <AppHolder>
          <Route {...this.props} component={Component} />
          {this.props.isMainLoading ? <LoadingScreenTransparent /> : null}
          <Notifications notifications={this.props.notifications} />
        </AppHolder>
      </div>
    );
  }
}

PrivateLayout.propTypes = {
  component: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  isMainLoading: PropTypes.bool,
  notifications: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.login.isAuthenticated,
    isMainLoading: state.loading.isMainLoading,
    notifications: state.notifications,
  };
}

export default connect(mapStateToProps)(PrivateLayout);
