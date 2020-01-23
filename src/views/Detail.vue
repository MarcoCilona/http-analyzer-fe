<template lang="pug">
PageLayout(:share-link='shareLink')
  template(#request-form)
    Search(hide-submit-button)
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
import PageLayout from '../components/PageLayout.vue';
import Search from '../components/Search.vue';
import ResultCard from '../components/ui/ResultCard.vue';
import ResultCardRow from '../components/ui/ResultCardRow.vue';

// Repository
import repository from '../repositories/repository';

@Component({
  components: {
    PageLayout,
    ResultCard,
    ResultCardRow,
    Search,
  },
})
export default class Detail extends Vue {
  requestId: string = '';
  shareLink?: string = '';
  created() {
    this.requestId = this.$route.params.idRequest;
    this.retrieveRequest();
    this.shareLink = `${window.location.origin}/${this.requestId}`;
  }
  retrieveRequest() {
    repository.getRequest(this.requestId).then((response: AxiosResponse<any>) => {
      console.log(response.data);
    });
  }
}
</script>
