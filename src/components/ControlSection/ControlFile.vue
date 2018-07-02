<template>
    <v-flex class="buttons-file-control">
      <label for="file-open" class="custom-file-open">
        <v-btn class="button-file-open" color="info">Open</v-btn>
      </label>
      <input id="file-open" type="file" @change="onOpenFile"/>
      <v-btn color="success" @click="onSaveTablature">Save</v-btn>
    </v-flex>
</template>

<script>
  import FileSaver from 'file-saver';

  export default {
    components: {
    },
    computed: {
      tablatureData() {
        return this.$store.getters.tablatureData;
      },
    },
    data() {
      return {
        tablatureText: '',
        newTablatureData: [],
        widthChord: 51,
        paddingChord: 17,
        coefFirstChord: 0.16,
        coefChord: 0.15,
      };
    },
    methods: {
      onSaveTablature() {
        this.createTablatureText();
        const blob = new Blob([this.tablatureText], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(blob, 'tablature.txt');
        this.tablatureText = '';
      },
      createTablatureText() {
        this.tablatureData.forEach((tablatureRow, rowIndex) => {
          const newChords = tablatureRow.chords.slice().sort(this.sortChords);
          this.createRowChords(newChords, rowIndex);
          this.tablatureText += `\r\n${tablatureRow.text}`;
        });
      },
      sortChords(current, next) {
        return current.x - next.x;
      },
      addSpace(count) {
        for (let i = 0; i < count; i += 1) {
          this.tablatureText += ' ';
        }
      },
      createRowChords(arrayChords, rowIndex) {
        if (rowIndex !== 0) {
          this.tablatureText += '\r\n';
        }
        arrayChords.forEach((chord, index) => {
          this.addSpace(this.calcCountSpace(index, chord, arrayChords));
          this.tablatureText += chord.text;
        });
      },
      calcCountSpace(index, chord, arrayChords) {
        if (index !== 0) {
          return Math.round(
            (chord.x - arrayChords[index - 1].x - (this.widthChord - this.paddingChord))
            * this.coefChord);
        }
        return Math.round((chord.x + this.paddingChord) * this.coefFirstChord);
      },
      onOpenFile(event) {
        this.$store.commit('setLoading', true);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.createTablatureData(reader.result);
          this.$store.dispatch('uploadTablatureData', this.newTablatureData);
        };
        reader.readAsText(file);
        this.newTablatureData = [];
      },
      createTablatureData(data) {
        const arrRows = data.split('\r\n');
        const lengthTablature = Math.round(arrRows.length / 2);
        for (let i = 0; i < lengthTablature; i += 1) {
          this.createTablatureRowData(arrRows, i);
        }
      },
      createTablatureRowData(arrRows, index) {
        this.newTablatureData.push({
          id: this.generateId(),
          text: arrRows[(index * 2) + 1],
          chords: this.createTablatureChordsData(arrRows[index * 2]),
        });
      },
      createTablatureChordsData(rowChords) {
        if (rowChords.length > 0) {
          const arraySpace = rowChords.match(/\s+/g).map(space => space.length);
          const arrayChords = rowChords.match(/\w+/g);
          const chords = [];
          arrayChords.forEach((chordText, index) => {
            chords.push({
              id: this.generateId(),
              text: chordText,
              x: this.calcPositionChord(arraySpace, index, chords),
            });
          });
          return chords;
        }
        return [];
      },
      generateId() {
        return `_${Math.random().toString(36).substr(2, 9)}`;
      },
      calcPositionChord(arraySpace, index, chords) {
        if (index !== 0) {
          return Math.floor(
            (arraySpace[index] / this.coefChord) + chords[index - 1].x
            + (this.widthChord - this.paddingChord));
        }
        return Math.floor((arraySpace[index] / this.coefFirstChord) - this.paddingChord);
      },
    },
  };

</script>

<style scoped>
  .buttons-file-control {
    flex: 0;
    text-align: center;
  }
  input[type="file"] {
    display: none;
  }
  .custom-file-open {
    display: inline-flex;
    cursor: pointer;
  }
  .button-file-open {
    pointer-events: none;
  }
</style>
