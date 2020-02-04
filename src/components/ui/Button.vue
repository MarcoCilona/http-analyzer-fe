<template lang="pug">
button.blue_light.std_white--text.pv-2.ph-4.br-4.button-custom-style(@click='$emit("send-request")')
  span Send
  span
    i.fas.fa-search
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {

}
</script>

<style lang="scss" scoped>
.button-custom-style {
  display: inline-table;
  border: none;
  box-shadow: none;
  cursor: pointer;
  outline: none;
  span:first-child {
    display: none;
  }
}

@media only screen and (min-width: 425px) {
  .button-custom-style {
    span:first-child {
      display: block;
    }
    span:last-child {
      display: none;
    }
  }
}

</style>
