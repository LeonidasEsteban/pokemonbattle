window.$ = require('jquery');
window._ = require('underscore');
var Backbone = require('backbone');

Backbone.$ = $;

var PokemonBattle = {};
PokemonBattle.Models = {};
PokemonBattle.Views = {};
PokemonBattle.Collections = {};

PokemonBattle.Models.Pokemon = require('../models/pokemon');
PokemonBattle.Collections.Pokemons = require('../collections/pokemons');
PokemonBattle.Views.Pokemon = require('../views/pokemon');


module.exports = Backbone.View.extend({
    events : {
        "submit #search" : "submit",
        "click #play" : "battle"

    },
    className : "Pokedex",
    template : _.template($('#template-setting').html()),

    initialize : function(){
        this.pokeapiURL = "http://pokeapi.co";
        this.pokeapiV = "/api/v1";
        this.pokemons = window.pokemons = new PokemonBattle.Collections.Pokemons();

        this.pokemons.on('add',function(model){
            setTimeout(function(){
                var pokemon = new PokemonBattle.Views.Pokemon(model);
                pokemon.render();
                $('.Stadium').append(pokemon.$el);
            },1000);
        });

        this.pokemons.on('add',this.addToCollection, this);

    },
    addToCollection : function (model) {
        // debugger;
    },
    search : function(url){
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

        this.getPokemonSprite(pokemon.sprites[0].resource_uri, pokemon.descriptions[0].resource_uri).done(function(sprite, description){
            // console.log(description)
            pokemon.sprite = self.pokeapiURL + sprite.image;
            pokemon.description = description;
            self.pokemonChosen = pokemon;
            pokemon = new PokemonBattle.Models.Pokemon(self.pokemonChosen);

            self.render(pokemon.toJSON());


        });

        
    },
    getPokemonSprite : function(url){
        var deferred = $.Deferred();

        this.search(url).done(function(data){
            sprite = data;
            deferred.resolve(data);
        });

        return deferred.promise();

    },
    submit : function(e){
        e.preventDefault();

        var self = this;

        var action  = this.$form.attr('action');
        var pokemon = this.$form.find('[name=pokemon]').val();
        var search  = action+pokemon;

        this.search(self.pokeapiV + search).done(function(data){
            self.getPokemon(data);
        });

    },
    render : function(pokemon){

        pokemon = {pokemon : pokemon };
        var html = this.template(pokemon);
        this.$el.html(html);

        this.$form = this.$el.find('#search');

    },
    battle : function(e){
        var self = this;
        e.preventDefault();

        Backbone.history.navigate('battle', {'trigger':true});
        pokemon = new PokemonBattle.Models.Pokemon(this.pokemonChosen);
        this.pokemons.add(pokemon);
        pokemon.save({
            title : 'lol',
        });

        var random = Math.floor(Math.random() * 718) +1;

        self.search(self.pokeapiV + '/pokemon/'+random).done(function(pokemon){

            self.getPokemonSprite(pokemon.sprites[0].resource_uri).done(function(sprite){

                pokemon.sprite = self.pokeapiURL + sprite.image;
                
                var opponent = new PokemonBattle.Models.Pokemon(pokemon);

                self.pokemons.add(opponent);
                opponent.save();

            });
        });

    },
    pokemons : function(callback){

        return this.pokemons;
    }



});