import React from 'react';
import PropTypes from 'prop-types';

/**
 * Calculates the time difference between a given end date and the current date.
 *
 * @param {Date|string|number} date Date or timestamp representation of the end date.
 * @param {Object} [{ now = Date.now, precision = 0, controlled = false }={}]
 *  {function} [date=Date.now] Alternative function for returning the current date.
 *  {number} [precision=0] The precision on a millisecond basis.
 *  {boolean} [controlled=false] Defines whether the calculated value is already provided as the time difference or not.
 * @param {number} [precision=0] The precision on a millisecond basis.
 * @param {boolean} [controlled=false] Defines whether the calculated value is already provided as the time difference or not.
 * @returns Object that includes details about the time difference.
 */
export const getTimeDifference = (
  date
) => {
  const startDate = typeof date === 'string' ? new Date(date) : date;
  const total = parseInt(
    (Math.max(0, startDate - Date.now()) / 1000).toFixed(
      Math.max(0, Math.min(20, 0))
    ) * 1000,
    10
  );

  const seconds = total / 1000;

  return {
    total,
    minutes: Math.floor((seconds / 60) % 60),
    seconds: Math.floor(seconds % 60),
    milliseconds: Number(((seconds % 1) * 1000).toFixed()),
    completed: total <= 0,
  };
};

/**
 * A customizable countdown component for React.
 *
 * @export
 * @class Countdown
 * @extends {React.Component}
 */
export default class Countdown extends React.Component {
  constructor(props) {
    super(props);
    const { date } = this.props;
    this.mounted = false;
    this.state = {
      ...getTimeDifference(date),
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.interval = setInterval(this.tick, this.props.intervalDelay);
  }

  componentWillReceiveProps(nextProps) {
    const { date } = nextProps;
    this.setDeltaState(
      getTimeDifference(date)
    );
  }

  componentWillUnmount() {
    this.mounted = false;
    this.clearInterval();
  }

  setDeltaState(delta) {
    if (!this.state.completed && delta.completed) {
      this.clearInterval();

      if (this.props.onComplete) {
        this.props.onComplete(delta);
      }
    }

    if (this.mounted) {
      this.setState({ ...delta });
    }
  }

  clearInterval() {
    clearInterval(this.interval);
    delete this.interval;
  }

  tick = () => {
    const { date, onTick } = this.props;
    const delta = getTimeDifference(date); 
    this.setDeltaState({
      ...delta,
    });

    if (onTick && delta.total > 0) {
      onTick(delta);
    }
  };

  render() {

    if (this.state.completed && this.props.children) {
      const computedProps = { ...this.props, ...this.state };
      delete computedProps.children;
      return React.cloneElement(this.props.children, {
        countdown: computedProps,
      });
    } else {
      const { minutes, seconds } = this.state;
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  }
}

Countdown.propTypes = {
  date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string, PropTypes.number])
    .isRequired, // eslint-disable-line react/no-unused-prop-types
  intervalDelay: PropTypes.number,
  children: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  onTick: PropTypes.func,
  onComplete: PropTypes.func,
};

Countdown.defaultProps = {
  intervalDelay: 1000,
  children: null,
};
