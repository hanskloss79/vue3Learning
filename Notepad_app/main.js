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
            this.$emit("add-note", {
                note: this.input,
                timestamp: new Date().toLocaleString(),
            });
            this.input = "";
        },
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
        'input-component': inputComponent
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

