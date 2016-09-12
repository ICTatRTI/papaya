var Backbone = require("Backbone");
var $ = require("jquery");
var _ = require("lodash");
var Player = require("./Player");

var Handlebars = require("handlebars");

var SoundboardView = Backbone.View.extend({
    events: {
        "click button": "play"
    },
    initialize: function(options) {
        this.templates = {
            table: Handlebars.compile($("script#SoundboardView-table").html()),
            singleButton: _.template($("template#SoundboardView-button").html())
        };
        this.status = SoundboardView.FREE;
        this.player = new Player();

        var self = this;

        this.listenTo(this.player, "free", function onFree() {
            self.status = SoundboardView.FREE;
        });

        this.listenTo(this.player, "busy", function onBusy() {
            self.status = SoundboardView.BUSY;
        });

        if (typeof options !== "undefined") {
            this.update(options);
        }
    },
    update: function(options) {
        this.language = options.language;
        this.trigger("update", this.language.code);
        this.render();
    },
    play: function(event) {
        if (this.status === SoundboardView.BUSY) {
            return;
        }
        var key = $(event.target).attr("data-key");
        this.player.play({
            language: this.language.code,
            key: key
        });
    },
    clear: function() {
        this.$el.html("");
    },
    render: function() {

        var html = "";

        if (this.language.layout.style === "single") {
            html = this.phonemes.map(function(phoneme) {
                return this.templates.button({
                    id: phoneme.id,
                    label: _(phoneme.label).escape(),
                    key: _(phoneme.key).escape()
                });
            }, this).join("");
        } else if (this.language.layout.style === "table") {
            html = this.templates.table(this.language.layout.table);
        }

        this.$el.html(html);

    }
});


Object.defineProperty(SoundboardView, "FREE", {
    value: 0
});
Object.defineProperty(SoundboardView, "BUSY", {
    value: 1
});

module.exports = SoundboardView;
