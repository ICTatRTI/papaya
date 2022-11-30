# Papaya Ethiopia

## Prerequisite

    Android SDK installed and ANDROID_HOME or ANDROID_SDK_ROOT set
        for example: 
        sdkmanager --list   to see all 
        install platform 30
        /opt/homebrew/bin/sdkmanager  --install "platforms;android-30"
        install build tools 30
        /opt/homebrew/bin/sdkmanager --install "build-tools;30.0.3"  

    Java 1.8 installed and JAVA_HOME set
        

## installation

   You may have to uninstall Gulp if you have it installed with -g
   npm install

After installing the postinstall script will run, initializing the Cordova platform and plugins directory.

## scripts

  
   npm run build             #
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