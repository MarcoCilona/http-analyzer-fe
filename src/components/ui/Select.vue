<template lang="pug">
select.br-4.fw-600.grey--text.grey_light.ph-3.pv-2.custom-select-style.text-align-center(@change='$emit("selected", $event.target.value)')
  option(v-for='(item, index) in httpMethods', :key='index') {{ item.label }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Select extends Vue {
  httpMethods: any[] = [
    {
      label: 'GET',
      value: 'GET',
    },
    {
      label: 'POST',
      value: 'POST',
    },
    {
      label: 'PUT',
      value: 'PUT',
    },
    {
      label: 'DELETE',
      value: 'DELETE',
    },
    {
      label: 'INFO',
      value: 'INFO',
    },
    {
      label: 'DUMB',
      value: 'DUMB',
    },
  ];

  created() {
    this.$emit('selected', this.httpMethods[0].value);
  }
}
</script>

<style lang="scss" scoped>
.custom-select-style {
  appearance: none;
  border: 0;
  cursor: pointer;
  outline: none;
  text-align-last: center;
  &::-ms-expand {
    display: none;
  }
}
</style>
