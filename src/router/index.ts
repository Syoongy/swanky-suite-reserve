import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView
    },
    {
      path: "/signup",
      name: "signup",
      component: LoginView
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
