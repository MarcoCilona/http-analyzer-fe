<template lang="pug">
div
  .container.ph-4(style='max-height: 100%; overflow-y: auto')
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
  BottomSheet
    template(#content)
      Speedometer
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

// Components
import BottomSheet from './BottomSheet.vue';
import Speedometer from './ui/Speedometer.vue';

@Component({
  components: {
    BottomSheet,
    Speedometer
  }
})
export default class PageLayout extends Vue {
  @Prop() shareLink!: string;
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

@media only screen and (min-width: 425px) {
  .container {
    .row:nth-child(1) {
      order: 2;
    }
    .row:nth-child(2) {
      order: 1;
    }
  }
}
</style>
