/* Notice the form element and accompanying list markup are wrapped within a single div
element. With Vue template declarations, it’s a must to wrap templates in a single root
element. */

const InputForm = {
  template: `
    <div class="input-form">
      <form @submit="submitForm" class="ui form">
        <div class="field">
          <input v-model="newItem" type="text" placeholder="Dodaj element garderoby" />
        </div>
        <button class="ui button">Wyślij</button>
      </form>
      <div class="ui segment">
        <h4 class="ui header">Odzież</h4>
        <ul>
          <li v-for="item in items" class="item">{{ item }}</li>
        </ul>
      </div>
    </div>`,
  data() {
    return {
      newItem: '',
      items: []
    }
  },
  methods: {
    submitForm(evt) {
      this.items.push(this.newItem);
      newItem = '';
      evt.preventDefault();
    }
  }
}

Vue.createApp({
  components: {
    'input-form': InputForm
  }
}).mount('#Input_app')
