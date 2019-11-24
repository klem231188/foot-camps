#!/usr/bin/env bash
ng build --configuration=development
firebase use footcamps-development
firebase deploy --only hosting
