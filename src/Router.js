var Conf = require("ConfLanguages");
var SoundboardView = require("SoundboardView");
var SelectorView = require("SelectorView");
var RecorderView = require("RecorderView");
var OverlayView = require("OverlayView");


var Backbone = require("Backbone");

var Router = Backbone.Router.extend({

    initialize: function() {

        // select defaults
        var firstLanguage = Conf.languages[Router.DEFAULT_SELECTION];
        this.defaultCode = firstLanguage.code;
        this.defaultPhonemes = firstLanguage.phonemes;


        // Make configuration object for LanguageSelectView
        var labelsAndCodes = Conf.languages.map(function(l) {
            return {
                label: l.label,
                value: l.code
            };
        });

        // Initialize with default properties
        this.languageSelector = new SelectorView({
            languages: labelsAndCodes,
            title: "Language",
            selected: Router.DEFAULT_SELECTION
        });
        this.languageSelector.setElement("#selector").render();


        // Recorder
        this.recorderView = new RecorderView();
        this.recorderView.setElement("#recorder").render();

        // Soundboard
        this.soundboard = new SoundboardView();
        this.soundboard.setElement("#soundboard").render();

        // acknowledgement overlay
        this.overlay = new OverlayView();
        this.overlay.setElement("#logo");

    },

    routes: {
        "": "landing", // #
        "language/:code": "language" // #language/en
    },

    // first route automatically triggered
    landing: function() {
        this.navigate("language/" + this.defaultCode, true);
    },

    // display a given language specified by code
    // update language selector/indicator
    language: function(code) {
        this.soundboard.update({
            language: Conf.languageByCode[code]
        });
        this.languageSelector.update(code);
    }

});

// Constant pool
Object.defineProperty(Router, "DEFAULT_SELECTION", {
    value: 0
});

module.exports = Router;