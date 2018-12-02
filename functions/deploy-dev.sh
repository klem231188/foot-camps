#!/usr/bin/env bash
firebase use footcamps-development
rm -rf lib
npm run build
npm run deploy
