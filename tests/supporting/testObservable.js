const { TestScheduler } = require('rxjs/testing')

const testObservable = (actual, expectedMarble, expectedValues) => {
  const scheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  })
  scheduler.run(({expectObservable}) => {
    expectObservable(actual).toBe(expectedMarble, expectedValues)
  })
}

module.exports = testObservable
