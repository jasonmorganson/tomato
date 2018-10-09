const config = require('../config.json')

const {
  focus: POMODORO_MINUTES,
  short: SHORT_BREAK_MINUTES,
  long: LONG_BREAK_MINUTES
} = config

module.exports = {
  POMODORO_MINUTES,
  SHORT_BREAK_MINUTES,
  LONG_BREAK_MINUTES
}
