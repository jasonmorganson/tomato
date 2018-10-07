const {interval} = require('rxjs')
const {take, map} = require('rxjs/operators')
const {ONE_MINUTE} = require('./constants.js')

const minutes = interval(ONE_MINUTE)

/**
 * Create step
 * Creates an observable of a step
 * @param {string} type - the type of step
 * @param {number} minutesInStep - the number of minutes in the step
 */
const createStep = (type, minutesInStep) => minutes.pipe(
  take(minutesInStep),
  map(time => ({
    type,
    minutesRemaining: minutesInStep - time
  }))
)

module.exports = createStep
