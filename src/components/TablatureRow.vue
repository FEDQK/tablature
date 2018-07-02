<template>
  <v-layout column>
    <chord-list :chordList="tablatureRowData.chords" :rowId="tablatureRowData.id"></chord-list>
    <v-flex class="row-text-container">
      <v-text-field class="row-text" @input="updateText" :value="tablatureRowData.text"></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
  import ChordList from './Chord/ChordList';

  export default {
    components: {
      ChordList,
    },
    props: {
      tablatureRowData: {
        type: Object,
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
      updateText(newText) {
        this.$store.dispatch('updateTablatureRow', {
          id: this.tablatureRowData.id,
          text: newText,
        });
      },
    },
  };

</script>

<style scoped>
  .row-text {
    padding-top: 5px;
  }
  .row-text-container {
    margin-right: 56px;
  }
</style>