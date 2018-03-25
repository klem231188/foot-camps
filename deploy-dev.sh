#!/usr/bin/env bash
ng build --aot
firebase use footcamps-development
firebase deploy
