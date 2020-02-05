<template lang="pug">
.grey_medium.pa-2.br-4.d-flex.search-bar
  Select(@selected='method = $event')
  Input.mh-4(@change='url = $event')
  Button(v-if='!hideSubmitButton', @send-request='handleSendRequest')
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

// Components
import Button from './ui/Button.vue';
import Input from './ui/Input.vue';
import Select from './ui/Select.vue';

@Component({
  components: {
    Button,
    Input,
    Select,
  },
})
export default class Search extends Vue {
  @Prop({ type: Boolean }) hideSubmitButton?: boolean;
  method: string = '';
  url?: string = '';

  handleSelected($event: any) {
    this.method = $event;
  }

  handleSendRequest() {
    const request: any = {
      method: this.method,
      url: this.url,
    };

    this.$emit('submit', request);
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  width: 90%;
}

@media only screen and (min-width: 425px) {
  .search-bar {
    width: 30%;
  }
}
</style>
