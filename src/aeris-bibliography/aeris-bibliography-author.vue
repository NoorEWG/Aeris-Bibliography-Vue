/*
 dependances: 
 font awesome
 international field
*/


<template>
<span class="aeris-metadata-contact-host" v-if="visible">
<div class="metadata-contact-container">
      <article>
        <div>
          <p class="metadata-contact-name"><i class="fa fa-user"></i>{{value.lastName}} {{value.firstName}}</p>
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
	.aeris-metadata-contact-host {
        display: block;
        font-family: 'Open Sans', sans-serif;
        --paper-input-container-focus-color: #666;
        transition: 0.6s
    }
    .metadata-contact-container article {
        display: flex;
        flex-direction: column
    }
    .metadata-contact-container article p {
        margin: 0 auto
    }
    .metadata-contact-container .metadata-contact-name {
        margin: 0
    }
    .metadata-contact-container .metadata-contact-name .fa {
        display: inline-block;
        margin-right: 5px;
        width: 1em;
        text-align: center
    }
    .metadata-contact-container .metadata-contact-description {
        margin-left: 0.5em;
        padding: 3px 0 0 10px;
        border-left: 1px solid #bbb;
        font-size: 0.8em;
        line-height: 1.5em
    }
    .metadata-contact-container a {
        color: #3498db;
        text-decoration: none
    }
</style>