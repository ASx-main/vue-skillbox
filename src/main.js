import Vue from 'vue';
import App from './App.vue';
import { hi, bye } from './variables';
import { some } from './common';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

some(hi);
some(bye);
