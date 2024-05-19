<template>
  <div>
    <ChildComponent :message="parentMessage" />
  </div>
</template>

<script>
import ChildComponent from './child.vue';

export default {
  components: {
    ChildComponent,
  },
  data() {
    return {
      parentMessage: 'HELLO MESSAGE FROM YOUR PARENT!',
    };
  },
};
</script>
