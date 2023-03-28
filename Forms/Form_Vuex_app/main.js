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
        <button v-if="saveStatus === 'SAVING'" disabled class="ui button">Zapisywanie</button>
        <button v-if="saveStatus === 'SUCCESS'" :disabled="isNewItemInputLimitExceeded || isNotUrgent"
          class="ui button">Zapisano! Wyślij następne</button>
        <button v-if="saveStatus === 'ERROR'" :disabled="isNewItemInputLimitExceeded || isNotUrgent"
          class="ui button">Zapis nieudany - ponowić?</button>
        <button v-if="saveStatus === 'READY'" :disabled="isNewItemInputLimitExceeded || isNotUrgent"
          class="ui button">Wyślij</button>
      </form>
      <div class="ui segment">
        <h4 class="ui header">Odzież</h4>
        <ul>
          <div v-if="loading" class="ui active inline loader"></div>
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
      items: [],
      loading: false,
      saveStatus: 'READY',
    };
  },

  created() {
    this.loading = true;
    apiClient.loadItems().then((items) => {
      this.items = items;
      this.loading = false;
    });
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
      // We prevent the browser’s default action of submitting the form with preventDefault().      
      evt.preventDefault();

      this.fieldErrors = this.validateForm(this.fields);
      /* If the form has field errors upon submission, 
      we return early to prevent apiClient from being called. */
      if (Object.keys(this.fieldErrors).length) return;

      /* If no field errors exist, we create a new array called items which contains the existing
      component items array and the new field.newItem value. */
      const items = [...this.items, this.fields.newItem];

      // We then use apiClient to begin persisting the new items array with apiClient.saveItems().
      this.saveStatus  = 'SAVING';
      /* If apiClient is successful, we update the component data with our new items array, empty
      fields, and saveStatus: 'SUCCESS'. If apiClient is not successful, we leave everything as is
      but set saveStatus to ‘ERROR’. */

      apiClient.saveItems(items)
        .then(() => {
          this.items = items;
          this.fields.newItem = '';
          this.fields.email = '';
          this.fields.urgency = '';
          this.fields.termsAndConditions = false;
          this.saveStatus = 'SUCCESS';
        })
        .catch((err) => {
          console.log(err);
          this.saveStatus = 'ERROR';
        });
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

/* apiClient is a simple object that holds the responsibility in simulating asynchronous loading and
saving. In the code example above, we can see that the “load” and “save” methods are thin async
wrappers around localStorage that we’ll use to retrieve and persist data. */
let apiClient = {
  loadItems: function () {
    return {
      then: function (cb) {
        setTimeout(() => {
          cb(JSON.parse(localStorage.items || '[]'));
        }, 1000);
      },
    };
  },

  saveItems: function (items) {
    const success = !!(this.count++ % 2);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!success) return reject({ success });

        localStorage.items = JSON.stringify(items);
        return resolve({ success });
      }, 1000);
    });
  },

  count: 1,
}


Vue.createApp({
  components: {
    'input-form': InputForm
  }
}).mount('#Form_Vuex_app');





