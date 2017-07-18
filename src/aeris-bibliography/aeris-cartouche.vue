/*
 dependances: font awesome
*/

<template>
<span class="aeris-cartouche-host">
   <span class="aeris-cartouche-container" v-if="visible">
      <span v-if="icon">
        <i v-bind:class="_getIconStyle"></i>
      </span>
      <slot></slot>
      <span v-if="edit">
      	<i @click.prevent="_handleClick" class="aeris-cartouche-delete fa fa-times"></i>
      </span>
    </span>
</span>
</template>

<script>
export default {
  props: {
  itemref: {
    default: '',
    type: String
  },
  edit: {
    type: Boolean,
    default: false
  },
  visible: {
    default: true,
    type: Boolean
  },
  icon: {
	default: '',
    type: String
  }
},
  data () {
    return {
    }
  },
  computed: {
  _getIconStyle: function() {
        if (this.icon) {
          return (this.icon.startsWith('fa-')) ? 'fa '+this.icon.toLowerCase() : 'fa fa-' + this.icon.toLowerCase();
        }
      }
  },
  methods: {
    _handleClick: function() {
	    console.log("_handleClick "+this.itemref);
		var reference = this.itemref;
		this.visible = false;
        this.$emit('itemDeleted', {data: reference});
        //this.parentNode.removeChild(this);
      }   
  }
}
</script>

<style>
.aeris-cartouche-host {
	 display: inline-block
}

.aeris-cartouche-container {
    display: inline-block;
    padding: 2px 5px;
    margin: 0 3px;
    border: 1px solid #F5F5F5;
    border-radius: 5px !important;
    color: #666;
    background-color: #F5F5F5
}
.aeris-cartouche-container:hover {
    cursor: default
}
.aeris-cartouche-container .fa {
    margin-right: 5px
}
.aeris-cartouche-delete {
    cursor: pointer;
    margin-left: 3px;
    opacity: 0.6
}
.aeris-cartouche-delete:hover {
    opacity: 1
}
</style>