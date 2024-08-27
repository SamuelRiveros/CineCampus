import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Cinema from './pages/cinema.vue';
import ChooseSeat from './pages/chooseseat.vue';
import Order from './pages/order.vue';
import Ticket from './pages/ticket.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/cinema/:id', name: 'Cinema', component: Cinema, props: true },
  { path: '/chooseseat/:id', name: 'ChooseSeat', component: ChooseSeat, props: true },
  { path: '/order', name: 'Order', component: Order },
  { path: '/ticket', name: 'Ticket', component: Ticket },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
