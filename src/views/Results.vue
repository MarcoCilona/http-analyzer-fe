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
  BottomSheet
    template(#content)
      .mt-10.ph-5.fs-24.grey--text.fw-700
        .row.mb-10 Timing analysis
        Speedometer(:value='results.data.page_load', key=0)
        .row.mt-2.align-center Page load
        .row.mt-2.align-center.black_light--text {{ results.data.page_load / 1000 }}s
        Speedometer(:value='results.data.first_interaction', key=1)
        .row.mt-2.align-center First interaction
        .row.mt-2.align-center.black_light--text {{ results.data.first_interaction / 1000 }}s
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import {
  Component, Prop, Vue, Watch
} from 'vue-property-decorator';

// Repositories
import repository from 'src/repositories/repository';

// Components
import BottomSheet from 'src/components/BottomSheet.vue';
import ResultCard from 'src/components/ui/ResultCard.vue';
import ResultCardRow from 'src/components/ui/ResultCardRow.vue';
import Speedometer from 'src/components/ui/Speedometer.vue';

@Component({
  components: {
    BottomSheet,
    ResultCard,
    ResultCardRow,
    Speedometer
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

  @Watch('idRequest')
  updateResults() {
    repository.getRequest(this.idRequest).then((response: AxiosResponse<any>) => {
      this.results = response.data;
    });
  }
}
</script>
