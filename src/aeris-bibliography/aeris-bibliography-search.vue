/*
 dependances: 

metadata-shared-styles.html
metadata-format.html
*/

<template>
  <div class="component-container">
    <header>
      <h3><i class="fa fa-search"></i>Keywords</h3>
      <div class="aeris-icon-group"></div>
    </header>
    <main>
      <div class="keywords">
        <input type="text" name="keywords" class="keyword-search-criteria" placeholder="Keywords" v-model="keyword"/>
      </div>
       <div class="keywords">
          <span v-for="item in items">
            <aeris-cartouche>{{ item }}</aeris-cartouche>
          </span>
        </div>
    </main>
  </div>
</template>

<script>

import { EventBus } from '../aeris-event-bus/aeris-event-bus.js';
export default {
  props: {
  	//lang:  {
      //type: String,
      //default: 'fr'
    //}
  },
  
   mounted: function() {
     EventBus.$emit('themeRequest', {});
  },
   
  watch: {
    //lang (value) {
	  // this.$i18n.locale = value
    //},
    keyword (value) {
      this.kw = value
      console.log(this.kw)
      EventBus.$emit('keywords', value)
    },
  },
  
  destroyed: function() {
  	EventBus.$off('refreshed', this.handleRefresh)
  	EventBus.$off('theme', this.handleTheme)
  },
  
  created: function () {
  console.log("Aeris Bibliography Search - Creating");
   // this.$i18n.locale = this.lang
   EventBus.$on('theme', this.handleTheme)
   EventBus.$on('refreshKeywords', this.handleRefresh)
  },
  
  updated: function() {
  	this.ensureTheme()
  },
  
  computed: {
  },
  
  data () {
    return {
      keyword: null,
      items: [],
    }
  },
  methods: {
  
    handleRefresh: function(data) {
  		console.log("Aeris Bibliography Search - Refreshing"); 
        this.items = data.detail; 
  	},
  	
  	 handleTheme: function(theme) {
  		this.$el.querySelector("header").style.background=theme.primary
  		this.theme = theme
  		this.ensureTheme()
  	},
  	
  	ensureTheme: function() {
	  	// TODO
  	}
  }
}
</script>


<style>
</style>
