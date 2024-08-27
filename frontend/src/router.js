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
  { path: '/order/:id', name: 'Order', component: Order, props: true },
  { path: '/ticket/:id', name: 'Ticket', component: Ticket, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
