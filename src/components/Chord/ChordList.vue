<template>
  <v-layout>
    <v-flex class="chords-container">
      <chord v-for="(chordData, key) in chordList" :key="key" :chordData="chordData" :rowId="rowId"></chord>
    </v-flex>
    <v-btn class="button-chord-add" small fab dark color="indigo" @click="addChord">
      <v-icon dark>add</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
  import Chord from './Chord';

  export default {
    components: {
      Chord,
    },
    props: {
      chordList: {
        type: Array,
        required: true,
      },
      rowId: {
        type: String,
        required: true,
      },
    },
    computed: {
    },
    data() {
      return {
      };
    },
    methods: {
      addChord() {
        this.$store.dispatch('createChord', this.rowId);
      },
    },
  };

</script>

<style scoped>
  .chords-container {
    display: block;
    position: relative;
    height: 42px;
  }
  .button-chord-add {
    margin: 0 8px;
  }
</style>