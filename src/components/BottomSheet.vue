<template lang="pug">
.bottom-sheet.br-10.pa-4.width-99.std_white(v-swipe)
  .row.align-center
    .ph-20.grey_medium.pv-1.br-4
  slot(name='content')
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
  display: block;
  height: 100%;
  left: 0;
  min-height: 100px;
  overscroll-behavior: none;
  position: fixed;
  top: 0;
  width: 98%;
  z-index: 3;
  cursor: pointer;
}

@media only screen and (min-width: 425px) {
  .bottom-sheet {
    display: none;
  }
}
</style>
