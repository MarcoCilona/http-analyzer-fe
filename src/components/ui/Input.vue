<template lang="pug">
input.transparent.input-custom-style.width-100(@change='$emit("change", $event.target.value)')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Input extends Vue {}
</script>

<style lang="scss" scoped>
.input-custom-style {
  border: none;
  box-shadow: none;
  outline: none;
}
</style>
