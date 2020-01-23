/* eslint-disable sort-keys */
import Vue from 'vue';
import VueRouter from 'vue-router';

import Detail from './views/Detail.vue';
import HomePage from './views/HomePage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/:idRequest',
    component: Detail,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
