<template>
  <vue-draggable-resizable class="chord" :w="51" :x="chordData.x" :parent="true" axis="x" :resizable="false" @dragstop="onDrop">
    <v-chip label @click="activateChord">{{chordData.text}}</v-chip>
  </vue-draggable-resizable>
</template>

<script>
  import VueDraggableResizable from 'vue-draggable-resizable';

  export default {
    components: {
      VueDraggableResizable,
    },
    props: {
      chordData: {
        type: Object,
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
      onDrop(x) {
        this.$store.dispatch('updateChordData', {
          rowId: this.rowId,
          id: this.chordData.id,
          text: this.chordData.text,
          x,
        });
      },
      activateChord() {
        this.$store.dispatch('updateActiveChord', { ...this.chordData, rowId: this.rowId });
      },
    },
  };

</script>

<style scoped>
  .chord {
    user-select: none;
  }
</style>