#!/usr/bin/env bash

# This script should be run after npm install
# It will add necessary components to build the cordova project

./node_modules/cordova/bin/cordova platform add android
./node_modules/cordova/bin/cordova plugin add cordova-plugin-media