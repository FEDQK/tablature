<template>
  <v-container class="main-container">
    <v-layout row>
      <tablature-list v-if="!loading"></tablature-list>
      <v-container class="progress-container" v-if="loading">
        <v-layout>
          <v-flex xs12 class="text-xs-center">
            <v-progress-circular
              indeterminate
              class="primary--text"
              :width="7"
              :size="70"></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-container>
      <control-section></control-section>
    </v-layout>
  </v-container>
</template>

<script>
  import TablatureList from './TablatureList';
  import ControlSection from './ControlSection/ControlSection';

  export default {
    components: {
      TablatureList,
      ControlSection,
    },
    computed: {
      loading() {
        return this.$store.getters.loading;
      },
    },
    data() {
      return {
      };
    },
    methods: {
    },
  };

</script>

<style scoped>
  .main-container {
    max-width: 900px;
  }
  .progress-container {
    padding: 0;
  }
  * >>> .btn {
    font-size: 16px;
  }
</style>
