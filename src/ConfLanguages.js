/*
 * This keeps the language configuration data separate from the Conf helper.
 * Useful for testing.
 */


var Conf = new(require("Conf"))();

Conf.add([
    require("ConfEF"), // English female
    require("ConfEM"), // English male
    require("ConfKF"), // Swahili female
    require("ConfKM"), // Swahili male
]);

module.exports = Conf;