import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Message from '../../Helpers/useMessage';
import API from '../../API';

import '../../Static/css/AuthForm.css';
const AuthForm = ({ setToken }) => {
  const LOGIN_STATE = {
    move: 'move',
    move_left: 'move-left',
    move_right: 'move-right',
    move_down: 'move-down',
  };

  const REGISTER_STATE = {
    move: '',
    move_left: '',
    move_right: '',
    move_down: '',
  };
  const history = useHistory();

  const [endpoint, setEndpoint] = useState('login');
  const [formClass, setFormClass] = useState(LOGIN_STATE);
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: '',
    email: '',
    errors: [],
  });

  const setLoginView = () => {
    setEndpoint('login');
    setFormClass(LOGIN_STATE);
  };

  const setSignupView = () => {
    setEndpoint('register');
    setFormClass(REGISTER_STATE);
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    let data;

    if (endpoint === 'register') {
      // these fields aren't req'd---pass undefined, not empty string
      data = {
        username: loginInfo.username,
        password: loginInfo.password,
        email: loginInfo.email || undefined,
      };
    } else {
      data = {
        username: loginInfo.username,
        password: loginInfo.password,
      };
    }

    let token;

    try {
      token = await API[endpoint](data);
    } catch (errors) {
      return setLoginInfo((l) => ({ ...l, errors }));
    }

    setToken(token);
    history.push('/jobs');
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginInfo((l) => ({ ...l, [name]: value }));
  }

  return (
    <section className="AuthForm">
      <div className="container">
        {loginInfo.errors.length ? (
          <Message type="danger" message={loginInfo.errors} />
        ) : null}
        <div className="row row-container">
          <div className={`overlay-container ${formClass.move}`}>
            <div className="overlay">
              <div className="row">
                <div className="col-sm-6">
                  <div className={`right ${formClass.move_down}`}>
                    <h1>Welcome Back!</h1>
                    <p>Stay connected and login with your personal info</p>
                    <button
                      className="ghost"
                      onClick={setLoginView}
                      id="signIn"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="left">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button
                      className="ghost"
                      onClick={setSignupView}
                      id="signUp"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`col-sm-6 form-container sign-up-container ${formClass.move_left}`}
          >
            <form onSubmit={handleSubmit}>
              <h1>Create Account</h1>
              <div className="social-container">
                <p className="social">
                  <i className="fab fa-facebook-f"></i>
                </p>
                <p className="social">
                  <i className="fab fa-google-plus-g"></i>
                </p>
                <p className="social">
                  <i className="fab fa-linkedin-in"></i>
                </p>
              </div>
              <span>or use your email for registration</span>

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control"
                value={loginInfo.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="form-control"
                value={loginInfo.username}
                onChange={handleChange}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="form-control"
                value={loginInfo.password}
                onChange={handleChange}
              />

              <button>Sign Up</button>
            </form>
          </div>
          <div
            className={`col-sm-6 form-container sign-in-container ${formClass.move_right}`}
          >
            <form onSubmit={handleSubmit}>
              <h1>Sign in</h1>
              <div className="social-container">
                <p className="social">
                  <i className="fab fa-facebook-f"></i>
                </p>
                <p className="social">
                  <i className="fab fa-google-plus-g"></i>
                </p>
                <p className="social">
                  <i className="fab fa-linkedin-in"></i>
                </p>
              </div>
              <span>or use your account</span>
              <input
                type="username"
                name="username"
                placeholder="Username"
                className="form-control"
                value={loginInfo.username}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                value={loginInfo.password}
                onChange={handleChange}
              />
              <p>Forgot your password?</p>

              <button onClick={handleSubmit}>Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
