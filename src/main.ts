import Vue from 'vue';
import App from './App.vue';
import './styles/main.scss';
import router from './router';
import '@fortawesome/fontawesome-free/js/all.min';

import directives from './directives';

Vue.config.productionTip = false;

new Vue({
  directives,
  router,
  render: h => h(App),
}).$mount('#app');
