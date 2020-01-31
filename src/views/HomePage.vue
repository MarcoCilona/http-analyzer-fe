<template lang="pug">
PageLayout(:share-link='shareLink')
  template(#request-form)
    Search(@submit='handleSubmit')
  template(v-if='requestId', #request-status)
    .column
      .text-align-center.fs-45.fw-700 {{ status }}
      div {{ statusMessage }}
  template(v-if='requestId', #request-results)
    Results(:id-request='requestId')
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import { Component, Vue } from 'vue-property-decorator';

import { generateRequest } from 'src/utils';

// Components
import PageLayout from 'src/components/PageLayout.vue';
import Results from 'src/views/Results.vue';
import Search from 'src/components/Search.vue';

// Repository
import repository from 'src/repositories/repository';

@Component({
  components: {
    PageLayout,
    Results,
    Search,
  },
})
export default class HomePage extends Vue {
  requestId?: string = '';
  shareLink?: string = '';
  status?: number = 0;
  webRequest?: any = {
    data: {
      request: {
      },
      response: [],
      url: '',
    },
    errors: {},
    status: 200,
  };

  get statusMessage() {
    switch (this.status) {
      case 200:
        return 'Everything is fine!';
      case 204:
        return 'Resource not found!';
      case 404:
        return 'Not found!';
      case 500:
        return 'Looks like something went wrong!';
      default:
        return 'No message provided!';
    }
  }

  handleSubmit($event: any) {
    this.prepareWebRequest($event);
    repository.submitRequest(this.webRequest).then((response: AxiosResponse<any>) => {
      [this.requestId] = response.data.uri.split(/\//).reverse();
      this.shareLink = `${window.location.href}${this.requestId}`;
    });
  }

  prepareWebRequest(request: any) {
    this.webRequest = generateRequest(request);
    this.status = this.webRequest.status;
  }
}
</script>
