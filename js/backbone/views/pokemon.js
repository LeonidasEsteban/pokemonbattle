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
    },
    modelEvents: {
        'change:life': 'setStatusBar state',
    },
    initialize : function(){
        // console.log(this.model.attributes);
    },
    onShow : function(){
        // debugger;
    },
    // behaviors: {
    //     Messages: {
    //       message: 'leonidas'
    //     },
    // },
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
    setStatusBar : function(){
        var self = this;
        this.ui.statusBar.text(this.model.get('life'));
        this.ui.statusBar.css('width', self.model.get('lifePercentageBefore')+"%");
        var renderLife = function(){
            self.ui.statusBar.css('width', self.model.get('lifePercentage')+"%");
        };

        _.delay(renderLife, 20);
    }

});