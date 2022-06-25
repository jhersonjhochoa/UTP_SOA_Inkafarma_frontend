import { createWebHistory, createRouter } from "vue-router";
import CategoryVue from "./components/pages/Category.vue";
import DashboardVue from "./components/pages/Dashboard.vue";
import PaymentMethodVue from "./components/pages/PaymentMethod.vue";
import OrderVue from "./components/pages/Order.vue";


const routes = [
  {
    path: "/",
    name: "dashboard",
    meta: {
      title: "Home",
    },
    component: DashboardVue,
  },
  {
    path: "/categories",
    name: "categories",
    meta: {
      title: "Categorías",
    },
    component: CategoryVue,
  },
  {
    path: "/payment-methods",
    name: "paymentMethods",
    meta: {
      title: "Métodos de pago",
    },
    component: PaymentMethodVue,
  },
  {
    path: "/orders",
    name: "orders",
    meta: {
      title: "Pedidos",
    },
    component: OrderVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;