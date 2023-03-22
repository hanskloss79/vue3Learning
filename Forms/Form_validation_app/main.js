/* Notice the form element and accompanying list markup are wrapped within a single div
element. With Vue template declarations, it’s a must to wrap templates in a single root
element. */

const InputForm = {
  template: `
    <div class="input-form">
      <form @submit="submitForm" class="ui form">
        <div class="field">
          <label>Nowy element</label>
          <input v-model="fields.newItem" type="text" placeholder="Dodaj element garderoby" />
        </div>
        <div class="field">
          <label>Email</label>
          <input v-model="fields.email" type="text" placeholder="Proszę podać swój email" />
        </div>
        <div class="field">
          <label>Priorytet</label>
            <select v-model="fields.urgency" class="ui fluid search dropdown">
              <option disabled value="">Proszę wybrać jedną opcję</option>
              <option>Nieistotne</option>
              <option>Umiarkowanie pilne</option>
              <option>Pilne</option>
            </select>
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input v-model="fields.termsAndCoditions" type="checkbox">
            <label>Akceptuję zasady i warunki</label>
          </div>
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
      fields: {
        newItem: '',
        email: '',
        urgency: '',
        termsAndCoditions: false,
      },
      items: []
    };
  },
  methods: {
    submitForm(evt) {
      this.items.push(this.fields.newItem);
      newItem = '';
      evt.preventDefault();
    }
  }
}

/* v-model always picks the correct way to update the element, based on the input type it’s
bound to. */

Vue.createApp({
  components: {
    'input-form': InputForm
  }
}).mount('#Multi_app')
