// znaczniki w templacie na stronę HTML
const inputComponent = {
    template: `<input class="input is-small" type="text" />`
}

// komponent Vue - przypisanie do znacznika HTML
const notepad = {
    components: {
        'input-component': inputComponent
    }
}

Vue.createApp(notepad).mount('#notepad');

