// store/modules/works.js
const works = {
  state: {
    worksItems: [
      { id: 1, title: "Project A", description: "Description A" },
      { id: 2, title: "Project B", description: "Description B" },
    ],
  },
  mutations: {
    setListWorks(state, works) {
      state.worksItems = works;
    },
    addNewWork(state, work) {
      state.worksItems.push(work);
    },
    removeExWork(state, workId) {
      state.worksItems = state.worksItems.filter((item) => item.id !== workId);
    },
  },
  actions: {
    getWorks({ commit }) {
      // имитация запроса
      const mockData = [
        { id: 1, title: "Project A", description: "Description A" },
        { id: 2, title: "Project B", description: "Description B" },
      ];
      commit("setListWorks", mockData);
    },
    addWork({ commit }, work) {
      commit("addNewWork", work);
    },
    removeWork({ commit }, workId) {
      commit("removeExWork", workId);
    },
  },
};

export default works;
