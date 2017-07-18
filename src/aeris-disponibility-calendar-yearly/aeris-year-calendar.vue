*
 dependances: 
 font awesome
 international field
*/

<i18n>
{
  "en": {
    "files": "file(s)"
  },
  "fr": {
   "files": "file(s)"
  }
}
</i18n>

<template>
  <div id="aerisCalendarContainer" class="aeris-disponibility-calendar-container"  v-on:click="openYear($event)">
	  <span :title="tooltip">
	      <div class="aeris-vcal-header">
	      	<h1 class="aeris-vcal-year">{{currYear}}</h1>
	      </div>
	      	      
	      <div class="aeris-vcal-year"> 
	      	<span :class="itemsColorClass"></span>
	      </div>
	  </span>
	  <div id="aerisCalendarBody"></div>
	  <div id="aerisCalendarLegend" class="aeris-vcal-legend"></div>
  </div>
</template>

<script>

import { EventBus } from '../aeris-event-bus/aeris-event-bus.js';

export default {
  props: {
  	lang:  {
      type: String,
      default: 'fr'
    },
    start: {type: Number},
    events: {type: String}
  },
  
  data () {
    return {
    	currYear: this.start,    	
    	tooltip: {type: String},
    	hasItems: false,
    	itemsColorClass: 'year calendar',
  		yearEvents: {type: Array}
    }
  },
  
  watch: {
    lang (value) {
	    this.$i18n.locale = value
    },
    start (value) {
    	this.start = value
    },
    events (value) {
      this.events= value;
    }
  },
  
  computed: {  
  },
  
  mounted: function () {
   EventBus.$emit('themeRequest', {});
  },
    
  destroyed: function() {
  	EventBus.$off('theme', this.handleTheme)
  },
  
  created: function () {
   // console.log("Aeris Year Calendar - Creating");
   EventBus.$on('theme', this.handleTheme)  
   this.yearEvents = [];
   this.draw();   
  },
  
  
  
  
  methods: {
  
    capitalizeFirstLetter: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
   
    computeTooltip: function(item) {
      var fileNumber = 0;
      var fileSize = 0;
      var arr = item.events;
      if(!arr.length) return;
      arr.forEach(function(ev) {
        fileNumber += Number(ev.fileNumber) || 0;
        fileSize += Number(ev.size) || 0;
      }.bind(this));
      // return fileNumber + ' ' + this.lang.files + ' (' + this.computeFileSize(fileSize) + ')';
       return fileNumber + ' ' + 'file(s)' + ' (' + this.computeFileSize(fileSize) + ')';
    },
   
    computeFileSize: function(size) {
      if(size === 0) return 0;
      size = Math.abs(parseInt(size, 10));
      var def = [[1, 'octets'], [1024, 'ko'], [1024*1024, 'Mo'], [1024*1024*1024, 'Go'], [1024*1024*1024*1024, 'To']];
      for(var i=0; i < def.length; i++){
        try {
          if(size < def[i][0]) return (size / def[i - 1][0]).toFixed(2) + def[i - 1][1];
        } catch (e) {
          console.log(e);
        }
      }
    },
   
    draw: function() {
    
      if(this.events) {    
        this.evs = JSON.parse(this.events);
       
        var items = {events : []};
        for(var i = 0; i < this.evs.length; i++) {
          var ev = this.evs[i];
          var start = ev.start;
          ev.start = moment(ev.start);
          ev.end = moment(ev.end);
          this.itemsColorClass = ev.color + " year-calendar";
          if(this.currYear === start.substring(0,4)) {
            // this.itemsColorClass = ev.color + " year-calendar";
            items.events.push(ev);
          }
        }
        this.tooltip = this.computeTooltip(items);
        // this.refreshSelected();
      }
    },
      
    openYear: function(e) {
    
      var targetId = event.currentTarget.id;
      var elem = event.currentTarget;
      
      // var yearEvents = [];
      var fileNumber = 0;
      var size = 0;
      if(!this.evs.length) return;
      
      var yearEvs = [];
      var year = this.start;
      this.evs.forEach(function(event) {
        if(event.id.length > 0) {
          fileNumber += Number(event.fileNumber);
          size += Number(event.size);
          var eventData = {
        	  data: event.date,
        	  fileNumber: fileNumber,
        	  fileSize: size,
        	  collection: event.id,
        	  directory: year  	
          };
        yearEvs.push(eventData);
        }
      });
      this.yearEvents = yearEvs;
     
      // if there are no files, yearEvs is empty, and don't do anything
      if(yearEvs.length > 0) { 
        var addToCart = false;
        if(elem.classList.contains('selected')) {
        	 elem.classList.remove("selected");	
        }
        else {
          elem.classList.add("selected");
          addToCart = true;
        }
             
        if(!addToCart) {
          EventBus.$emit('removeFromCart', this.yearEvents);
          console.log("remove from cart: " + JSON.stringify(this.yearEvents));
        } else {
           EventBus.$emit('addItemToCart', this.yearEvents); 
           console.log("add to cart: " + JSON.stringify(this.yearEvents));
        }
      }
      //this.refreshSelected(); 
    },
   
    refreshSelected: function() {
      // EventBus.$emit('refreshFromCart', this.yearEvents);
    }
  }
}
</script>

<style>
  .aeris-yearly-calendar-host {
    display: inline-block;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    overflow: hidden;
  }
  
  .selected {
    background-color: rgba(0, 255, 0, 0.2);
  }
  
  .aeris-vcal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: center;
    height: 30px;
    width: 100%;
    margin-bottom: 10px;
    text-align: center;
    position:relative;
    z-index: 100;
    h1 {
      display: inline-block;
      width: 100%;
      margin: 0;
      padding: 0 0 5px 0;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
    }
  }
  
  .aeris-vcal-year {
    font-size: 9px;
    text-transform: uppercase;
    margin: 2px 0;
    letter-spacing: .7px;
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    font-size: 90%;
    width: 100%;
    opacity: 1;
  }
  
  .year-calendar {
  	margin: 10px;
  	height: 10px;
  	width: 100%;
  }
  
  
  .red { background: rgba(231, 76, 60, 1); }
  .orange { background: rgba(247, 167, 0, 1); }
  .green { background: rgba(153, 198, 109, 1); }
  
  /* Animations */
  @-webkit-keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @-webkit-keyframes fadeOut {
    from { opacity: 1; } to { opacity: 0; }
  }
  @keyframes fadeOut {
    from { opacity: 1; } to { opacity: 0; }
  }
</style>