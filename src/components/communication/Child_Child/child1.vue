<template>
    <button @click="sendMessageToSibling">Hello BROTHER :D</button>
  </template>
  
  <script>

  export default {
    emits: ['child1-event'],
    methods: {
      sendMessageToSibling() {
        this.$emit('child1-event', 'Hello from Child 1!');
      },
    },
  };
  </script>
  