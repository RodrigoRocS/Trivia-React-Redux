import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { disableBtn, timerDecrement } from '../redux/actions';

class Timer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const disableTime = 5000;
    const dropdown = 1000;
    setTimeout(() => {
      dispatch(disableBtn(false));
    }, disableTime);
    const cronometer = setInterval(() => {
      const { timer } = this.props;
      dispatch(timerDecrement(timer));
      if (timer === 1) {
        dispatch(disableBtn(true));
        clearInterval(cronometer);
      }
    }, dropdown);
  }

  render() {
    const { timer } = this.props;
    return (
      <p>{ timer }</p>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.timer.timer,
});

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Timer);
