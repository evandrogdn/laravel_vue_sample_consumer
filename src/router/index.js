import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "@/stores/auth";

import HomeView from "../views/HomeView.vue";

import RegisterView from "../views/Auth/RegisterView.vue";
import LoginView from "../views/Auth/LoginView.vue";

import CreateView from "../views/Posts/CreateView.vue";
import ShowView from "../views/Posts/ShowView.vue";
import UpdateView from "../views/Posts/UpdateView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: {
        guest: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        guest: true,
      },
    },
    {
      path: "/create",
      name: "create",
      component: CreateView,
      meta: {
        auth: true,
      },
    },
    {
      path: "/posts/:id",
      name: "show",
      component: ShowView,
    },
    {
      path: "/posts/update/:id",
      name: "update",
      component: UpdateView,
      meta: {
        auth: true,
      },
    },
  ],
});

router.beforeEach(async (to, from) => {
  const authSotre = useAuthStore();
  await authSotre.getUser();

  if (authSotre.user && to.meta.guest) {
    return { name: "home" };
  }

  if (!authSotre.user && to.meta.auth) {
    return { name: "login" };
  }
});

export default router;
