window.$ = require('jquery');
window._ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');


Backbone.$ = $;


//Init
var PokemonBattle = {};
PokemonBattle.Routers = {};
PokemonBattle.Routers.Settings = require('./backbone/routers/settings');


//Instancia de una aplicación Marionette
Aplicacion = new Backbone.Marionette.Application();
 
Aplicacion.addRegions({
  wrapper: ".PokemonBattle",
});


Aplicacion.addInitializer(function(options){
    var Game = new PokemonBattle.Routers.Settings();
});



Aplicacion.on("start", function(options){
  if (Backbone.history){
    Backbone.history.start();
  }
});

//lanzar app
Aplicacion.start(); 
