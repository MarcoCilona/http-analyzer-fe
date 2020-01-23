<template lang="pug">
.card_container.grey_medium.br-4.pv-2
  .row.ph-2.fs-20.uppercase.mb-10 {{ title ? title : '-'}}
  slot(name='content')
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ResultCard extends Vue {
  @Prop() title!: string;
}
</script>

<style lang="scss" scoped>
.card_container {
  min-height: 500px;
  min-width: 100%;
}

@media only screen and (min-width: 425px) {
  .card_container {
    min-width: 300px;
  }
}
</style>
