window.$ = require('jquery');
window._ = require('underscore');
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    defaults : {
        "name" : "unknown",
        "sprite" : "imagen",
        "life" : 100,
        "moves" : [{
            'name' : 'Placaje',
            'damage' : 10,
        }],
        'attack': 20,
        "level" : 10,
        "defense" : 50,
        "type" : "normal",

    },
    initialize : function(){
        var self = this;
        this.set({
            "lifeStatus" : this.get('life'),
            "lifePercentage" : 100,
        });

    },
    attack : function(opponent){
        var self = this;

        var N = this.get('level');
        var A = this.get('attack');
        this.getAttack().done(function(attack){
            var P =  attack;
            var D = opponent.get('defense');
            var B;
            if(self.get('types')[0] != opponent.get('types')[0]){
                B = 1.5;
            }else{
                B = 1;
            }
            var E = 1; //Calcular efectividad según la discrepancia de tipo
            var V = self.variation(85, 100);

            var damage = Math.round(0.01 * B * E * V * (((0.2 * N + 1) * A * P / (25 * D))+2));
            console.log(N,A,P,D,B,E,V);
            self.damage(opponent, damage);
        });

    },
    getAttack : function(){
        var moves = this.get('moves').length;
        var move = Math.floor( Math.random() * moves);
        console.log(this.get('moves')[move].name);

        var deferred = $.Deferred();

        var xhr = $.ajax({
            url: 'http://pokeapi.co' + this.get('moves')[move].resource_uri,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            context: self,
        });

        xhr.done(function(move){
            // console.log(move.power);
            deferred.resolve(move.power);
        });
        return deferred.promise();


    },
    variation : function(inferior,superior){
        //La variación trae un numero aleatorio entre 85 y 100
        var numPosibilidades = superior - inferior;
        var aleat            = Math.random() * numPosibilidades;
        aleat                = Math.round(aleat);
        return inferior + aleat;
    },
    damage : function(pokemon, damage){

        var life = pokemon.get('life') - damage;

        if(life <= 0){
            life = 0;
            this.finish(pokemon);
        }
        pokemon.set({
            'life' : life,
        });

        pokemon.set({
            'lifePercentageBefore' : pokemon.get('lifePercentage'),
            'lifePercentage' : ((pokemon.get('life') * 100 / pokemon.get('lifeStatus')) ),
        });

        console.log(damage);
    },
    finish : function(loser){
        loser.destroy();
    }
});