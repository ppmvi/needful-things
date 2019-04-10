#!/usr/bin/env node -r esm

import Release from './release.js';

const release = new Release();
release.build();
