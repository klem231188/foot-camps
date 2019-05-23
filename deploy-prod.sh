#!/usr/bin/env bash
ng build --prod --aot --extract-css=false
firebase use footcamps-production
firebase deploy --only hosting
