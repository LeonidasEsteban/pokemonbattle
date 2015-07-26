window.$ = require('jquery');
window._ = require('underscore');
window.Backbone = require('backbone');
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
            if(self.model.collection.models[1]){
                self.model.collection.models[1].attack(self.model.collection.models[0],Number(Math.round(Math.random() * 3 + 0)));
            }
        },2000);
    }
});

module.exports = Backbone.Marionette.CompositeView.extend({
    events : {
        'click #start' : 'turn',
    },
    ui : {
        battle : '.Battle',
        attack : '.attack-name',
    },
    template : '#template-battle',
    className : "Stadium",
    childView : PokemonBattle.Views.Pokemon,
    emptyView : noPokemon,
    childViewContainer : '#pokemons',
    collectionEvents: {
        'select': 'animate',
        'attack': 'attackAnimate',
        'finishGame': 'finishGame',
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
    animations : ['zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp'],
    attackAnimate : function(attack){
        var self = this;

        this.animationClass = _.sample(this.animations);
        this.ui.attack.text(attack.self + " attacked with " +attack.name);
        this.ui.attack.addClass(this.animationClass);
        this.ui.attack.addClass('is-animated');
        _.delay(function(){
            self.ui.attack.removeClass(self.animationClass);
            self.ui.attack.css({'visibility':'visible'});
        },1000);
    },
    finishGame: function(){
        var self = this;
        $('#audio').attr('src','media/sounds/victory.mp3');
        $('#moves').remove();
        
    },
    animate : function(lol){
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
