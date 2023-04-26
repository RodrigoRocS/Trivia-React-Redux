import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playerInfos, tokenVerify } from '../redux/actions';
import { getRequest } from '../services/triviaApi';
import '../styles/Login.css';
import '../styles/buttons.css';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    dispatch(playerInfos(this.state));
    const getToken = await getRequest();
    await localStorage.setItem('token', getToken.token);
    history.push('/game');
    dispatch(tokenVerify(true));
  };

  render() {
    const { history } = this.props;
    const { name, email } = this.state;
    const isValid = this.validateEmail(email) && name.length > 0;

    return (
      <div className="login-container">
        <h1>Login</h1>
        <form action="">
          <div>
            <label htmlFor="name" className="input-container">
              <input
                className="input-login"
                type="text"
                data-testid="input-player-name"
                name="name"
                value={ name }
                onChange={ this.onInputChange }
                placeholder="Digite seu nome"
              />
            </label>
            <label
              htmlFor="email"
              className="input-container"
            >
              <input
                className="input-login"
                type="email"
                name="email"
                data-testid="input-gravatar-email"
                value={ email }
                onChange={ this.onInputChange }
                placeholder="Digite seu e-mail"
              />
            </label>
          </div>
          <div className="btn-container">
            <button
              className="btn-primary btn-color-primary"
              data-testid="btn-play"
              disabled={ !isValid }
              onClick={ this.handleClick }
            >
              Play
            </button>

            <button
              className="btn-primary btn-color-primary"
              data-testid="btn-settings"
              onClick={ () => history.push('/config') }
            >
              Config
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect(mapStateToProps)(Login);
