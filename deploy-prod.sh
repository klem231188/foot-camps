#!/usr/bin/env bash
ng build --prod --aot
firebase use footcamps-production
firebase deploy --only hosting
