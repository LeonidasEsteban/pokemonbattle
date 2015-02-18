window.$ = require('jquery');
window._ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

Backbone.$ = $;

var PokemonBattle = {};
PokemonBattle.Models = {};
PokemonBattle.Views = {};
PokemonBattle.Collections = {};

PokemonBattle.Models.Pokemon = require('../models/pokemon');
PokemonBattle.Collections.Pokemons = require('../collections/pokemons');
PokemonBattle.Views.Battle = require('../views/battle');


var Sprite = Backbone.Marionette.ItemView.extend({
    template : '#template-pokeWindow',
});
var Description = Backbone.Marionette.ItemView.extend({
    template : '#template-pokeDescription',
});


module.exports = Marionette.LayoutView.extend({
    events : {
        "submit @ui.form" : "search",
        "click @ui.play" : "play",
    },
    template : '#template-setting',
    regions : {
        window : '#pokedex-window',
        description : '#pokedex-description'
    },
    className : "Pokedex",
    ui : {
        'form' : '#search',
        'play' : '#play',
    },
    initialize : function(){
        this.pokeapiURL = "http://pokeapi.co";
        this.pokeapiV = "/api/v1";
        this.pokemons = new PokemonBattle.Collections.Pokemons();
    },
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
    getPokemon : function(pokemon){
        var self = this;
        pokemon.sprite = "http://play.pokemonshowdown.com/sprites/xyani-back/"+pokemon.name.toLowerCase()+".gif";
        pokemon.spriteFront = "http://play.pokemonshowdown.com/sprites/xyani/"+pokemon.name.toLowerCase()+".gif";
        // debugger
        this.getPokemonData(pokemon.sprites[0].resource_uri, pokemon.descriptions[0].resource_uri).done(function(sprite, description){
            // pokemon.sprite = self.pokeapiURL + sprite.image;
            var pokemonModel = new PokemonBattle.Models.Pokemon(pokemon);
            sprite = new Sprite({model:pokemonModel});
            self.window.show(sprite);

            localStorage.clear();
            self.pokemons.add(pokemonModel);
            pokemonModel.save();
            self.ui.play.addClass('is-active');
        });

        this.getPokemonData(pokemon.descriptions[0].resource_uri).done(function(description){
            pokemon.description = description.description;
            var pokemonModel = new PokemonBattle.Models.Pokemon(pokemon);
            description = new Description({model:pokemonModel});
            self.description.show(description);
        });


        
    },
    getPokemonData : function(url){
        var deferred = $.Deferred();

        this.ajax(url).done(function(data){
            deferred.resolve(data);
        });

        return deferred.promise();

    },
    search : function(e){
        e.preventDefault();

        var self = this;

        var action  = this.ui.form.attr('action');
        var pokemon = this.ui.form.find('[name=pokemon]').val();
        var search  = action+pokemon;
        this.ajax(self.pokeapiV + search).done(function(data){
            self.getPokemon(data);
        });

    },
    play : function(e){
        var self = this;
        e.preventDefault();

        var random = Math.floor(Math.random() * 718) +1;

        self.ajax(self.pokeapiV + '/pokemon/'+random).done(function(pokemon){

            self.getPokemonData(pokemon.sprites[0].resource_uri).done(function(sprite){

                // pokemon.sprite = self.pokeapiURL + sprite.image;
                pokemon.sprite = "http://play.pokemonshowdown.com/sprites/xyani/"+pokemon.name.toLowerCase()+".gif";
                
                var pokemonModel = new PokemonBattle.Models.Pokemon(pokemon);


                self.pokemons.add(pokemonModel);
                pokemonModel.save();
                Backbone.history.navigate('battle', {'trigger':true});

                var battle = new PokemonBattle.Views.Battle({
                    collection : self.pokemons,
                });

                Aplicacion.wrapper.show(battle);

            });
        });

    },




});