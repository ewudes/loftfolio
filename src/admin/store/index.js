import { createStore } from "vuex";
// import works from "./modules/works";
import skills from "./modules/skills";
import blog from "./modules/blog";

const store = createStore({
  modules: {
    // works,
    skills,
    blog,
  },
});

export default store;
