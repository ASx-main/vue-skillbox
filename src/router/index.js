import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import ProductCart from '@/pages/ProductCart.vue';

Vue.use(VueRouter);

const routes = [
  { name: 'main', component: MainPage, path: '/' },
  { name: 'product', component: ProductPage, path: '/product/:id' },
  { name: 'notFond', component: NotFoundPage, path: '*' },
  { name: 'cart', component: ProductCart, path: 'cart' },
];

const router = new VueRouter({ routes });

export default router;
