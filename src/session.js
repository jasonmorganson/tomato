const {concat} = require('rxjs')
const {repeat} = require('rxjs/operators')
const {SHORT_BREAK, LONG_BREAK, POMODORO} = require('./constants.js')
const {SHORT_BREAK_MINUTES, LONG_BREAK_MINUTES, POMODORO_MINUTES} = require('./config')
const createStep = require('./createStep')
const shortBreak = createStep(SHORT_BREAK, SHORT_BREAK_MINUTES)
const longBreak = createStep(LONG_BREAK, LONG_BREAK_MINUTES)
const pomodoro = createStep(POMODORO, POMODORO_MINUTES)

const session = concat(
  concat(pomodoro, shortBreak).pipe(repeat(3)),
  pomodoro,
  longBreak
)

module.exports = session
