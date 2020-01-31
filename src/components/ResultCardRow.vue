<template lang="pug">
.row.grey_dark
  .pa-2.direction-column.black_light--text
    .fs-20.uppercase.fw-600(v-if='!hideTitle') {{ title ? title : '-' }}
    .fs-14 {{ value ? value: '-' }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ResultCardRow extends Vue {
  @Prop() title!: string;
  @Prop() value!: string;
  @Prop({ type: Boolean }) hideTitle?: boolean;
}
</script>

<style lang="scss" scoped>
.row {
  & +.row {
    margin-bottom: 5px;
  }
}
</style>
