window.$ = require('jquery');
window._ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');




module.exports = Backbone.Marionette.ItemView.extend({
    events : {
    },
    className : 'Pokemon',
    template : '#pokemon-template',
    ui : {
        'statusBar' : '.Stats-bar',
        'sprite' : '.Pokemon-sprite',
    },
    modelEvents: {
        'change:life': 'setStatusBar state animation',
    },
    animations : [ 'bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'swing', 'tada', 'wobble'],
    initialize : function(){
    },
    
    onShow : function(){
        this.ui.sprite.on('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', this.endAnimation);
    },
    endAnimation : function(event){
        $(this).removeClass(event.originalEvent.animationName);
    },
    onDestroy : function(){
        this.$el.css('background','red');
        console.log('se murió');
    },
    state : function(){
        var self = this;
        if(this.model.get('life') <= 0){
            this.$el.slideUp(1000,function(){
                self.model.destroy();
            });
        }
    },
    animation : function(){
        this.animationClass = _.sample(this.animations);
        this.ui.sprite.addClass(this.animationClass);
    },
    setStatusBar : function(){
        this.model.collection.trigger('select', this.model);
        var self = this;
        this.ui.statusBar.text(this.model.get('life'));
        this.ui.statusBar.css('width', self.model.get('lifePercentageBefore')+"%");
        var renderLife = function(){
            self.ui.statusBar.css('width', self.model.get('lifePercentage')+"%");
        };

        _.delay(renderLife, 20);
    }

});