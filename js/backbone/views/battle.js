window.$ = require('jquery');
window._ = require('underscore');
var Backbone = require('backbone');

Backbone.$ = $;

var PokemonBattle = {};
PokemonBattle.Models = {};
PokemonBattle.Views = {};
PokemonBattle.Collections = {};

PokemonBattle.Views.Pokemon = require('../views/pokemon');


var noPokemon = Backbone.Marionette.ItemView.extend({
    template : '#no-pokemon',
});


module.exports = Backbone.Marionette.CompositeView.extend({
    events : {
        'click #start' : 'turn',
    },
    template : '#template-battle',
    className : "Stadium",
    childView : PokemonBattle.Views.Pokemon,
    emptyView : noPokemon,
    childViewContainer : '#pokemons',
    initialize : function(model){
        this.battleTurn = 0;
    },
    turn : function(){
        var pokemonTurn = this.collection.models[this.battleTurn];
        var opponent    = _.without(this.collection.models, pokemonTurn)[0];

        pokemonTurn.attack(opponent);

        if(this.battleTurn === 0){
            this.battleTurn = 1;
        }else{
            this.battleTurn = 0;
        }
    },
});
