window.$ = require('jquery');
window._ = require('underscore');
var Backbone = require('backbone');

Backbone.$ = $;


//Init
var PokemonBattle = {};
PokemonBattle.Routers = {};
PokemonBattle.Routers.Settings = require('./backbone/routers/settings');



var Game = new PokemonBattle.Routers.Settings();




