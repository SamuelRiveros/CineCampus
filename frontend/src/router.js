import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/home.vue';
import ChooseSeat from './pages/chooseseat.vue';
import Cinema from './pages/cinema.vue';
import Order from './pages/order.vue';
import Ticket from './pages/ticket.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/chooseseat', component: ChooseSeat },
  { path: '/cinema', component: Cinema },
  { path: '/order', component: Order },
  { path: '/ticket', component: Ticket },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
