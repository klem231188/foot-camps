#!/usr/bin/env bash
npm run build
mv lib/functions/src/index.js lib
rm -rf lib/functions
firebase use footcamps-development
firebase deploy --only functions
