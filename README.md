# Papaya Ethiopia

## installation

   npm install

After installing the postinstall script will run, initializing the Cordova platform and plugins directory.

## scripts

   npm run test              # Runs mocha test scripts
   npm run build             #
   npm run release           # Builds Papaya project with release
   npm run gulp build:sounds # changes filenames to comply with Android's file system
   npm run gulp              # starts gulp and listens for changes

## Configuration

### Languages

The sounds directory contains all of your sounds. They should be named like so `LANGUAGE_CODE`_`PHONEME`.mp3

These three variables will match up with the configuration defined in your `Conf` object in `src/Conf.js`.

## Cordova hooks

* after_build

   This will install the apk to your device.

## Style

.jshint and .jsbeautify settings are included to help contributors automatically eliminate as many ambiguities in coding style as possible. Please configure your editor to save with `.jsbeautify` options.

Installing them both is recommended and easy.

    npm -g install jshint js-beautify 