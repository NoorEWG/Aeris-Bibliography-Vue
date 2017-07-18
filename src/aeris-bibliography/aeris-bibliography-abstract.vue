/*
 dependances: 

metadata-shared-styles.html
metadata-format.html
*/


<template>
<span class="aeris-metadata-information-host">
 <div class="component-container">
      <header>
        <h3><i class="fa fa-file"></i>Abstract</h3>
        <div class="aeris-icon-group"></div>
      </header>
      <div class="mainborder">
       <article>
         <span>{{ abstract }}</span>
       </article>  
        
      </div>
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
    },
    
     
  },
  
    mounted: function() {
     EventBus.$emit('themeRequest', {});
  },
   
  watch: {
    lang (value) {
	      this.$i18n.locale = value
    }
  },
  
  destroyed: function() {
  	EventBus.$off('refreshed', this.handleRefresh)
  	EventBus.$off('theme', this.handleTheme)
  },
  
  created: function () {
  console.log("Aeris Bibliography Abstract - Creating");
   // this.$i18n.locale = this.lang
   EventBus.$on('refreshed', this.handleRefresh)
   EventBus.$on('theme', this.handleTheme)
  },
  
  updated: function() {
  	this.ensureTheme()
  },
  
  computed: {
  },
   data () {
    return {
    	visible: true,
    	theme : null,
    	value:  {},
    	abstract: null 	
    }
  },
  methods: {
  
    handleRefresh: function(data) {
  		console.log("Aeris Bibliography Abstract - Refreshing"); 
    	
    	this.abstract = null
    	this.visible = false
    	if ((! data) || (! data.detail))  {
    	 return
    	}
  		this.value = data.detail[0].resource;
  		console.log(JSON.stringify(this.value));
  		
  		this.abstract = this.value.abstract;
  		console.log("abstract is:" + this.abstract);
  		
  		this.lang = data.lang || this.lang
		this.visible = true;
  	},
  	
  	 handleTheme: function(theme) {
  		this.$el.querySelector("header").style.background=theme.primary
  		this.theme = theme
  		this.ensureTheme();
  	},
  	
  	ensureTheme: function() {
  	if (this.theme) {
  	var elems = this.$el.querySelectorAll('article h5');
	    var index = 0, length = elems.length;
    	for ( ; index < length; index++) {
        	elems[index].style.color=this.theme.primary
    	}
    }
  	},
  	
  	changeCitation: function(event) {
  		this.citationType = event.currentTarget.value;
  		
  	},
  	
  	formatDate: function(date) {
        if(date) {
          var momentDate = moment(date);
          if(momentDate.isValid()) return moment(date).format('LLL');
        }
        
        return date;
      }
  }
}
</script>
 
<style>
 .btnwrapper {
   margin: 5px;
   display: flex;
   justify-content: space-around;
 }
 
 .mainborder {
    padding: 10px;
    border: 1px solid #ddd;
    border-top: none;
    word-wrap: break-word;
 
 }
 
 </style>