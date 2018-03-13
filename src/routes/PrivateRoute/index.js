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
import { Card, Button } from 'antd';
import { VoicePlayer, VoiceRecognition } from '../../components/voice'; 
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
  }
];

class PrivateRoute extends Component {
  componentDidMount() {}
  onStart = () => {
    this.refs.voicePlayer.speak()
  }
  render() {
    const { match } = this.props;
    return (
      <div className="authorized-layout">
        <AppHolder>
        <Card title="Card title" extra={<Button onClick={this.onStart}>start</Button>} style={{ width: 300 }}>
    <p>Card content</p>
    <VoicePlayer
        onEnd={() =>{}}
        onStart={() =>{}}
        ref='voicePlayer'
        text="React voice player demonstration"
      />
  </Card>
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
