import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const convertImg = md5(gravatarEmail).toString();
    const imgProfile = `https://www.gravatar.com/avatar/${convertImg}`;
    return (
      <header>
        <img
          alt="Imagem do jogador"
          src={ imgProfile }
          data-testid="header-profile-picture"
        />
        <p
          data-testid="header-player-name"
        >
          {name}
        </p>
        <p
          data-testid="header-score"
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
