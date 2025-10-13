import axios from "axios";

export default {
  namespaced: true,
  state: () => ({ info: {} }),
  mutations: {
    setUser(state, user) {
      state.info = user;
    },
  },
  actions: {
    async fetchUser({ commit }) {
      const res = await axios.get("/user");
      commit("setUser", res.data);
    },
  },
};
