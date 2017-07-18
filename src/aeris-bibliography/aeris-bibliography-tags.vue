/*
 dependances: 

metadata-shared-styles.html
metadata-format.html

*/

<template>
<span class="aeris-tags-host" v-if="visible">
<div class="component-container">
      <header>
        <h3><i class="fa fa-tags"></i>Tags</h3>
        <div class="aeris-icon-group"></div>
      </header>
      <main>
      <span v-for="tag in tags">
        <i class="fa fa-tag"></i><span class="tag-name">{{ tag.name }}</span>
       </span>     
      </main>
    </div>
</span>
</template>

<script>
import { EventBus } from '../aeris-event-bus/aeris-event-bus.js';

export default {
  props: {
  	lang:  {
      type: String,
      default: 'fr'
    }
  },
  
   
  watch: {
    lang (value) {
	      // this.$i18n.locale = value
    }
  },
  
  mounted: function() {
     EventBus.$emit('themeRequest', {});
  },
  
  updated: function() {
  	this.ensureTheme()
  },
  
  destroyed: function() {
  	EventBus.$off('refreshed', this.handleRefresh)
  	EventBus.$off('theme', this.handleTheme)
  },
  
  created: function () {
  console.log("Aeris Bibliography Authors - Creating");
   // this.$i18n.locale = this.lang
   EventBus.$on('refreshed', this.handleRefresh)
   EventBus.$on('theme', this.handleTheme)
  },
  
  computed: {
  	//roles: function() {
  	  //return this.getRolesToDisplay();
  	//}
  },
   data () {
    return {
    	visible: true,
    	theme: null,
    	tags: null,
    }
  },
  methods: {
  
    handleRefresh: function(data) {
  		console.log("Aeris Bibliography Tags - Refreshing"); 
    	this.visible = false
    	if ((! data) || (! data.detail))  {
    	 return
    	}
 
    	this.tags = data.detail[0].tags;
    	console.log(this.tags);
    	this.visible = true; 
   	
  	},
  	
  	ensureTheme: function() {
  	if (this.theme) {
  	var elems = this.$el.querySelectorAll('.section-title');
	    var index = 0, length = elems.length;
    	for ( ; index < length; index++) {
        	elems[index].style.color=this.theme.primary
    	}
    }
  	},
  	
  	handleTheme: function(theme) {
  		this.$el.querySelector("header").style.background=theme.primary
  		this.theme = theme;
  		this.ensureTheme();
  	},  	

  }
}
</script>

<style>

.aeris-tags-host .section-title {
  border-bottom: 1px solid;
  margin-top: 5px
 }
 
.tag-name {
  margin-left: 2px;
  margin-right: 8px;
}

 </style>