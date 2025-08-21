const state = {
  articlesItems: [
    { id: 1, title: "Первая статья", content: "Содержание первой статьи" },
    { id: 2, title: "Вторая статья", content: "Содержание второй статьи" },
  ],
};

const getters = {
  getArticles: (state) => state.articlesItems,
};

const actions = {
  getArticles({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(state.articlesItems);
      }, 300);
    });
  },
  addArticle({ commit, state }, newArticle) {
    return new Promise((resolve) => {
      const id = state.articlesItems.length + 1;
      const article = { id, ...newArticle };
      commit("ADD_ARTICLE", article);
      resolve(article);
    });
  },
  removeArticle({ commit }, id) {
    commit("REMOVE_ARTICLE", id);
  },
};

const mutations = {
  ADD_ARTICLE(state, article) {
    state.articlesItems.push(article);
  },
  REMOVE_ARTICLE(state, id) {
    state.articlesItems = state.articlesItems.filter((a) => a.id !== id);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
