'use strict';
const upath = require('upath');
const sh = require('shelljs');
const renderPug = require('./render-pug');

const srcPath = upath.resolve(upath.dirname(__filename), '../src');

sh.find(srcPath).forEach(_processFile);

function _processFile(filePath) {
    if (
        filePath.match(/\.pug$/)
        && !filePath.match(/include/)
        && !filePath.match(/mixin/)
        && !filePath.match(/\/pug\/layouts\//)
    ) {
        renderPug(filePath);
    } else if (filePath.match(/\.html$/) || filePath.match(/\.pdf$/) || filePath.match(/\CNAME/)) {
        const destPath = upath.resolve(upath.dirname(__filename), '../docs/.')
        sh.cp('-R', filePath, destPath)
    }
}