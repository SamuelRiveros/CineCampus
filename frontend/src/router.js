import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/home.vue';
import ChooseSeat from './pages/chooseseat.vue';
import Cinema from './pages/cinema.vue';
import Order from './pages/order.vue';
import Ticket from './pages/ticket.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/cinema', component: Cinema },
  { path: '/chooseseat', component: ChooseSeat },
  { path: '/order', component: Order },
  { path: '/ticket', component: Ticket },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
