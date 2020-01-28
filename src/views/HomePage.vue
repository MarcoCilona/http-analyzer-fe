<template lang="pug">
PageLayout(:share-link='shareLink', :show-bottom-sheet='!!requestId')
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
    const randomStatusCode: number = Math.random();
    this.status = 200;
    if (randomStatusCode < 0.3) {
      this.status = 500;
    } else if (randomStatusCode < 0.6) {
      this.status = 404;
    }
    this.webRequest = {
      data: {
        request: {
          domain: request.url,
          method: request.method,
          path: request.url.split(/\//)[1],
          scheme: 'HTTP',
        },
        response: [{
          http_version_string: 'HTTP/1.1',
          reason: 'OK',
          request_date: 'Thu, 23 Jan 2020',
          request_server: 'gws',
          status_code: this.status,
          url: request.url,
        }],
        url: request.url,
      },
      errors: {},
      status: this.status,
    };
  }
}
</script>
