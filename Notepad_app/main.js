const emitter = mitt();


// znaczniki w templacie na stronę HTML
const inputComponent = {
    template: `<input :placeholder="placeholder" v-model="input" 
            v-on:keyup.enter="monitorEnterKey" class="input is-small" type="text" />`,
    props: ["placeholder"],
    emits: ["add-note"],
    data() {
        return {
            input: "",
        };
    },
    methods: {
        monitorEnterKey() {
            emitter.emit('add-note', {
                note: this.input,
                timestamp: new Date().toLocaleString(),
            });
            this.input = "";
        },
    },
};

// komponent licznik notatek
const noteCountComponent = {
    template: `<div class="note-count">Liczba notatek: <strong>{{ noteCount }}</strong></div>`,
    data() {
        return {
            noteCount: 0,
        };
    },
    // dodajemy nasłuch dla zdarzenia związanego z dodaniem notatki i zwiększamy licznik notatek o 1
    created() {
        emitter.on('add-note', event => this.noteCount++);
    },
};

const notepad = {
    data() {
        return {
            notes: [],
            timestamps: [],
            placeholder: 'Wprowadź notatkę'
        }
    },
    // komponent Vue - przypisanie do znacznika HTML
    components: {
        'input-component': inputComponent,
        'note-count-component': noteCountComponent,
    },

    created() {
        emitter.on("add-note", (event) => this.addNote(event));
    },
    methods: {
        // dodanie notatki do listy
        addNote(event){
            this.notes.push(event.note);
            this.timestamps.push(event.timestamp);
        }
    }
};

Vue.createApp(notepad).mount('#notepad');

