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
          <span style="float: right">{{ fields.newItem.length }}/20</span>
          <span style="color: red">{{ fieldErrors.newItem }}</span>
          <span v-if="isNewItemInputLimitExceeded" style="color: red; display: block">
            Musi mieć mniej niż dwadzieścia znaków
          </span>
        </div>
        <div class="field">
          <label>Email</label>
          <input v-model="fields.email" type="text" placeholder="Proszę podać swój email" />
          <span style="color: red">{{ fieldErrors.email }}</span>
        </div>
        <div class="field">
          <label>Priorytet</label>
            <select v-model="fields.urgency" class="ui fluid search dropdown">
              <option disabled value="">Proszę wybrać jedną opcję</option>
              <option>Nieistotne</option>
              <option>Umiarkowanie pilne</option>
              <option>Pilne</option>
            </select>
            <span style="color: red">{{ fieldErrors.urgency }}</span>
            <span v-if="isNotUrgent" style="color: red; display: block">
            Proszę wybrać Umiarkowanie pilne lub Pilne
          </span>
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input v-model="fields.termsAndConditions" type="checkbox">
            <label>Akceptuję zasady i warunki</label>
            <span style="color: red">{{ fieldErrors.termsAndConditions }}</span>
          </div> 
        </div>
        <button :disabled="isNewItemInputLimitExceeded || isNotUrgent"
        class="ui button">Wyślij</button>
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
        termsAndConditions: false,
      },
      fieldErrors: {
        newItem: undefined,
        email: undefined,
        urgency: undefined,
        termsAndConditions: undefined
      },
      items: []
    };
  },

  computed: {
    isNewItemInputLimitExceeded() {
      return this.fields.newItem.length >= 20;
    },

    isNotUrgent() {
      return this.fields.urgency === 'Nieistotne';
    }
  },

  methods: {
    submitForm(evt) {
      evt.preventDefault();

      this.fieldErrors = this.validateForm(this.fields);
      if (Object.keys(this.fieldErrors).length) return;
      this.items.push(this.fields.newItem);
      this.fields.newItem = '';
      this.fields.email = '';
      this.fields.urgency = '';
      this.fields.termsAndConditions = false;
    },
    validateForm(fields) {
      const errors = {};
      if (!fields.newItem) errors.newItem = "Nowy element garderoby wymagany";
      if (!fields.email) errors.email = "Email wymagany";
      if (!fields.urgency) errors.urgency = "Priorytet wymagany";
      if (!fields.termsAndConditions) {
        errors.termsAndConditions = "Zasady i warunki muszą zostać zaakceptowane";
      }


      if (fields.email && !this.isEmail(fields.email)) {
        errors.email = "Niepoprawny email";
      }
      return errors;
    },
    isEmail(email) {
      //regular expression
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
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
