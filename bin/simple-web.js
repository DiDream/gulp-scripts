#! /usr/bin/env node
'use strict'
var
    spawn = require("child_process").spawn,
    argv = require('yargs').argv,
    options = ["simple-web"];

    if(argv.nopug) options.push("--nopug");
    if(argv.nosass) options.push("--nosass");
    
spawn("gulp", options, {stdio: 'inherit'});
