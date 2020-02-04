<template lang="pug">
PageLayout(:share-link='shareLink', :show-bottom-sheet='!!requestId')
  template(#request-form)
    Search(hide-submit-button)
  template(#request-results)
    Results(v-if='requestId !== ""', :id-request='requestId', :id-speed-request='speedRequestId')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// Components
import PageLayout from 'src/components/PageLayout.vue';
import Search from 'src/components/Search.vue';
import Results from './Results.vue';


@Component({
  components: {
    PageLayout,
    Results,
    Search,
  },
})
export default class Detail extends Vue {
  requestId: string = '';
  shareLink?: string = '';

  // For the demo the speedRequest in detail page will be always the same
  speedRequestId: string = '1gsi3i';
  created() {
    this.requestId = this.$route.params.idRequest;
    this.shareLink = `${window.location.href}`;
  }
}
</script>
