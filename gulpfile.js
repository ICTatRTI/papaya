/* jshint undef: true, unused: true, node: true */

"use strict";

var browserify = require("browserify");

var gulp       = require("gulp");

// For stream manipulation
var source     = require("vinyl-source-stream");
var buffer     = require("vinyl-buffer");

// Bag of utilities like a logger
var gutil      = require("gulp-util");
//var uglify     = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var concat     = require("gulp-concat");

// nice little webserver for testing
var connect    = require("gulp-connect");

// for OS notifications
var notify     = require("gulp-notify");

// for replacing strings with files
var gfi        = require("gulp-file-insert");

// async delete function
var del        = require("del");

// sounds
var rename = require("gulp-rename");
var jsesc  = require("jsesc");

// log function to display errors instead of bailing
var log = function(e) {
  notify(e.message);
  gutil.log(e.message);
};

var configs = {
  "default" : {
    "htmlIndex" : "./src/index.html",
    "jsEntry" : "./src/app.js",
    "jsPaths" : [
      "./src"
    ],
    "dest" : "./www"
  },
  "testing" : {
    "htmlIndex" : "./tests/source.html",
    "jsEntry" : "./tests/index.js",
    "jsPaths" : [
      "./src",
      "./tests"
    ],
    "dest" : "./tests"
  }
};

/*
 * parse arguments...kinda
 */
var rawrgv = JSON.parse(process.env.npm_config_argv).original;

var argv = {};

rawrgv.forEach(function(el, i){
  if (~el.indexOf("--") && ~el.indexOf("=")) {
    var clean = el.substr(2);
    var split = clean.split("=");
    argv[split[0]] = split[1];
  } else if (~el.indexOf("-")) {
    var key = el.replace(/\-/g, "");
    var nextArgIsAnotherKey = ~(rawrgv[i+1] || "").indexOf("-");
    var noMoreKeys = typeof rawrgv[i+1] === "undefined";
    if (nextArgIsAnotherKey || noMoreKeys) {
      argv[key] = true;
    } else {
      argv[key] = rawrgv[i+1];
    }
  }
});


var chosen = argv.t ? "testing" : "default";

console.log(argv);

var config = configs[chosen];

console.log("Configuration:\n\n");
console.log(config);


// Browserify js build
gulp.task("build:js",["clean:js"], function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: config.jsEntry,
    debug: true,
    paths: config.jsPaths
  });

  return b.bundle()
    .pipe(source("app.js")).on("error", log)
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        //.pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(config.dest))
    .pipe(connect.reload()); // reload webserver

});




// Simple concat for all css
gulp.task("build:css",["clean:css"], function () {
  gulp.src("src/*.css")
    .pipe(concat("style.css"))
    .pipe(gulp.dest(config.dest))
    .pipe(connect.reload()); // reload webserver

});

// start the webserver
gulp.task("webserver:start", function() {
  connect.server({
    livereload: true,
    root: config.dest
  });
});




/*
 * This just concatenates all html files in the src
 * directory, and then inserts them into index.html
 * where it finds the string {{html_templates}}.
 * updates
 */
gulp.task("build:html",["clean:html"], function () {

  gulp.src(["./src/*.html", "!./src/index.html"])
    .pipe(concat("templates.html"))
    .pipe(gulp.dest("./tmp"));

  gulp.src(config.htmlIndex)
    .pipe(gfi({
      "{{html_templates}}" : "./tmp/templates.html"
    }))
    .pipe(rename(function(path){
      path.basename = "index";
    }))
    .pipe(gulp.dest(config.dest))
    .pipe(connect.reload()); // reload webserver

});



/*
 * Changes the filenames to be compliant with Android's [0-9a-z_.] policy.
 * jsesc is used in the app wherever filenames are needed to be translated.
 */
gulp.task("build:sounds", function() {
  gulp.src("./processed/*.mp3")
  .pipe(rename(function(path){
    path.basename = jsesc(path.basename,{"escapeEverything": true}).toLowerCase().replace(/\\/g,"");
  }))
  .pipe(gulp.dest("./www/assets/sounds"));
});


/*
 * Cleaning tasks, simply delete anything compiled
 */
gulp.task("clean:html", function(done){
  del([
    "www/index.html",
    "tests/index.html"
  ],{force:true}).then(function(){done(null);});
});

gulp.task("clean:js", function (done) {
  del([
    "www/app.js",
    "www/app.js.map",
    "tests/app.js",
    "tests/app.js.map"
  ],{force:true}).then(function(){done(null);});
});

gulp.task("clean:css", function (done) {
  del([
    "www/style.css",
    "tests/style.css"
  ],{force:true}).then(function(){done(null);});
});

// Watch css, js, and html separately. and clean before building.
gulp.task("watch", function() {
  gulp.watch(["./src/*.js","./tests/*.js"],   ["build:js"]);
  gulp.watch("./src/*.html", ["build:html"]);
  gulp.watch("./src/*.css",  ["build:css"]);
});

// just aggregate build tasks
gulp.task("build", ["build:sounds","build:js", "build:html", "build:css"]);

// by default, clean, build, then watch everything
gulp.task("default", ["build", "watch", "webserver:start"]);

