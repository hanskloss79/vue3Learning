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
  template: `<input placeholder='Wprowadź notatkę' v-model="input"
    @keyup.enter="monitorEnterKey" class="input is-small" type="text" />`,
  data() {
    return {
      input: '',
    };
  },
  methods: {
    monitorEnterKey() {
      this.$store.dispatch('addNote', this.input);
      this.$store.dispatch('addTimeStamp', new Date().toLocaleString());
      this.input = ''; // ustawiamy input jako pusty
    }
  }
}

// komponent licznik notatek
const noteCountComponent = {
  template: `<div class="note-count">Liczba notatek: <strong>{{ noteCount }}</strong></div>`,
  computed: {
    noteCount() {
      return this.$store.getters.getNoteCount;
    }
  },

};


const notepad = Vue.createApp({
  computed: {
    notes() {
      return this.$store.getters.getNotes;
    },
    timestamps() {
      return this.$store.getters.getTimeStamps;
    },
  },

  components: {
    'input-component': inputComponent,
    'note-count-component': noteCountComponent,
  },
});

notepad.use(store);
notepad.mount("#notepad");

