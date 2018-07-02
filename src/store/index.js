import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tablatureData: [
      {
        id: '1',
        chords: [],
        text: '',
      },
      {
        id: '2',
        chords: [],
        text: '',
      },
      {
        id: '3',
        chords: [],
        text: '',
      },
      {
        id: '4',
        chords: [],
        text: '',
      },
      {
        id: '5',
        chords: [],
        text: '',
      },
      {
        id: '6',
        chords: [],
        text: '',
      },
    ],
    activeChord: null,
    loading: false,
  },
  actions: {
    updateChordData({ commit }, payload) {
      commit('updateChord', payload);
    },
    updateTablatureRow({ commit }, payload) {
      commit('updateTablatureRow', payload);
    },
    createChord({ commit }, rowId) {
      const chord = {
        id: String(Date.now()),
        text: 'text',
        x: 0,
      };
      commit('createChord', { ...chord, rowId });
    },
    updateActiveChord({ commit }, payload) {
      commit('updateActiveChord', payload);
    },
    uploadTablatureData({ commit }, payload) {
      commit('uploadTablatureData', payload);
      commit('setLoading', false);
    },
    deleteChord({ commit }) {
      // fix for vue-draggable-resizable
      commit('setLoading', true);
      setTimeout(() => {
        commit('deleteChord');
        commit('setLoading', false);
      }, 0);
    },
  },
  mutations: {
    updateChord(state, payload) {
      const tablatureRow = state.tablatureData
        .find(currentTablatureRow => currentTablatureRow.id === payload.rowId);
      const chord = tablatureRow.chords
        .find(currentChord => currentChord.id === payload.id);
      if (payload.text) {
        chord.text = payload.text;
      }
      if (payload.x) {
        chord.x = payload.x;
      }
    },
    updateTablatureRow(state, payload) {
      const tablatureRow = state.tablatureData
        .find(currentTablatureRow => currentTablatureRow.id === payload.id);
      if (payload.text) {
        tablatureRow.text = payload.text;
      }
    },
    createChord(state, payload) {
      const tablatureRow = state.tablatureData
        .find(currentTablatureRow => currentTablatureRow.id === payload.rowId);
      const newPayload = payload;
      delete newPayload.rowId;
      tablatureRow.chords.push(newPayload);
    },
    updateActiveChord(state, payload) {
      state.activeChord = payload;
    },
    uploadTablatureData(state, payload) {
      state.tablatureData = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    deleteChord(state) {
      const tablatureRow = state.tablatureData
        .find(currentTablatureRow => currentTablatureRow.id === state.activeChord.rowId);
      tablatureRow.chords.find((currentChord, index) => {
        if (currentChord.id === state.activeChord.id) {
          tablatureRow.chords.splice(index, 1);
          state.activeChord = null;
          return currentChord;
        }
        return false;
      });
    },
  },
  getters: {
    tablatureData(state) {
      return state.tablatureData;
    },
    activeChordData(state) {
      return state.activeChord;
    },
    loading(state) {
      return state.loading;
    },
  },
});
export default store;
