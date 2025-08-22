<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/html-end-tags -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="blog">
    <h1>Блог</h1>

    <div v-if="articles && articles.length">
      <div v-for="article in articles" :key="article.id" class="article">
        <h2>{{ article.title }}</h2>
        <p>{{ article.content }}</p>
        <button @click="remove(article.id)">Удалить</button>
      </div>
    </div>
    <div v-else>
      <p>Статей пока нет...</p>
    </div>

    <hr />

    <h2>Добавить статью</h2>
    <input v-model="newTitle" placeholder="Заголовок" />
    <textarea v-model="newContent" placeholder="Содержание"></textarea>
    <button @click="add">Добавить</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Blog",
  data() {
    return {
      newTitle: "",
      newContent: "",
    };
  },
  computed: {
    ...mapGetters("blog", {
      articles: "getArticles",
    }),
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    ...mapActions("blog", ["getArticles", "addArticle", "removeArticle"]),

    add() {
      if (!this.newTitle || !this.newContent) return;
      this.addArticle({ title: this.newTitle, content: this.newContent }).then(
        () => {
          this.newTitle = "";
          this.newContent = "";
        },
      );
    },
    remove(id) {
      this.removeArticle(id);
    },
  },
};
</script>

<style scoped>
.blog {
  padding: 20px;
}
.article {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}
input,
textarea {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 5px;
}
button {
  cursor: pointer;
}
</style>
