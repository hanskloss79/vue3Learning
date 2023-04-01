import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router'; // importing router

// injecting router
createApp(App).use(router).use(store).mount('#shopping_cart');
