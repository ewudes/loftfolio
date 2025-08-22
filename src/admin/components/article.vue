<template lang="pug">
.article
  .article__view(v-if="!editmode")
    .article__title {{ article.title }}
    .article__date {{ formatedDate }}
    .article__content {{ article.content }}
    .article__btns
      button.article__btn(@click="remove" type="button") Удалить

  .article__edit(v-else)
    input.article__input(
      type="text",
      placeholder="Заголовок",
      v-model="newArticle.title"
    )
    textarea.article__input(
      placeholder="Содержание",
      v-model="newArticle.content"
    )
    .article__btns
      button.article__btn(@click="addArticleItem" type="button") Сохранить
      button.article__btn(@click="remove" type="button") Удалить
    .article__success(:class='{"article__success--active": success}')
      = textMsg
</template>

<script>
import helpers from "../helpers";
import { mapActions } from "vuex";

export default {
  props: {
    article: {
      type: Object,
      default: () => ({}),
    },
    editmode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newArticle: {
        title: this.article.title || "",
        content: this.article.content || "",
      },
      textMsg: "",
      success: false,
    };
  },
  computed: {
    formatedDate() {
      return this.article.date ? helpers.dateView(this.article.date) : "";
    },
  },
  methods: {
    ...mapActions("blog", ["removeArticle", "addArticle"]),
    remove() {
      if (this.article.id) {
        this.removeArticle(this.article.id);
      }
      this.textMsg = "Статья удалена";
      this.success = true;
      setTimeout(() => (this.success = false), 2000);
    },
    addArticleItem() {
      this.addArticle(this.newArticle)
        .then(() => {
          this.newArticle.title = "";
          this.newArticle.content = "";
          this.textMsg = "Статья сохранена";
          this.success = true;
          setTimeout(() => (this.success = false), 2000);
        })
        .catch(() => {
          this.textMsg = "Ошибка сохранения";
          this.success = true;
          setTimeout(() => (this.success = false), 2000);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.article {
  margin-bottom: 20px;
  .article__title {
    font-weight: bold;
    font-size: 18px;
  }
  .article__content {
    margin-top: 5px;
  }
  .article__btns {
    margin-top: 10px;
    button {
      margin-right: 10px;
      cursor: pointer;
    }
  }
  .article__input {
    display: block;
    width: 100%;
    margin-bottom: 5px;
    padding: 5px;
    font-size: 16px;
  }
  .article__success {
    color: green;
    margin-top: 5px;
    opacity: 0;
    transition: opacity 0.3s;
    &--active {
      opacity: 1;
    }
  }
}
</style>
