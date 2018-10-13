#!/usr/bin/env node

const program = require('caporal')
const {name, version, description} = require('../package.json')
const session = require('../src/session.js')

program

  .name(name)
  .version(version)
  .description(description)

  .command('start', 'Start a focus or a break')
  .argument('[focus]', 'Start a focus')
  .argument('[break]', 'Start a break')
  .action((args, options, logger) => {
    if(args.break) {
        logger.info("start break")
    }
    else {
        logger.info("start focus")
        session.subscribe(x => console.log(x))
    }
  })
  .default()

  .command('stop', 'Stop a focus or a break')
  .action((args, options, logger) => {
    logger.info("stop!")
  })

  .command('skip', 'Skip a break')
  .action((args, options, logger) => {
    logger.info("skip")
  })

  .command('status', 'Show status')
  .action((args, options, logger) => {
    logger.info("status")
  })

  .command('show', 'Show UI')
  .action((args, options, logger) => {
    logger.info("show")
  })

program.parse(process.argv)
