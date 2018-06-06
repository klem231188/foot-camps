#!/usr/bin/env bash
firebase use footcamps-production
firebase deploy --only functions
echo "rm -rf lib"
rm -rf lib
echo "rm -rf etc"
rm -rf etc
