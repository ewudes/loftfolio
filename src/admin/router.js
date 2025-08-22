import { createRouter, createWebHistory } from "vue-router";

import Header from "./components/header.vue";
import Tabs from "./components/tabs.vue";
import Skills from "./components/skills.vue";
import Works from "./components/works.vue";
import Blog from "./components/blog.vue";

const routes = [
  {
    path: "/admin",
    components: {
      default: Skills,
      "admin-header": Header,
      tabs: Tabs,
    },
  },
  {
    path: "/admin/works",
    components: {
      default: Works,
      "admin-header": Header,
      tabs: Tabs,
    },
  },
  {
    path: "/admin/blog",
    components: {
      default: Blog,
      "admin-header": Header,
      tabs: Tabs,
    },
  },
  { path: "/:catchAll(.*)", redirect: "/admin" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
