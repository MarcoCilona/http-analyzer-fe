<template lang="pug">
.row(v-if='results')
  ResultCard(title='Url info')
    template(#content)
      ResultCardRow(title='Domain', :value='results.data.request.domain')
      ResultCardRow(title='Scheme', :value='results.data.request.scheme')
      ResultCardRow(title='Path', :value='results.data.request.path')
  ResultCard.ml-5(v-for='(response, index) in results.data.response', :key='index', title='Url info')
    template(#content)
      ResultCardRow(hide-title, :value='response.http_version_string + " " + response.status_code')
      ResultCardRow(hide-title, :value='"Date: " + response.request_date')
      ResultCardRow(hide-title, :value='"Server: " + response.request_server')
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import { Component, Prop, Vue } from 'vue-property-decorator';

// Repositories
import repository from 'src/repositories/repository';

// Components
import ResultCard from 'src/components/ui/ResultCard.vue';
import ResultCardRow from 'src/components/ui/ResultCardRow.vue';

@Component({
  components: {
    ResultCard,
    ResultCardRow
  }
})
export default class Results extends Vue {
  @Prop() idRequest!: string;

  results: any = null;

  created() {
    repository.getRequest(this.idRequest).then((response: AxiosResponse<any>) => {
      this.results = response.data;
    });
  }
}
</script>
