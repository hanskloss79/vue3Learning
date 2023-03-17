// to wszystko związane z Vuex
// definiujemy nowy obiekt stanu aplikacji - state object
const state = {
  notes: [],
  timestamps: []
};
const mutations = {
  ADD_NOTE(state, payload) {
    let newNote = payload;
    state.notes.push(newNote);
    // można w jednej linijce
  },
  ADD_TIMESTAMP(state, payload) {
    let newTimeStamp = payload;
    state.timestamps.push(newTimeStamp);
  },
};
const actions = {
  addNote(context, payload) {
    context.commit('ADD_NOTE', payload);
  },
  addTimeStamp(context, payload) {
    context.commit('ADD_TIMESTAMP', payload);
  },
};
/*
const getters ={
    getNotes(state) {
      return state.notes;
    },
    getTimeStamps(state) {
      return state.timestamps;
    },
    getNoteCount(state) {},
      return state.notes.length;
 };
 */
// to samo w postaci funkcji strzałkowej
const getters = {
  getNotes: state => state.notes,
  getTimeStamps: state => state.timestamps,
  getNoteCount: state => state.notes.length,
};

// In ES6-land, adding an object with just a command is a convenient way to define both a
// key and a value.
const store = Vuex.createStore({
  state,
  mutations,
  actions,
  getters
});

const inputComponent = {
  template: `<input placeholder='Wprowadź notatkę' class="input is-small" type="text" />`,
}

const notepad = Vue.createApp({
  components: {
    'input-component': inputComponent
  }
});

notepad.use(store);
notepad.mount("#notepad");

