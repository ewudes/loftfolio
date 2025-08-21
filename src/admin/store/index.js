import { createStore } from "vuex";
import skills from "./modules/skills";
import blog from "./modules/blog";

const store = createStore({
  modules: {
    skills,
    blog,
  },
});

export default store;
