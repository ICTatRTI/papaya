/*
 * This keeps the language configuration data separate from the Conf helper.
 * Useful for testing.
 */


var Conf = new(require("Conf"))();

Conf.add([
    require("ConfLG"), // Luganda
    require("ConfNYN"), // Runyankole-Rukiga
    require("ConfNYO"), // Runyoro-Rutooro
    require("ConfEN"), // English
]);

module.exports = Conf;