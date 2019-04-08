#!/usr/bin/env node -r esm

import Release from './release.js';
import connect from 'connect';
import serveStatic from 'serve-static';
import path from 'path';

const release = new Release();
release.build(true);

connect()
    .use(serveStatic(path.resolve(__dirname, '../')))
    .listen(8080, function() {
      console.log('Server running on 8080...');
    });
