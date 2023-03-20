const InputForm = { 
  template: `
    <div class="input-form">
      <form @submit="submitForm" class="ui form">
        <div class="field">
          <input ref="newItem" type="text" placeholder="Dodaj element garderoby" />
        </div>
        <button class="ui button">Wyślij</button>
      </form>
    </div>`,
  methods: {
    submitForm(evt) {
      evt.preventDefault();
      console.log(this.$refs.newItem.value)
    }
  }
}

Vue.createApp({
  components: {
    'input-form': InputForm
  }
}).mount('#Input_app')
