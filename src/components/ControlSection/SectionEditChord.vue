<template>
  <v-layout column>
    <v-flex class="edit-container">
      <v-text-field label="Chord text" class="chord-text" @input="updateText" :value="activeChordData ? activeChordData.text : ''"></v-text-field>
      <v-btn color="error" @click="deleteChord">Delete</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>

  export default {
    components: {
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
      updateText(newText) {
        this.$store.dispatch('updateChordData', {
          id: this.activeChordData.id,
          rowId: this.activeChordData.rowId,
          text: newText,
        });
      },
      deleteChord() {
        this.$store.dispatch('deleteChord');
      },
    },
  };

</script>

<style scoped>
  .chord-text >>> .input-group__details {
    min-height: 0;
  }
  .edit-container {
    text-align: center;
  }
</style>
