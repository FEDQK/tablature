<template>
  <v-container class="list-container">
    <tablature-row column v-for="(tablatureRowData, key) in tablatureData" :tablatureRowData="tablatureRowData" :key="key"></tablature-row>
  </v-container>
</template>

<script>
  import TablatureRow from './TablatureRow';

  export default {
    components: {
      TablatureRow,
    },
    computed: {
      tablatureData() {
        return this.$store.getters.tablatureData;
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
  .list-container {
    padding: 0;
  }
</style>