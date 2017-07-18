/*
 dependances: 
 font awesome
 international field
*/


<template>
<span class="aeris-author-host" v-if="visible">
<div class="aeris-author-container">
      <article>
        <div>
          <p class="aeris-author-name"><i class="fa fa-user"></i>{{value.lastName}} {{value.firstName}}</p>
        </div>
      </article>
    </div>
 </span>
</template>

<script>
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
    author: {
      type: String,
      default: ''
    }
  },
  
  data () {
    return {
    }
  },
  
  computed: {
  
   value: function() {
   	return JSON.parse(this.author);
   }
   
  },
  
  methods: {
    
  }
}
</script>

<style>
	.aeris-aeris-author-host {
        display: block;
        font-family: 'Open Sans', sans-serif;
        --paper-input-container-focus-color: #666;
        transition: 0.6s
    }
    .aeris-author-container article {
        display: flex;
        flex-direction: column
    }
    .aeris-author-container article p {
        margin: 0 auto
    }
    .aeris-author-container .aeris-author-name {
        margin: 0
    }
    .aeris-author-container .aeris-author-name .fa {
        display: inline-block;
        margin-right: 5px;
        width: 1em;
        text-align: center
    }
    .aeris-author-container .aeris-author-description {
        margin-left: 0.5em;
        padding: 3px 0 0 10px;
        border-left: 1px solid #bbb;
        font-size: 0.8em;
        line-height: 1.5em
    }
    .aeris-author-container a {
        color: #3498db;
        text-decoration: none
    }
</style>