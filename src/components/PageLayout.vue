<template lang="pug">
div
  .container.ph-4(style='max-height: calc(100% - 70px); overflow-y: auto')
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
      .mt-10.ph-5.fs-24.grey--text.fw-700
        .row.mb-10 Timing analysis
        Speedometer(value='500', key=0)
        .row.mt-2.align-center Page load
        .row.mt-2.align-center.black_light--text 500s
        Speedometer(value='650', key=1)
        .row.mt-2.align-center First interaction
        .row.mt-2.align-center.black_light--text 650s
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
