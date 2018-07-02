<template>
  <v-layout class="control-panel" column>
    <control-file></control-file>
    <section-edit-chord v-show="activeChordData"></section-edit-chord>
  </v-layout>
</template>

<script>
  import SectionEditChord from './SectionEditChord';
  import ControlFile from './ControlFile';

  export default {
    components: {
      SectionEditChord,
      ControlFile,
    },
    computed: {
      activeChordData() {
        return this.$store.getters.activeChordData;
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
  .control-panel {
    border-left: 2px solid #42A5F5;
    padding-left: 8px;
    width: 35%;
  }
</style>
