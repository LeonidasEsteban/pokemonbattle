window.$     = require('jquery');
window._     = require('underscore');
var Backbone = require('backbone');

var Settings = require('../views/settings');
var Battle   = require('../views/battle');
var Pokemons = require('../collections/pokemons');


//PokemonBattle.Routers.Settings 
module.exports = Backbone.Router.extend({
    routes : {
        "" : "root",
        ":vista" : "vista",
        "vista/:opponent" : "battle",
    },
    initialize : function(){
        this.pokemons = new Pokemons();
        this.settings = {};
        this.battle = {};

        //iniciar aplicación
        this.settings = new Settings(); // view settings
        Backbone.history.start();
    },
    root : function() {
        var self = this;
        //mostrar pokedex
        self.settings.render();
        $('.PokemonBattle').html(this.settings.$el);
        setTimeout(function(){
            $('.Pokedex').addClass('is-active');
        },20);
    },
    vista : function(vista){
        var self = this;

       if(vista == "battle"){
            this.battle = new Battle(); //view battle
            this.battle.render();
            setTimeout(function(){
                self.battle.pokemons = self.settings.pokemons;
            },2000);
            if(localStorage.length >= 3){
                pokemons.fetch();
            }
        }
    },
    battle : function(opponent){

    }
});



