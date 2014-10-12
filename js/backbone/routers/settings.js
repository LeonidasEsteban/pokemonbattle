window.$     = require('jquery');
window._     = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

var Settings = require('../views/settings');
var Battle   = require('../views/battle');
var Pokemons = require('../collections/pokemons');


module.exports = Backbone.Marionette.AppRouter.extend({
    routes : {
        "" : "root",
        ":vista" : "vista",
        "vista/:opponent" : "customBattle",
    },
    initialize : function(){
    },
    root : function() {
        this.settings = new Settings(); // view settings
        var self = this;
        //mostrar pokedex
        Aplicacion.wrapper.show(this.settings);
        setTimeout(function(){
            $('.Pokedex').addClass('is-active');
        },20);
    },
    vista : function(vista){
        var self = this;

       if(vista == "battle"){
            if(localStorage.length >= 3){
                var pokemons = new Pokemons();
                pokemons.fetch();
                this.battle = new Battle({collection:pokemons}); //view battle
                Aplicacion.wrapper.show(this.battle);
            }else{
                Backbone.history.navigate('', {'trigger':true});
            }
        }
    },
    customBattle : function(opponent){

    }
});



