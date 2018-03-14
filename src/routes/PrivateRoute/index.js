import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Redirect, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
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
import { Card, Button, Layout, Icon, Avatar, Select } from 'antd';
import { VoicePlayer, VoiceRecognition } from '../../components/voice';
const { toggleAll } = appActions;
const { Header, Content, Footer, Sider } = Layout;
const data = require('./animal.json');
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
  state = {
    selected: 0
  }
  componentDidMount() { }
  onStart = () => {
    this.refs.voicePlayer.speak()
  }
  handleChange = (e) => {
    this.setState({ selected: e });
  };
  render() {
    const { match } = this.props;

    return (
      <Layout style={{ padding: '0 24px 24px' }}>
        <VoicePlayer
          onEnd={() => { }}
          onStart={() => { }}
          ref='voicePlayer'
          text={data[this.state.selected] ? data[this.state.selected].text : ''}
        />
        <Sider style={{ background: 'white' }}>
          <Card
            actions={[<Button onClick={this.onStart}><Icon type="play-circle" /></Button>]}
          >
            <div>
              <Select defaultValue={data[0].text} style={{ width: 120 }} onChange={this.handleChange}>
                {data.map((animal, index) => <Select.Option value={index}>{animal.text}</Select.Option>)}
              </Select>
            </div>
          </Card>
        </Sider>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          {this.state.selected >= 0 ? <img style={{ width: '100%' }} src={data[this.state.selected].src} /> : null}
        </Content>
      </Layout>
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
