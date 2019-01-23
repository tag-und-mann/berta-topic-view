import { withPluginApi } from 'discourse/lib/plugin-api';
import { on, observes } from 'ember-addons/ember-computed-decorators';

export default {
  name: 'topics',
  initialize(container){

    withPluginApi('0.8.12', (api) => {

      api.modifyClass('component:topic-list',  {
        // Lifecyle logic

        @on('init')
        setup() {
          Ember.run.scheduleOnce('afterRender', this, () => {
            this.$('.mansory .right-column:nth-child(4)').addClass("top-margin");
          });
        },

        @on('didInsertElement')
        setupListStyle() {
          this.$(".topic-list-item").wrapAll("<div class='mansory'></div>");
        }

      });


      api.modifyClass('component:topic-list-item', {

        // Lifecyle logic

        @on('init')
        setup() {
          Ember.run.scheduleOnce('afterRender', this, this.applyOrdering);
        },

        @on('init')
        _setupProperties() {
          this.set('tagName', 'div');
        },

        applyOrdering() {
          var screenWidth = this.$(window).innerWidth() / 2;
          if (this.$().offset().left > screenWidth) {
            this.$().addClass("right-column");
          }else{
            this.$().addClass("left-column");
          }
        }

      });


    });
  }
};
