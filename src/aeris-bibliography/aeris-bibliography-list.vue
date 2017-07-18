/*
 dependances: 
 font awesome
 international field
*/


<template>
<span v-if="publications.length > 0">
   <div class="publication-content">
   <div v-for="publication in publications" class="publications">
     <aeris-bibliography-box :identifier="publication.resource.interHash" :title="publication.resource.title"></aeris-bibliography-box>
   </div>
  </div>
 </span>
</template>

<script>
import { EventBus } from '../aeris-event-bus/aeris-event-bus.js';
export default {
  props: {
  },
  
  data () {
    return {
       publications: [],
    }
  },
  
  computed: {
 
   
  },
  
  destroyed: function() {
  },
  
  created: function () {
  console.log("Aeris Bibliography List - Creating");
   EventBus.$on('publications', this.handleRefresh)
  },
  
  methods: {
    handleRefresh: function(data) {
  		console.log("Aeris Bibliography List - Refreshing"); 
    	this.publications = []
    	if (! data)  {
    	 return
    	}
  		this.publications = data;
  	},
  	
  }
}
</script>

<style>
	 
   
    
    .publications {
       width: 300px;
    }
    
 
    
    
</style>