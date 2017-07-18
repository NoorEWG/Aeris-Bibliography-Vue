/*
 dependances: 
 font awesome
 international field
*/


<template>

     <div ref="bibliographybox" class="component-container">
     <div id="main" class="box noselect">
      <header class="box-heading">
        <div class="box-title">
          <h4>{{ title }}</h4>
        </div>
        <div class="box-heading-buttons">
          <div class="box-icon">
           <i :class="chevron" @click="_handleChevronClick"></i>
          </div>
          <div class="box-icon">
           <i class="fa fa-times" @click="_handleCloseClick()"></i>
          </div>
        </div>
      </header>
      <div ref="collapse" class="box-collapsable-part">
        <main class="box-body">
          <span v-if="hasToolbar">
            <div class="box-toolbar">
            </div>
          </span>
          <div class="content">
            <content></content>
          </div>
          <div v-if="expandable">
              <div class="expandButton" @click="_expand()"><i class="fa fa-plus"></i></div>
           </div>
        
        </main>
        <footer class="box-footer">
          <div>
          
          </div>
        </footer>
      </div>
    </div>
   </div>
  
</template>

<script>
import { EventBus } from '../aeris-event-bus/aeris-event-bus.js';
export default {
  props: {
     title: {type: String},
     identifier: {type: String}
  },
  
  data () {
    return {
       expandable: true,
       closeable: false,
       hasToolbar: false,
       chevron: 'fa fa-chevron-down'
    }
  },
  
  computed: {
 
   
  },
  
  destroyed: function() {
  },
  
  created: function () {
  },
  
  methods: {
   
  	_handleCloseClick: function() {
       this.$refs.bibliographybox.remove();
    },
    _handleChevronClick: function() {
       if(this.chevron === "fa fa-chevron-down") {
         this.chevron = "fa fa-chevron-up"
         this.$refs.collapse.classList.add("box-hidden")
       }
       else {
         this.chevron = "fa fa-chevron-down"
         this.$refs.collapse.classList.remove("box-hidden") 
       }
       
    },
    
     _expand: function(ev) {
        EventBus.$emit('publicationId', this.identifier);
      }
    
  }
}
</script>

<style>

    .box {
        box-sizing: border-box;
        width: 100%;
        color: #333);
        background-color: #fff)
    }
    .box-title {
        display: flex;
        font-size: 16px;
        line-height: 1.2
    }
    .box-title .plateform-icon,
    .box-title .fa {
        margin-right: 10px
    }
    .box-title h4 {
        margin: 0;
        font-size: 16px;
        color:#fff;
    }
    .box-body {
        font-size: 14px;
        word-wrap: break-word
    }
    .box-body .content {
        padding: 10px;
        text-align: justify
    }
    .box-toolbar {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        padding: 5px 10px;
        border-bottom: 1px solid #ccc;
        border: var(--catalog-box-toolbar-border);
        background-color:  #fafafa)
    }
    .box-heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background-color: #f5f5f5);
        color: inherit;
        border: none;
        cursor: pointer
    }
    .box-heading .box-heading-buttons {
        display: flex;
        flex-flow: row nowrap
    }
    .box-heading .box-heading-buttons .fa {
        margin-left: 5px
    }
    
    .box-icon {
    	min-width: 15px;
    	color: white;
    }
    
    .box-collapsable-part {
        border: none
    }
    
    .box-hidden {
        display: none;
    }
    
    .box-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px
    }
    
    
.expandButton {
    font-size: 14px;
    padding: 6px 13px;
    margin: 0 5px;
    color: #4765a0;
    border: 1px solid;
    background-color: #fff;
    opacity: 1;
    outline: none;
    float: right;
}
    
   
    .expandButton:hover {
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        color: #fff;
        background-color: #d35400;
        opacity: 1;
    }
    .metadata-datalevel .cartouche {
        display: inline-block;
        padding: 3px 5px;
        border-radius: 5px;
        color: #fff;
        font-size: 12px;
        background-color: #f0ad4e
    }
    .metadata-datalevel .cartouche .fa { 
       margin-right: 5px
    }
    
 
    
    
</style>