<template>
<div>
<span>{{parentMessage}}</span>
<div class="message">Value is: {{ count }}</div>
<a href="#" @click.prevent="increment">Increment</a>
</div>
</template>

<script>
export default {
  props: ['parentMessage'],
  data () {
    return {
      count: 0
    }
  },
  methods: {
    increment () {
      this.count ++;
    }
  }
}
</script>

<style>
</style>