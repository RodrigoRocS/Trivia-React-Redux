import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { disableBtn } from '../redux/actions';

class Timer extends Component {
  state = {
    timer: 30,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const disableTime = 5000;
    const dropdown = 1000;
    setTimeout(() => {
      dispatch(disableBtn(false));
    }, disableTime);
    const cronometer = setInterval(() => {
      const { timer } = this.state;
      this.setState({ timer: timer - 1 });
      if (timer === 1) {
        dispatch(disableBtn(true));
        clearInterval(cronometer);
      }
    }, dropdown);
  }

  render() {
    const { timer } = this.state;
    return (
      <p>{ timer }</p>
    );
  }
}

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
export default connect()(Timer);
