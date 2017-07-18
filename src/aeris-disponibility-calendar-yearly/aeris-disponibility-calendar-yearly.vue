/*
 dependances: 
 font awesome
 international field
 shared style
 // markdown
*/
<i18n>
{
  "en": {
    "calendar": "Yearly Calendar"
  },
  "fr": {
    "calendar": "Calendrier annuel"
  }
}
</i18n>

<template>
	<span class="aeris-disp-calendar-container-host" v-if="calendarTitle.length > 0">
	    <div class="component-container">
			<header>
			  <h3>
				<i class="fa fa-calendar-o"></i>{{$t('calendar')}}
      		  </h3>
      		</header>
      		
      		<main>
      		<div class="aeris-disp-inner-calendar">
	      		<div class="aeris-disp-calendar-header aeris-disp-calendar">
					<div class="aeris-disp-calendar-previous aeris-disp-calendar" @click="previousYears()">
	  					<i class="fa fa-angle-left aeris-disp-calendar"></i>
					</div>
					<h1 class="aeris-disp-calendar-header-title aeris-disp-calendar fadeInRight">{{calendarTitle}}</h1>
					<div class="aeris-disp-calendar-next aeris-disp-calendar" @click="nextYears()">
	  					<i class="fa fa-angle-right aeris-disp-calendar"></i>
					</div>
				</div>
	      		
	      		<div id="aerisDispCalendarCals" class="aeris-disp-calendar-calendars">
	    		 	<span v-for="year in years" :class="year.clazz">
						<aeris-year-calendar class="aeris-disp-calendar-item" :events="year.events" :start="year.year" fadeInRight></aeris-year-calendar>
					</span>
	      		</div>
      		</div>
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
    },
	start: {
	  type: Number, 
	  default: 1900
	},
    service: {type: String},
	collection: {type: String},
    title : {type: String},
  }, 
  
  data: function() {
    return {
      selectedCollection: this.collection,
      years : Array,
      events: Array,
      firstYear: String,
      firstY: Number,
      lastY: Number,
      lastYearVisible: Number,
      range: 12,
      calendarTitle: ''
      
    }
  },
  
  watch: {
    lang (value) {
	  this.$i18n.locale = value;
    },
    service (value) {
      this.service = value;
    }
  },
  
  destroyed: function() {
  	EventBus.$off('refreshed', this.handleRefresh)
  	EventBus.$off('theme', this.handleTheme)
  },
  
  created: function () {
   //console.log("Aeris Disponibiliy Calendar Yearly - Creating");
   this.$i18n.locale = this.lang;
   EventBus.$on('refreshed', this.handleRefresh);
   EventBus.$on('theme', this.handleTheme);
  },
  
  computed: { 
  },
  
  mounted: function() {
    EventBus.$emit('themeRequest', {});
    // console.log("Aeris Disponibiliy Calendar Yearly - Mounted");
    this.handleRefresh(this.data);
  },
  
  methods: {
  
    handleTheme: function(theme) {
  		this.$el.querySelector("header").style.background=theme.primary;
  	},
  
    handleRefresh: function(data) {
  	  // console.log("Aeris Disponibiliy Calendar Yearly - Refreshing"); 
  	  if(this.start && isNaN(this.start) === false) {
        this.firstY = Number(this.start);
      } 
      else {
        this.firstY = 1900;
      }
    
      this.lastYearVisible = moment().year();
      this.lastY = this.lastYearVisible;
   	
      if (this.service && this.collection) {
        var url = this.service + "?collection=" + this.collection;
   	    this.$http.get(url).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
   	   }
     },
  
     handleSuccess: function(request) {
		  /* if(this.isDebouncerActive('loadingEvent')) {
			  this.cancelDebouncer('loadingEvent');
		  } else {
			  this.fire('longActionStopEvent', {
				  message: this._localize('loading', this.lang) + '...'
			  });
		  } 
		
		  if(request.url.indexOf('lasteventdate') >= 0) {
			  this.lastEventResponse(request);
		  } else { */
			  this.eventsResponse(request);
		  /*} */
     },
   
     /*lastEventResponse: function(request) {
		  try {
			  this.lastEvent = request.detail.response.lasteventdate;
		  } catch (ex) {
			  this.lastEvent = '';
		  }
		  if(!this.lastEvent) this.lastEvent = moment().date(1).format('YYYY-MM-DD');
		
		  this.start = this.lastEvent;
		  this.startMoment = moment(this.lastEvent).date(1);
		  // this._queryService();
	  },*/
	
	  eventsResponse: function(request) {
	    this.events = JSON.parse(request.bodyText);
      this.draw();
	  },	
  	
  	draw: function() {
      this.years = [];
      var start = this.events[0].start;
      var end = this.events[this.events.length-1].start;
      
      var thisYear = moment().year();
      this.lastYearVisible = thisYear; 
    
      var tempData = [];
        
      for(var i = this.firstY; i <= this.lastYearVisible; i++) {
        
        var clazz = 'aeris-cal-item calendar-item-hidden';
        if(i > (thisYear - this.range)) {
             var clazz = 'aeris-cal-item';
        }
        var date = moment(i + "-12-31").format('YYYY-MM-DD');
        var year = moment(i + "-12-31").format('YYYY');
        var event = {
          start: date,
          end: date,
          fileNumber: 0,
          color: 'red',
          id: ''
        };
        var events = [];
        events.push(event);
        var obj = {date: date, year: year, clazz: clazz, events: JSON.stringify(events)};
        tempData.push(obj);
      }
    
      for(var i = 0; i < this.events.length; i++) {
        var date = moment(this.events[i].start).format('YYYY-MM-DD');
        var year = moment(this.events[i].start).format('YYYY');
        var evs = [];
        evs.push(this.events[i]);
        tempData.forEach( function(t) {
          if(t.year === year) {
            t.events = JSON.stringify(evs);
          	t.visible = true;
          }
        });
      }       
      this.years = tempData;
      this.getCalendarTitle();
        
      /* Polymer.dom().flush();
      Polymer.updateStyles();
		  if(this._direction === 'next') {
			  this._slideIn('fadeInRight');
		  } else {
			  this._slideIn('fadeInLeft');
			} */
    },
      
    nextYears: function() {
      if(this.lastYearVisible < this.lastY ) {
        var tmp = this.lastYearVisible + this.range;
        if(tmp <= this.lastY) {
          this.lastYearVisible = tmp;  
        }
        else {
          this.lastYearVisible = this.lastY;
        }
      }
      var range = this.range;
      var lastYear = this.lastYearVisible;
      this.years.forEach( function(y) {
        if(Number(y.year) <= lastYear && Number(y.year) > (lastYear - range)) {
          y.clazz = 'aeris-cal-item';
        }
        else {
          y.clazz = 'aeris-cal-item calendar-item-hidden';
        }   
      }); 
      this.getCalendarTitle();
    },
      
    previousYears: function() {
        
      if(this.lastYearVisible > this.firstY ) {
      	var tmp = this.lastYearVisible - this.range;
      	if(tmp > this.firstY) {
          this.lastYearVisible = tmp;  
        }
      }
      var range = this.range;
      var lastYear = this.lastYearVisible;
      this.years.forEach( function(y) {
        if(Number(y.year) <= lastYear && Number(y.year) > (lastYear - range)) {
          y.clazz = 'aeris-cal-item';
        }
        else {
          y.clazz = 'aeris-cal-item calendar-item-hidden';
        }
      });
      this.getCalendarTitle();        
    },
      
    getCalendarTitle: function() {
      	this.calendarTitle = (this.firstY > (this.lastYearVisible - this.range) ? this.firstY : (this.lastYearVisible - this.range))
      	                     + " - " 
      	                     + this.lastYearVisible;
    }
  }
}
</script>

<style>
   
  .aeris-disp-calendar-container-host {
    position: relative;
    text-align: center;
    margin: auto;
    overflow: hidden
  }
    
  .component-container {
    position: relative;
    text-align: center;
    overflow: hidden;
    margin: 5px;
  }
   
  .component-container main {
    display: flex;
    justify-content: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-top: none;
    word-wrap: break-word;
  }
		
  .aeris-disp-calendar-container {
  	display: block;
  	position: relative;
  	overflow: hidden;
          width: 100%;
  	text-align: center;
  }
  .aeris-disp-calendar-calendars {
  	display: flex;
  	flex-wrap: wrap;
  	justify-content: left;
  	margin: 0 auto;
  }
  .aeris-disp-calendar-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
    height: 50px;
    border-bottom: 2px solid;
    border-color: #4765a0;
    border-color: var(--main-color, #4765a0);
  }
	.aeris-disp-calendar-header-title {
	  display: inline-block;
	  width: 100%;
	  margin: 0;
	  padding: 0;
	  font-size: 18px;
	  font-weight: 600;
	  text-align: center;
	}
	.aeris-disp-calendar-previous, .aeris-disp-calendar-next {
		position: relative;
		z-index: 10;
    font-size: 36px;
		color: #4765a0;
		color: var(--main-color, #4765a0);
		opacity: 0.3;
		cursor: pointer;
		&:hover {
			opacity: 1;
		}
	}
   .aeris-cal-item {
   	 width: 24%;
   	 height: 80px;
   }	
   
   .aeris-disp-inner-calendar {
     width: 240px;
   }
   
	
	.aeris-disp-calendar-previous {
		left: 10px;
	}
	.aeris-disp-calendar-next {
		right: 10px;
	}
	.aeris-disp-calendar-item {
		margin: 15px;
	}
	
	.calendar-item-hidden {
		display: none;
	}
	
	@-webkit-keyframes fadeInRight {
	  from {
			opacity: 0;
			-webkit-transform: translate3d(100%, 0, 0);
			transform: translate3d(100%, 0, 0);
	  }
	  to {
			opacity: 1;
			-webkit-transform: none;
			transform: none;
	  }
	}
	@keyframes fadeInRight {
	  from {
			opacity: 0;
			-webkit-transform: translate3d(100%, 0, 0);
			transform: translate3d(100%, 0, 0);
	  }
	  to {
			opacity: 1;
			-webkit-transform: none;
			transform: none;
	  }
	}
	.fadeInRight {
	  -webkit-animation-name: fadeInRight;
	  animation-name: fadeInRight;
	  -webkit-animation-duration: 0.5s;
	  animation-duration: 0.5s;
	  -webkit-animation-fill-mode: both;
	  animation-fill-mode: both;
	}
	@-webkit-keyframes fadeOutLeft {
	  from {
		  opacity: 1;
	  }
	  to {
			opacity: 0;
			-webkit-transform: translate3d(-100%, 0, 0);
			transform: translate3d(-100%, 0, 0);
	  }
	}
	@keyframes fadeOutLeft {
	  from {
		  opacity: 1;
	  }
	  to {
			opacity: 0;
			-webkit-transform: translate3d(-100%, 0, 0);
			transform: translate3d(-100%, 0, 0);
	  }
	}
	.fadeOutLeft {
	  -webkit-animation-name: fadeOutLeft;
	  animation-name: fadeOutLeft;
	  -webkit-animation-duration: 0.5s;
	  animation-duration: 0.5s;
	  -webkit-animation-fill-mode: both;
	  animation-fill-mode: both;
	}
	@-webkit-keyframes fadeOutRight {
	  from {
		  opacity: 1;
	  }
	  to {
			opacity: 0;
			-webkit-transform: translate3d(100%, 0, 0);
			transform: translate3d(100%, 0, 0);
	  }
	}
	@keyframes fadeOutRight {
	  from {
		  opacity: 1;
	  }
	  to {
			opacity: 0;
			-webkit-transform: translate3d(100%, 0, 0);
			transform: translate3d(100%, 0, 0);
	  }
	}
	.fadeOutRight {
	  -webkit-animation-name: fadeOutRight;
	  animation-name: fadeOutRight;
	  -webkit-animation-duration: 0.5s;
	  animation-duration: 0.5s;
	  -webkit-animation-fill-mode: both;
	  animation-fill-mode: both;
	}
	@-webkit-keyframes fadeInLeft {
	  from {
			opacity: 0;
			-webkit-transform: translate3d(-100%, 0, 0);
			transform: translate3d(-100%, 0, 0);
	  }
	  to {
			opacity: 1;
			-webkit-transform: none;
			transform: none;
	  }
	}
	@keyframes fadeInLeft {
	  from {
			opacity: 0;
			-webkit-transform: translate3d(-100%, 0, 0);
			transform: translate3d(-100%, 0, 0);
	  }
	  to {
			opacity: 1;
			-webkit-transform: none;
			transform: none;
	  }
	}
	.fadeInLeft {
	  -webkit-animation-name: fadeInLeft;
	  animation-name: fadeInLeft;
	  -webkit-animation-duration: 0.5s;
	  animation-duration: 0.5s;
	  -webkit-animation-fill-mode: both;
	  animation-fill-mode: both;
	}
</style>