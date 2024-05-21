<template>
  <button @click="sendMessageToSibling">HELLO FROM YOUR CHILDREN:)</button>
  </template>
  
  <script>

  
  export default {
    emits: ['child-event'],
    methods: {
      sendMessageToParent() {
        this.$emit('child-event', 'Hello from child!');
      },
    },
  };
  </script>