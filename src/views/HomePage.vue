<template lang="pug">
PageLayout(:share-link='shareLink')
  template(#request-form)
    Search(@submit='handleSubmit')
  template(#request-status)
    .column
      .text-align-center.fs-45.fw-700 200
      div Everything is fine!
  template(#request-results)
    ResultCard(title='Url info')
      template(#content)
        ResultCardRow(title='Domain', value='www.google.it')
        ResultCardRow(title='Scheme', value='HTTP')
        ResultCardRow(title='Path', value='home')
    ResultCard.ml-5(title='Url info')
      template(#content)
        ResultCardRow(title='Domain', value='www.google.it')
        ResultCardRow(title='Scheme', value='HTTP')
        ResultCardRow(title='Path', value='home')
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import { Component, Vue } from 'vue-property-decorator';

// Components
import PageLayout from 'src/components/PageLayout.vue';
import Search from 'src/components/Search.vue';
import ResultCard from 'src/components/ui/ResultCard.vue';
import ResultCardRow from 'src/components/ui/ResultCardRow.vue';

// Repository
import repository from 'src/repositories/repository';

@Component({
  components: {
    ResultCard,
    PageLayout,
    Search,
    ResultCardRow,
  },
})
export default class HomePage extends Vue {
  shareLink?: string = '';
  webRequest?: any = {
    status: 200,
    errors: {},
    data: {
      url: '',
      response: {
      },
      request: {
      },
    },
  };
  results: any = {};
  handleSubmit($event: any) {
    this.prepareWebRequest($event);
    repository.submitRequest(this.webRequest).then((response: AxiosResponse<any>) => {
      const id: string = response.data.uri.split(/\//).reverse()[0];
      this.shareLink = `${window.location.origin}/#/${id}`;
      this.retrieveRequest(id);
    });
  }
  prepareWebRequest(request: any) {
    this.webRequest = {
      status: 200,
      errors: {},
      data: {
        url: request.url,
        response: {
          http_version_string: 'HTTP/1.1',
          reason: 'OK',
          request_date: 'Thu, 23 Jan 2020',
          request_server: 'gws',
          status_code: 200,
          url: 'http://goole.it',
        },
        request,
      },
    };
  }
  retrieveRequest(id: string) {
    repository.getRequest(id).then((response: AxiosResponse<any>) => {
      this.results = response.data;
    });
  }
}
</script>
