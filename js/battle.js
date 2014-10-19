window.$ = require('jquery');
window._ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
Marionette = require('backbone.marionette');


Backbone.$ = $;


//Init
var PokemonBattle = {};
PokemonBattle.Routers = {};
PokemonBattle.Routers.Settings = require('./backbone/routers/settings');



var Foo = function(){};

// use Marionette.extend to make Foo extendable, just like other
// Backbone and Marionette objects
Foo.extend = Marionette.extend;


//Instancia de una aplicación Marionette
Aplicacion = new Backbone.Marionette.Application();


 
Aplicacion.addRegions({
  wrapper: ".PokemonBattle",
});


Marionette.Behaviors.behaviorsLookup = function() {
    return window.Behaviors;
};



var Messages = Marionette.Behavior.extend({
    // you can set default options
    // just like you can in your Backbone Models
    // they will be overriden if you pass in an option with the same key
    defaults: {
        "message": "mensaje por defecto"
    },
    // behaviors have events that are bound to the views DOM
    events: {
        "mouseover": "message",
    },

    message: function() {
        console.log(this.options.message);
    }
});


window.Behaviors = {};
window.Behaviors.Messages = Messages;



Aplicacion.addInitializer(function(options){
    get = {
        pokeapiURL : "http://pokeapi.co",
        pokeapiV : "/api/v1",
        ajax : function(url){
            var self = this;

            var deferred = $.Deferred();

            var xhr = $.ajax({
                url: self.pokeapiURL + url,
                type: 'GET',
                crossDomain: true,
                dataType: 'jsonp',
                context: self,
            });
            xhr.done(function(data){
                deferred.resolve(data);
            });

            return deferred.promise();

        },
        pokemonData : function(url){
            var deferred = $.Deferred();

            this.ajax(url).done(function(data){
                deferred.resolve(data);
            });

            return deferred.promise();

        },
    };
    var Game = new PokemonBattle.Routers.Settings();

    Aplicacion.commands.setHandler('get data', get.pokemonData, get);
});


Aplicacion.on("start", function(options){
    if (Backbone.history){
        Backbone.history.start();
    }
});

//lanzar app
Aplicacion.start(); 
