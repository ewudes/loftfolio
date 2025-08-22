<template lang="pug">
.skills-row
  h3.skills-row__title {{ typeItem.name }}
  .skills-row__list
    skill(v-for="skill in skillsByType" :key="skill.id" :skill="skill")
    skill(:editmode="true" :typeId="typeItem.id")
</template>

<script>
import skill from "./skill.vue";

export default {
  components: { skill },
  props: {
    typeItem: { type: Object, default: () => ({}) },
    skills: { type: Array, default: () => [] },
  },
  computed: {
    skillsByType() {
      return this.skills.filter((s) => s.category === this.typeItem.id);
    },
  },
};
</script>

<style scoped>
.skills-row__title {
  font-weight: bold;
  margin-bottom: 10px;
}
.skills-row__list {
  margin-left: 15px;
}
</style>
