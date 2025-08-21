export default {
  namespaced: true,
  state: () => ({
    skillsItems: [
      { id: 1, title: "HTML", percents: 90, category: 0 },
      { id: 2, title: "CSS", percents: 85, category: 0 },
      { id: 3, title: "JavaScript", percents: 80, category: 0 },
      { id: 4, title: "Node.js", percents: 70, category: 1 },
      { id: 5, title: "Webpack", percents: 60, category: 2 },
    ],
    nextId: 6,
  }),
  getters: {
    userId: () => 1,
  },
  actions: {
    getUser() {
      return new Promise((resolve) =>
        setTimeout(() => resolve({ id: 1 }), 300),
      );
    },
    getSkills({ state }) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(state.skillsItems), 300),
      );
    },
    addSkill({ state, commit }, skill) {
      return new Promise((resolve) => {
        const newSkill = { ...skill, id: state.nextId++ };
        commit("ADD_SKILL", newSkill);
        setTimeout(() => resolve(newSkill), 200);
      });
    },
    removeSkill({ commit }, id) {
      return new Promise((resolve) => {
        commit("REMOVE_SKILL", id);
        setTimeout(() => resolve(id), 200);
      });
    },
  },
  mutations: {
    ADD_SKILL(state, skill) {
      state.skillsItems.push(skill);
    },
    REMOVE_SKILL(state, id) {
      state.skillsItems = state.skillsItems.filter((s) => s.id !== id);
    },
  },
};
