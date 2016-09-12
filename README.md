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

## Languages

The sounds directory contains all of your sounds. They should be named like so `LANGUAGE_CODE`_`PHONEME`.mp3

These three variables will match up with the configuration defined in your `Conf` object in `src/Conf.js`.


Put all new sound files in the processedfolder. They should be named as described above. 

Create the file .\src\ConfLANGUAFE_CODE.js, e.g. ConfEN.js   
In this file add your lanague code and label. 
Then put in your  table indeces, or leave empty to use the defautl grid. Also create the sound file to phoneme mappings.

Add the language to the ConfLangaues file, e.g. require("ConfEN"), // English

## Cordova hooks

* after_build

   This will install the apk to your device.

## Style

.jshint and .jsbeautify settings are included to help contributors automatically eliminate as many ambiguities in coding style as possible. Please configure your editor to save with `.jsbeautify` options.

Installing them both is recommended and easy.

    npm -g install jshint js-beautify 
    
## Starting the app

    npm run gulp
    
## Resolving issues

Fork the repository and update your fork

    git remote show ICTatRTI
    git checkout master
    git pull ICTatRTI master

Get the id of the issue you’re fixing

    git checkout -b 189-footer-disappeared

Fix the bug and commit the change. Submit a pull request.