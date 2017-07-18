/*
 dependances: 

metadata-shared-styles.html
metadata-format.html

*/
<i18n>
{
  "en": {
    "contacts": "Contacts",
    "pointofcontact": "Point of contact",
    "author" : "Author",
    "custodian" : "Custodian",
    "metadatapointofcontact":"Point of contact for metadata",
    "distributor":"Distributor",
    "originator":"Originator",
    "owner": "Owner",
    "principalinvestigator":"Principal investigator",
    "processor": "Processor",
    "publisher": "Publisher"
    
  },
  "fr": {
    "contacts": "Contacts",
    "pointofcontact": "Point de contact",
    "author" : "Auteur",
    "custodian" : "Archiviste",
    "metadatapointofcontact":"Point de contact pour les métadonnées",
    "distributor":"Distributeur",
    "originator":"Créateur",
    "owner": "Propriétaire",
    "principalinvestigator": "Investigateur principal",
    "processor": "Elaborateur",
    "publisher": "Publicateur"
  }
}
</i18n>

<template>
<span class="aeris-metadata-contacts-host" v-if="visible">
<div class="component-container">
      <header>
        <h3><i class="fa fa-users"></i>Authors</h3>
        <div class="aeris-icon-group"></div>
      </header>
      <main>
      <span v-for="role in roles">
        <h5 class="section-title">{{role}}</h5>
        <span  v-for="author in authors">
          <aeris-bibliography-author :author="JSON.stringify(author)" :lang="lang"></aeris-bibliography-author>
        </span>
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
    	authors: null,
    	visible: true,
    	theme: null,
    	roles: ['author'],
    }
    
  },
  methods: {
  
    handleRefresh: function(data) {
  		console.log("Aeris Bibliography Authors - Refreshing"); 
    	console.log("detail: " + JSON.stringify(data.detail));
    	this.visible = false
    	if ((! data) || (! data.detail))  {
    	 return
    	}
 
    	this.authors = data.detail[0].resource.author;
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
  	
  	getRolesToDisplay: function() {
  		this.roles.push("author");
  	}
  }
}
</script>

<style>

.aeris-metadata-contacts-host .section-title {
  border-bottom: 1px solid
}
.aeris-metadata-contacts-host metadata-contact {
  margin-top: 5px
 }

 </style>