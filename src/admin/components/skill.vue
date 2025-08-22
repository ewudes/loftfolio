<template lang="pug">
.skill(:class="{'skill--new': editmode}")
  .skill__title(v-if="!editmode") {{ skill.title }}
  .skill__title(v-else)
    input.skill__input.skill__input--name(type="text" placeholder="имя" v-model="newSkill.title")

  .skill__info
    .skill__percents(v-if="!editmode")
      input.skill__input.skill__input--percents(:value="skill.percents" readonly)
      span %
    .skill__percents(v-else)
      input.skill__input.skill__input--percents(type="text" placeholder="%" v-model="newSkill.percents")
      span %
    
    .btns
      button.btn(:class="editmode ? 'btn--add' : 'btn--remove'" type="button" @click="editmode ? add() : remove()") {{ editmode ? '+' : 'х' }}

  .skill__success(:class="{ 'skill__success--active': success }")
    .skill__success-message {{ textMsg }}
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    skill: { type: Object, default: () => ({}) },
    typeId: { type: Number, default: 0 },
    editmode: { type: Boolean, default: false },
  },
  data() {
    return {
      newSkill: { title: "", percents: "", category: this.typeId },
      textMsg: "",
      success: false,
    };
  },
  methods: {
    ...mapActions("skills", ["removeSkill", "addSkill"]),
    showMessage(msg) {
      this.textMsg = msg;
      this.success = true;
      setTimeout(() => (this.success = false), 2000);
    },
    add() {
      if (!this.newSkill.title || !this.newSkill.percents)
        return this.showMessage("Заполните все поля");
      this.addSkill(this.newSkill)
        .then(() => {
          this.newSkill.title = "";
          this.newSkill.percents = "";
          this.showMessage("Добавлено новое умение");
        })
        .catch(() => this.showMessage("Ошибка добавления"));
    },
    remove() {
      this.removeSkill(this.skill.id)
        .then(() => this.showMessage("Удалено умение"))
        .catch(() => this.showMessage("Ошибка удаления"));
    },
  },
};
</script>

<style scoped>
/* твои стили оставляем без изменений */
</style>
