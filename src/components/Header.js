import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const convertImg = md5(gravatarEmail).toString();
    const imgProfile = `https://www.gravatar.com/avatar/${convertImg}`;
    return (
      <header className="header-container">
        <img
          alt="Imagem do jogador"
          src={ imgProfile }
          data-testid="header-profile-picture"
          className="header-profile-picture"
        />
        <p
          data-testid="header-player-name"
          className="header-player-name"
        >
          {name}
        </p>
        <p
          data-testid="header-score"
          className="header-score"
        >
          {score}
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Header);
