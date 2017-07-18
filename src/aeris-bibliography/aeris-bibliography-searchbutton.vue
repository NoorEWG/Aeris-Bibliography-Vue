/*
 dependances: 

metadata-shared-styles.html
metadata-format.html
*/

<template>
	<div class="catalog-search-button" data-popup="right" data-title="Search" @click="search()">
	   <i class="fa fa-search"></i>
	</div>    
</template>

<script>

import { EventBus } from '../aeris-event-bus/aeris-event-bus.js';
export default {
  props: {
  },
  
  mounted: function() {
     EventBus.$emit('themeRequest', {});
  },
   
  watch: {
  },
  
  destroyed: function() {
  	EventBus.$off('refreshed', this.handleRefresh)
  	EventBus.$off('theme', this.handleTheme)
  },
  
  created: function () {
  console.log("Aeris Bibliography Search - Creating");
   EventBus.$on('keywords', this.handleRefresh)
   EventBus.$on('theme', this.handleTheme)
  },
  
  updated: function() {
  	this.ensureTheme()
  },
  
  computed: {
  },
  
  data () {
    return {
      keywords: null,
    }
  },
  methods: {
  
    handleRefresh: function(data) {
  		console.log("Aeris Bibliography Searchbutton - Refreshing") 
        console.log(data);
        this.keywords = data;
        console.log("keywords is: " + this.keywords)
        EventBus.$emit('keywordRefresh', this.keywords)
  	},
  	
  	 handleTheme: function(theme) {
  		this.$el.querySelector("header").style.background=theme.primary
  		this.theme = theme
  		this.ensureTheme()
  	},
  	
  	ensureTheme: function() {
	  	// TODO
  	},
  	
  	search: function() {
  	   if(this.keywords) {  
         var url = "http://31.207.33.161:8080/aeris-bibliography/rest/publication/search/" + this.keywords
   	     this.$http.get(url).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)})
   	   }
   	   else {
   	     console.log("keywords is null");
   	   }
  	},
  	
  	handleSuccess: function(data) {
  		EventBus.$emit('publications', data.body);
  	},
  	
  	handleError: function(data) {
  	
  	
  	}
  	
  }
}
</script>


<style>

.catalog-search-button {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 11;
    width: 50px;
    height: 50px;
    border: 2px solid;
    border-radius: 50%;
    color: #fff;
    font-size: 18px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    background-color: #f39c12;
    transition: background-color 0.3s;  
}

</style>
