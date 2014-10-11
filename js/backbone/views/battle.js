window.$ = require('jquery');
window._ = require('underscore');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({
    events : {
        'click #start' : 'turn',
    },
    template : _.template($('#template-battle').html()),
    className : "Stadium",
    initialize : function(model){
        this.battleTurn = 0;

        this.pokemons = {};
    },
    turn : function(){
        var pokemonTurn = this.pokemons.models[this.battleTurn];
        var opponent    = _.without(this.pokemons.models, pokemonTurn)[0];

        pokemonTurn.attack(opponent);

        if(this.battleTurn === 0){
            this.battleTurn = 1;
        }else{
            this.battleTurn = 0;
        }
    },
    render : function(){
        this.$el.attr('id','Stadium');
        this.$el.html(this.template);
        $('.PokemonBattle').html(this.$el);
    }
});
