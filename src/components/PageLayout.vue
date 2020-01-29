<template lang="pug">
div
  .container.ph-4.results-container(style='overflow-y: auto')
    .row.align-center.mv-4
      slot(name='request-form')
    .row.align-center
      slot(name='request-status')
    .row.overflow-x-auto.mt-4
      slot(name='request-results')
    .row.mt-8.align-center
      .direction-column
        .fs-20.uppercase.text-align-center.mb-2 Share
        .ph-4.pv-1.grey_medium.br-20.text-align-center {{ shareLink ? shareLink : '-' }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PageLayout extends Vue {
  @Prop() shareLink!: string;
  @Prop({ type: Boolean }) showBottomSheet?: boolean;
}
</script>

<style lang="scss" scoped>
.container {
  .row:nth-child(3) {
    order: 3;
  }
  .row:nth-child(4) {
    order: 4;
  }
}

.results-container {
  max-height: calc(100% - 70px);
}

@media only screen and (min-width: 425px) {
  .container {
    .row:nth-child(1) {
      order: 2;
    }
    .row:nth-child(2) {
      order: 1;
    }
  }
  .results-container {
    max-height: 100%;
  }
}
</style>
