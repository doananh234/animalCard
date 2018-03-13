import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import { loginThunk } from '../../redux/login/thunks';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './style';
import { VoicePlayer, VoiceRecognition } from '../../components/voice'; 

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isAuthenticated !== nextProps.isAuthenticated &&
      nextProps.isAuthenticated === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = () => {
    console.log('this.refs.voicePlayer.speak(): ', this.refs.voicePlayer.speak());
    
    return;
    this.props.loginThunk();
    this.props.history.push('/dashboard');
  };
  render() {
    const from = { pathname: '/dashboard' };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.signInTitle" />
              </Link>
            </div>

            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                <Input size="large" placeholder="Username" />
              </div>

              <div className="isoInputWrapper">
                <Input size="large" type="password" placeholder="Password" />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
                <Button type="primary" onClick={this.handleLogin}>
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>

              <p className="isoHelperText">
                <IntlMessages id="page.signInPreview" />
              </p>
              <div className="isoCenterComponent isoHelperWrapper">
                <Link to="/forgotpassword" className="isoForgotPass">
                  <IntlMessages id="page.signInForgotPass" />
                </Link>
                <Link to="/signup">
                  <IntlMessages id="page.signInCreateAccount" />
                </Link>
              </div>
            </div>
      <VoicePlayer
          onEnd={() =>{}}
          onStart={() =>{}}
          ref='voicePlayer'
          text="React voice player demonstration"
        />
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

SignIn.propTypes = {
  isAuthenticated: PropTypes.boolean,
  loginThunk: PropTypes.func,
  history: PropTypes.object,
};

export default connect(
  state => ({
    isAuthenticated: state.login.isAuthenticated,
  }),
  dispatch => ({
    loginThunk: () => {
      dispatch(loginThunk());
    },
  }),
)(SignIn);
