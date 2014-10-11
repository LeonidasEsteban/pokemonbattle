window.$ = require('jquery');
// window._ = require('underscore');
var Backbone = require('backbone');
var Pokemon = require('../models/pokemon');
Backbone.LocalStorage = require("backbone.localstorage");


//PokemonBattle.Collections.Pokemons 
module.exports = Backbone.Collection.extend({
    model : Pokemon,
    localStorage: new Backbone.LocalStorage("pokemon"),
});