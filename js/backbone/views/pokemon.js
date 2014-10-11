window.$ = require('jquery');
window._ = require('underscore');
var Backbone = require('backbone');

// PokemonBattle.Views.Pokemon
module.exports = Backbone.View.extend({
    events : {
    },
    className : 'Pokemon',
    template : _.template($('#pokemon-template').html()),
    initialize : function(model){
        var self      = this;
        this.model    = model;
        this.listenTo(this.collection, "add", this.addOne, this);
        model.on('change', function(){
            self.render();
        });

        model.on('destroy',function(){
            self.$el.slideUp();
        });
    },
    addOne : function(model){
        // debugger;
    },
    render : function(){
        var self = this;
        var pokemon = {pokemon : this.model.toJSON()};
        var html = this.template(pokemon);

        this.$el.html(html);
        this.$life  = this.$el.find('.Stats-bar');

        this.setStatusBar();
    },
    setStatusBar : function(){
        var self = this;

        self.$life.css('width', self.model.get('lifePercentageBefore')+"%");
        var renderLife = function(){
            self.$life.css('width', self.model.get('lifePercentage')+"%");
        };

        _.delay(renderLife, 20);
    }

});