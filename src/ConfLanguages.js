/*
 * This keeps the language configuration data separate from the Conf helper.
 * Useful for testing.
 */


var Conf = new(require("Conf"))();

Conf.add([
    require("ConfKG")
]);

Conf.add([
    require("ConfRU")
]);


module.exports = Conf;