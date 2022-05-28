#!/usr/bin/env node
const cac = require('cac');

const cli = cac('@jverneaut/sandbox');
cli.command('build', 'Build assets');

cli.help();
cli.parse();
cli.outputHelp();
