import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue")
    },
    {
      path: "/reservation",
      name: "reservation",
      component: () => import("../views/ReservationView.vue")
    },
    {
      path: "/room",
      name: "room",
      component: () => import("../views/RoomView.vue")
    }
  ]
});

export default router;
