#!/usr/bin/env bash
ng build --aot --configuration=development
firebase use footcamps-development
firebase deploy --only hosting
