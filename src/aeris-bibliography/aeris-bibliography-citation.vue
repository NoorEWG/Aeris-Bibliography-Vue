/*
 dependances: 

metadata-shared-styles.html
metadata-format.html


<i18n>
{
  "en": {
    "otherInformation": "Other information",
    "uuid": "Unique identifier",
    "lastModification": "Last modification",
    "dataCenter": "Data centre",
    "projection": "Projection",
    "dataLevel": "Data processing level"
  },
  "fr": {
    "otherInformation": "Autres informations",
    "uuid": "Identifiant unique",
    "lastModification": "Dernière modifications",
    "dataCenter": "Centre de données",
    "projection": "Projection",
    "dataLevel": "Niveau de traitement de la donnèes"
  }
}
</i18n> */

<template>
<span class="aeris-metadata-information-host" v-if="visible">
 <div class="component-container">
      <header>
        <h3><i class="fa fa-quote-right"></i>{{citation}}</h3>
        <div class="aeris-icon-group"></div>
      </header>
      <div class="mainborder">
        <div class="btnwrapper">         
	         <input class="btn" v-for="cType in citationTypes" :value="cType" type="button" @click="changeCitation($event)">{{cType}}</input>
	    </div>
 	     
       <article v-if="citationType === 'APA'">
          <h5 v-if="value.id">{{citationType}}</h5>
          <span>{{authors.apa}}</span>
          <span>({{value.year}}).</span>
          <span>{{value.title}}.</span>
          <span><i>{{value.journal}},</i></span>
          <span v-if="value.pages">{{value.pages}}</span>
       </article>  
        
        <article v-if="citationType === 'Chicago'">
          <h5 v-if="value.id">{{citationType}}</h5>
          <span>{{authors.chicago}}</span>
          <span>"{{value.title}}."</span>
          <span><i>{{value.journal}}</i></span>
          <span>({{value.year}}):</span>
          <span v-if="value.pages">{{value.pages}}</span>
        </article>     
        
       <article v-if="citationType === 'Harvard'">
          <h5 v-if="value.id">{{citationType}}</h5>
          <span>{{authors.harvard}}</span>
          <span>({{value.year}}).</span>
          <span>'{{value.title}}',</span>
          <span><i>{{value.journal}},</i></span>
          <span v-if="value.pages">{{value.pages}}</span>
        </article>
        </section>
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
  console.log("Aeris Bibliography Citation - Creating");
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
    	authors: [],
    	citation: 'Citation',
    	cType: null, 
    	citationType: 'APA',
    	citationTypes: ['APA', 'Chicago','Harvard']    	
    }
  },
  methods: {
  
    handleRefresh: function(data) {
  		console.log("Aeris Bibliography Citation - Refreshing"); 
    	this.visible = false
    	if ((! data) || (! data.detail))  {
    	 return
    	}
  		this.value = data.detail[0].resource;
  		var authors = [];
  		this.value.author.forEach ( function(a) {
  		   authors.push(a.lastName + ", " + a.firstName);
  		});
  		this.authors = {
  		  apa: authors.join(',') + '.',
  		  chicago: authors.join(',') + '.',
  		  harvard: authors.join(';') + '.'  
  		}
  		
  		
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