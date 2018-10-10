const testObservable = require('../tests/supporting/testObservable.js')
const step = require('./createStep.js')

test('A step is observed as expected', () => {
  const type = 'A_STEP'
  const expected = {type, minutesRemaining: 1}
  const expectedMarble = '(a |)'
  const expectedValues = {a: expected}
  const actual = step(type, 1)
  testObservable(actual, expectedMarble, expectedValues)
})

test('The steps are always observed as expected', () => {
  const type = 'SOME_STEPS'
  const expected = {type, minutesRemaining: 1}
  const expectedMarble = 'a 59999ms (b |)'
  const expectedValues = {
    a: {type, minutesRemaining: 2},
    b: {type, minutesRemaining: 1}}
  const actual = step(type, 2)
  testObservable(actual, expectedMarble, expectedValues)
})

test('Steps are observed as expected for a short break', () => {
  const type = 'SHORT_BREAK'
  const expectedMarble = 'a 59999ms b 59999ms c 59999ms d 59999ms (e |)'
  const expectedValues = {
    a: {type, minutesRemaining: 5},
    b: {type, minutesRemaining: 4},
    c: {type, minutesRemaining: 3},
    d: {type, minutesRemaining: 2},
    e: {type, minutesRemaining: 1}}
  const actual = step(type, 5)
  testObservable(actual, expectedMarble, expectedValues)
})

test('Steps are observed as expected for a long break', () => {
  const type = 'LONG_BREAK'
  const expectedMarble = 'a 59999ms b 59999ms c 59999ms d 59999ms e 59999ms f 59999ms g 59999ms h 59999ms i 59999ms j 59999ms k 59999ms l 59999ms m 59999ms n 59999ms (o |)'
  const expectedValues = {
    a: {type, minutesRemaining: 15},
    b: {type, minutesRemaining: 14},
    c: {type, minutesRemaining: 13},
    d: {type, minutesRemaining: 12},
    e: {type, minutesRemaining: 11},
    f: {type, minutesRemaining: 10},
    g: {type, minutesRemaining:  9},
    h: {type, minutesRemaining:  8},
    i: {type, minutesRemaining:  7},
    j: {type, minutesRemaining:  6},
    k: {type, minutesRemaining:  5},
    l: {type, minutesRemaining:  4},
    m: {type, minutesRemaining:  3},
    n: {type, minutesRemaining:  2},
    o: {type, minutesRemaining:  1}
  }
  const actual = step(type, 15)
  testObservable(actual, expectedMarble, expectedValues)
})

test('Steps are observed as expected for a pomodoro', () => {
  const type = 'POMODORO'
  const expectedMarble = 'a 59999ms b 59999ms c 59999ms d 59999ms e 59999ms f 59999ms g 59999ms h 59999ms i 59999ms j 59999ms k 59999ms l 59999ms m 59999ms n 59999ms o 59999ms p 59999ms q 59999ms r 59999ms s 59999ms t 59999ms u 59999ms v 59999ms w 59999ms x 59999ms (y |)'
  const expectedValues = {
    a: {type, minutesRemaining: 25},
    b: {type, minutesRemaining: 24},
    c: {type, minutesRemaining: 23},
    d: {type, minutesRemaining: 22},
    e: {type, minutesRemaining: 21},
    f: {type, minutesRemaining: 20},
    g: {type, minutesRemaining: 19},
    h: {type, minutesRemaining: 18},
    i: {type, minutesRemaining: 17},
    j: {type, minutesRemaining: 16},
    k: {type, minutesRemaining: 15},
    l: {type, minutesRemaining: 14},
    m: {type, minutesRemaining: 13},
    n: {type, minutesRemaining: 12},
    o: {type, minutesRemaining: 11},
    p: {type, minutesRemaining: 10},
    q: {type, minutesRemaining:  9},
    r: {type, minutesRemaining:  8},
    s: {type, minutesRemaining:  7},
    t: {type, minutesRemaining:  6},
    u: {type, minutesRemaining:  5},
    v: {type, minutesRemaining:  4},
    w: {type, minutesRemaining:  3},
    x: {type, minutesRemaining:  2},
    y: {type, minutesRemaining:  1}
  }
  const actual = step(type, 25)
  testObservable(actual, expectedMarble, expectedValues)
})
