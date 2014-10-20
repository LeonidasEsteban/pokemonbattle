window.$ = require('jquery');
window._ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

Backbone.$ = $;

var PokemonBattle = {};
PokemonBattle.Models = {};
PokemonBattle.Views = {};
PokemonBattle.Collections = {};

PokemonBattle.Views.Pokemon = require('../views/pokemon');
PokemonBattle.Models.Pokemon = require('../models/pokemon');


var noPokemon = Backbone.Marionette.ItemView.extend({
    template : '#no-pokemon',
});





var Attacks = Backbone.Marionette.ItemView.extend({
    template : '#template-action',
    events : {
        'click':'attack',
    },
    ui : {

    },
    initialize : function(){
    },
    attack : function(e){
        var self = this;
        this.model.collection.models[0].attack(this.model.collection.models[1],Number(e.target.dataset.move));
        setTimeout(function(){
            self.model.collection.models[1].attack(self.model.collection.models[0],Number(e.target.dataset.move));
        },2000);
    }
});

module.exports = Backbone.Marionette.CompositeView.extend({
    events : {
        'click #start' : 'turn',
    },
    ui : {
        battle : '.Battle',
    },
    template : '#template-battle',
    className : "Stadium",
    childView : PokemonBattle.Views.Pokemon,
    emptyView : noPokemon,
    childViewContainer : '#pokemons',
    collectionEvents: {
        'select': 'animate'
    },
    initialize : function(model){
        this.battleTurn = 0;
        // this.childView.call('setStatusBar',function(){
        //     console.log('hola');
        // });
        // this.collection.on('childview:change',this.lol,this);
        // this.collection.on("some:prefix:change", function(){
        //     console.log('reder');
        // });

    },
    animate : function(){
        var self = this;
        this.ui.battle.addClass('is-attack');
        _.delay(function(){
            self.ui.battle.removeClass('is-attack');
        },500);
    },

    onShow : function(){
        var self = this;
        

        Aplicacion.addRegions({
            'actions' : '#moves',
        });

        var moves = this.collection.models[0].get('moves').length;

        var actionView = new Attacks({model :self.collection.models[0]});
        // console.log(actionView.model.toJSON().moves[1]);
        Aplicacion.actions.show(actionView);

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
