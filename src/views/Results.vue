<template lang="pug">
.row(v-if='results && speedResults')
  ResultCard(title='Url info')
    template(#content)
      ResultCardRow(title='Domain', :value='results.data.request.domain')
      ResultCardRow(title='Scheme', :value='results.data.request.scheme')
      ResultCardRow(title='Path', :value='results.data.request.path')
  ResultCard.ml-5(v-for='(response, index) in results.data.response', :key='index', title='Response')
    template(#content)
      ResultCardRow(hide-title, :value='response.http_version_string + " " + response.status_code')
      ResultCardRow(hide-title, :value='"Date: " + response.request_date')
      ResultCardRow(hide-title, :value='"Server: " + response.request_server')
  BottomSheet
    template(#content)
      .mt-10.ph-5.fs-24.grey--text.fw-700
        .row.mb-10 Timing analysis
        Speedometer(:value='speedResults.page_load', :key='speedResults.page_load')
        .row.mt-2.align-center Page load
        .row.mt-2.align-center.black_light--text {{ speedResults.page_load / 1000 }}s
        Speedometer(:value='speedResults.first_interaction', :key='speedResults.first_interaction')
        .row.mt-2.align-center First interaction
        .row.mt-2.align-center.black_light--text {{ speedResults.first_interaction / 1000 }}s
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
import ResultCard from 'src/components/ResultCard.vue';
import ResultCardRow from 'src/components/ResultCardRow.vue';
import Speedometer from 'src/components/Speedometer.vue';

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
  @Prop() idSpeedRequest!: string;

  results: any = null;
  speedResults: any = null;

  created() {
    repository.getRequest(this.idRequest).then((response: AxiosResponse<any>) => {
      this.results = response.data;
    });

    repository.getSpeed(this.idSpeedRequest).then((response: AxiosResponse<any>) => {
      this.speedResults = response.data;
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
