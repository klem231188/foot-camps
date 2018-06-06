#!/usr/bin/env bash
firebase use footcamps-development
firebase deploy --only functions
echo "rm -rf lib"
rm -rf lib
echo "rm -rf etc"
rm -rf etc
