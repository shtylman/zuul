#!/usr/bin/env node
// zuul test/*.js

// builtin
var path = require('path');
var fs = require('fs');
var zuulApi = require('../lib/zuul');

var argv = optimist
    .usage('zuul [options] file(s)|dir')
    .describe('server', 'port to start harness server for manual testing')
    .describe('wwwroot', 'location where the webserver will serve additional static files')
    .describe('ui', 'mocha ui (bdd, tdd, qunit, exports')
    .default('ui')
    .describe('config', 'point to a config file that overrides zuul settings')
    .argv;

if (argv.help) {
    optimist.showHelp();
    process.exit();
}

var config = argv.config ? require(path.resolve(argv.config)) : {};

try {
    zuulApi({
        port: argv.server,
        wwwroot: argv.wwwroot,
        fixture: config.fixture,
        bundleOpts: config.bundleOpts,
        browserify: config.browserify,
        initApp: config.initApp,
        ui: argv.ui
    });
} catch (e) {
    console.error(e.message);
    optimist.showHelp(console.error);
    process.exit(-1);
}
