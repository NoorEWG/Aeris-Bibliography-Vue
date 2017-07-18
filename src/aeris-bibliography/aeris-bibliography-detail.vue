/*
 dependances: 
 font awesome
 international field
*/
<template>
<span class="aeris-bibliography-detail-host" v-if="visible">
 <div id="aerisBibliographyDetail" class="aeris-bibliography-detail_content grid">
 	  {{content}}
      <slot></slot>
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
    visible: {
    	type: Boolean,
     	 default: true
    },
    service: {
    	type: String,
     	 default: ''
    },
    identifier: {
    	type: String ,
     	 default: ''
    },
    program:  {
    	type: String ,
     	 default: ''
    } 
  },
  
   
  watch: {
    lang (value) {
	      //this.$i18n.locale = value
    },
    
    identifier() {
    	this.refresh();
    },
    service() {
    	this.refresh();
    },
    collectionId () {
       this.refresh();
    }
    
    
    
  },
  
  mounted: function () {
   //this.$i18n.locale = this.lang;
  	this.refresh();
  },
  
  computed: {
  
  },
  
  created: function () {
  console.log("Aeris Bibliography Detail - Creating");
  EventBus.$on('publicationId', this.changeId);
   
  },
  
  
  methods: {
  
  changeId: function(publicationId) {
 
     console.log("publication id is: " + publicationId);
  	 this.collectionId = publicationId;
  	 this.refresh();
  },
  
  refresh: function() {
  	   if (this.service && this.collectionId) {
	   var url = this.service+'/hash/'+this.collectionId;
   	   this.$http.get(url).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
   	   }
   },
  
  replaceAll: function(string, target, replacement) {
        return string.split(target).join(replacement);
      },
      
  handleSuccess : function(response) {
        console.log(JSON.stringify(response.data));
        this.sendDataToComponents(response.data);
  },
  
  sendDataToComponents: function(data) {
  		console.log("Event sent:refreshed");
  		EventBus.$emit('refreshed', {detail: data});
  },
      
  handleError: function(response) {
  		console.log("Aeris-Bibliography-Detail - Error while accessing server:"); 
        var error = response.status;
        var message = response.statusText;
        if(!error) message = 'Can\'t connect to the server';
        console.log('Error ' + error + ': ' + message);
 }
  
  },
   data () {
    return {
    	content:'',
    	displayableData:'',
    	collectionId: null
    }
  }
}
</script>

<style>
   .aeris-bibliography-detail-host {
        display: block;
        font-size: 14px
    }
    .aeris-bibliography-detail-host * {
        box-sizing: border-box
    }
</style>