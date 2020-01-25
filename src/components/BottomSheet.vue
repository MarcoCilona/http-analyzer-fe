<template lang="pug">
.bottom-sheet.br-10.pa-4.width-99.std_white(v-swipe)
  .row.align-center
    .ph-20.grey_medium.pv-1.br-4
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BottomSheet extends Vue {

}
</script>

<style lang="scss" scoped>
.bottom-sheet {
  border: 1px solid var(--grey_medium);
  height: 100%;
  left: 0;
  min-height: 100px;
  position: fixed;
  top: 0;
  z-index: 3;
  cursor: pointer;
}
</style>
