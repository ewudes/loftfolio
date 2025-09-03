<template lang="pug">
.new-article
  h3.new-article__title Добавить запись
  ArticleComponent(
    :editmode="true"
    :article="newArticle"
  )
</template>

<script>
import { mapActions } from "vuex";
import ArticleComponent from "./article.vue";

export default {
  components: {
    ArticleComponent,
  },
  data() {
    return {
      newArticle: {
        title: "",
        content: "",
        date: "",
      },
    };
  },
  methods: {
    ...mapActions(["createArticle"]),
    submitArticle() {
      this.createArticle(this.articleData);
    },
  },
};
</script>

<style lang="scss" scoped>
.new-article {
  font-size: 16px;
}

.new-article__title {
  color: $text-color;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
}
</style>
