<template>
    <div>
      <ChildComponent @child-event="handleChildEvent" />
      <p>Message from child: {{ childMessage }}</p>
    </div>
  </template>
  
  <script>
  
  import ChildComponent from './child.vue'
  
  export default {
    components: {
      ChildComponent,
    },
    data() {
      return {
        childMessage: '',
      };
    },
    methods: {
      handleChildEvent(message) {
        this.childMessage = message;
      },
    },
  };
  </script>
  