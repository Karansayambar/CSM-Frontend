import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/dashboard/Dashboard.vue";
import LoginForm from "../components/auth/LoginForm.vue";

const routes = [
  { path: "/", component: LoginForm },
  { path: "/dashboard", component: Dashboard },
];

const useRouter = createRouter({
  history: createWebHistory(),
  routes,
});

export default useRouter;
