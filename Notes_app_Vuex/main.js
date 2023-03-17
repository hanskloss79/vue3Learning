const inputComponent = {
  template: `<input placeholder='Wprowadź notatkę' class="input is-small" type="text" />`,
}

const notepad = {
  components: {
    'input-component': inputComponent
  }
}

Vue.createApp(notepad).mount('#notepad')
