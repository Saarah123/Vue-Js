import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify'; // Import Vuetify plugin

const app = createApp(App);
app.use(store);
app.use(vuetify); // Use the Vuetify plugin
app.mount('#app');
