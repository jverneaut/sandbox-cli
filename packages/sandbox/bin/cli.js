#!/usr/bin/env node
const cac = require('cac');

const build = require('../src/build');
const dev = require('../src/dev');

const cli = cac('@jverneaut/sandbox');

cli.command('build', 'Build assets').action(() => {
  build();
});

cli.command('dev', 'Launch dev server').action(() => {
  dev();
});

cli.help();
cli.parse();

if (!cli.matchedCommandName && Object.keys(cli.options).length <= 1) {
  cli.outputHelp();
}
