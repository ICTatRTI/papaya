/*
 * This keeps the language configuration data separate from the Conf helper.
 * Useful for testing.
 */


var Conf = new(require("Conf"))();

Conf.add([
    require("ConfAT"), // Ateso
    require("ConfEN"), // English
    require("ConfLA"), // Lëb Acoli
    require("ConfLL"), // Lëb Lango
    require("ConfLK"), // Lhükonzo
    require("ConfLW"), // Lugwere
    require("ConfLM"), // Lumasaaba
    require("ConfLS"), // Lusoga
    require("ConfLB"), // Lʉgbàràti
    require("ConfNK"), // Ŋakarɨmɔjɔŋ
    require("ConfLG"), // Luganda
    require("ConfNYN"), // Runyankole-Rukiga
    require("ConfNYO"), // Runyoro-Rutooro
]);

module.exports = Conf;