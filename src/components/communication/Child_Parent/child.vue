<template>
  <button @click="sendMessageToSibling">HELLO FROM KID :)</button>
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