import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import HelloWorld from "@/components/pages/HelloWorld";
import Home from "@/components/pages/Home";
// import RightSideBar from "@/components/pages/RightSideBar";
const routes = [
  { path: "/", component: Home },
  { path: "/hello-world", component: HelloWorld },
];

// eslint-disable-next-line no-new
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
