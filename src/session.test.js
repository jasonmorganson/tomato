const {skip, take} = require('rxjs/operators')
const testObservable = require('../tests/supporting/testObservable.js')
const session = require('./session.js')

test('A session is observed as expected', () => {
  const SHORT_BREAK = {
    a: {type: 'SHORT_BREAK', minutesRemaining: 5},
    b: {type: 'SHORT_BREAK', minutesRemaining: 4},
    c: {type: 'SHORT_BREAK', minutesRemaining: 3},
    d: {type: 'SHORT_BREAK', minutesRemaining: 2},
    e: {type: 'SHORT_BREAK', minutesRemaining: 1}
  }
  const LONG_BREAK = {
    a: {type: 'LONG_BREAK', minutesRemaining: 15},
    b: {type: 'LONG_BREAK', minutesRemaining: 14},
    c: {type: 'LONG_BREAK', minutesRemaining: 13},
    d: {type: 'LONG_BREAK', minutesRemaining: 12},
    e: {type: 'LONG_BREAK', minutesRemaining: 11},
    f: {type: 'LONG_BREAK', minutesRemaining: 10},
    g: {type: 'LONG_BREAK', minutesRemaining:  9},
    h: {type: 'LONG_BREAK', minutesRemaining:  8},
    i: {type: 'LONG_BREAK', minutesRemaining:  7},
    j: {type: 'LONG_BREAK', minutesRemaining:  6},
    k: {type: 'LONG_BREAK', minutesRemaining:  5},
    l: {type: 'LONG_BREAK', minutesRemaining:  4},
    m: {type: 'LONG_BREAK', minutesRemaining:  3},
    n: {type: 'LONG_BREAK', minutesRemaining:  2},
    o: {type: 'LONG_BREAK', minutesRemaining:  1}
  }
  const POMODORO = {
    a: {type: 'POMODORO', minutesRemaining: 25},
    b: {type: 'POMODORO', minutesRemaining: 24},
    c: {type: 'POMODORO', minutesRemaining: 23},
    d: {type: 'POMODORO', minutesRemaining: 22},
    e: {type: 'POMODORO', minutesRemaining: 21},
    f: {type: 'POMODORO', minutesRemaining: 20},
    g: {type: 'POMODORO', minutesRemaining: 19},
    h: {type: 'POMODORO', minutesRemaining: 18},
    i: {type: 'POMODORO', minutesRemaining: 17},
    j: {type: 'POMODORO', minutesRemaining: 16},
    k: {type: 'POMODORO', minutesRemaining: 15},
    l: {type: 'POMODORO', minutesRemaining: 14},
    m: {type: 'POMODORO', minutesRemaining: 13},
    n: {type: 'POMODORO', minutesRemaining: 12},
    o: {type: 'POMODORO', minutesRemaining: 11},
    p: {type: 'POMODORO', minutesRemaining: 10},
    q: {type: 'POMODORO', minutesRemaining:  9},
    r: {type: 'POMODORO', minutesRemaining:  8},
    s: {type: 'POMODORO', minutesRemaining:  7},
    t: {type: 'POMODORO', minutesRemaining:  6},
    u: {type: 'POMODORO', minutesRemaining:  5},
    v: {type: 'POMODORO', minutesRemaining:  4},
    w: {type: 'POMODORO', minutesRemaining:  3},
    x: {type: 'POMODORO', minutesRemaining:  2},
    y: {type: 'POMODORO', minutesRemaining:  1}
  }
  testObservable(session.pipe(take(25)), 'a 59999ms b 59999ms c 59999ms d 59999ms e 59999ms f 59999ms g 59999ms h 59999ms i 59999ms j 59999ms k 59999ms l 59999ms m 59999ms n 59999ms o 59999ms p 59999ms q 59999ms r 59999ms s 59999ms t 59999ms u 59999ms v 59999ms w 59999ms x 59999ms (y |)', POMODORO)
  testObservable(session.pipe(skip(25), take(5)), '24m a 59999ms b 59999ms c 59999ms d 59999ms (e |)', SHORT_BREAK)
  testObservable(session.pipe(skip(25), skip(5), take(25)), '28m a 59999ms b 59999ms c 59999ms d 59999ms e 59999ms f 59999ms g 59999ms h 59999ms i 59999ms j 59999ms k 59999ms l 59999ms m 59999ms n 59999ms o 59999ms p 59999ms q 59999ms r 59999ms s 59999ms t 59999ms u 59999ms v 59999ms w 59999ms x 59999ms (y |)', POMODORO)
  testObservable(session.pipe(skip(25), skip(5), skip(25), take(5)), '52m a 59999ms b 59999ms c 59999ms d 59999ms (e |)', SHORT_BREAK)
  testObservable(session.pipe(skip(25), skip(5), skip(25), skip(5), take(25)), '56m a 59999ms b 59999ms c 59999ms d 59999ms e 59999ms f 59999ms g 59999ms h 59999ms i 59999ms j 59999ms k 59999ms l 59999ms m 59999ms n 59999ms o 59999ms p 59999ms q 59999ms r 59999ms s 59999ms t 59999ms u 59999ms v 59999ms w 59999ms x 59999ms (y |)', POMODORO)
  testObservable(session.pipe(skip(25), skip(5), skip(25), skip(5), skip(25), take(5)), '80m a 59999ms b 59999ms c 59999ms d 59999ms (e |)', SHORT_BREAK)
  testObservable(session.pipe(skip(25), skip(5), skip(25), skip(5), skip(25), skip(5), take(25)), '84m a 59999ms b 59999ms c 59999ms d 59999ms e 59999ms f 59999ms g 59999ms h 59999ms i 59999ms j 59999ms k 59999ms l 59999ms m 59999ms n 59999ms o 59999ms p 59999ms q 59999ms r 59999ms s 59999ms t 59999ms u 59999ms v 59999ms w 59999ms x 59999ms (y |)', POMODORO)
  testObservable(session.pipe(skip(25), skip(5), skip(25), skip(5), skip(25), skip(5), skip(25), take(15)), '108m a 59999ms b 59999ms c 59999ms d 59999ms e 59999ms f 59999ms g 59999ms h 59999ms i 59999ms j 59999ms k 59999ms l 59999ms m 59999ms n 59999ms (o |)', LONG_BREAK)
})
