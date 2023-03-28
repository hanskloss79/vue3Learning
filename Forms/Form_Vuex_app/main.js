/* Notice the form element and accompanying list markup are wrapped within a single div
element. With Vue template declarations, it’s a must to wrap templates in a single root
element. */

const InputForm = {
  template: `
    <div class="input-form">
      <form @submit="submitForm" class="ui form">
        <div class="field">
          <!-- New Item Input -->
          <label>Nowy element</label>
          <input :value="newItem" @input="onInputChange" name="NEW_ITEM"
           type="text" placeholder="Dodaj element garderoby" />
          <span style="float: right">{{ newItemLength }}/20</span>
          <span style="color: red">{{ fieldErrors.newItem }}</span>
          <span v-if="isNewItemInputLimitExceeded" style="color: red; display: block">
            Musi mieć mniej niż dwadzieścia znaków
          </span>
        </div>
        <div class="field">
          <!-- Email Input -->
          <label>Email</label>
          <input :value="email" name="EMAIL" @input="onInputChange"
            type="text" placeholder="Proszę podać swój email" />
          <span style="color: red">{{ fieldErrors.email }}</span>
        </div>
        <div class="field">
          <label>Priorytet</label>
            <!-- Urgency Dropdown -->
            <select :value="urgency" name="URGENCY" @input="onInputChange"
              class="ui fluid search dropdown">
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
            <!-- Terms and Conditions Checkbox -->
            <input :checked="termsAndConditions" @input="onInputChange"
              name="TERMS_AND_CONDITIONS" type="checkbox">
            <label>Akceptuję zasady i warunki</label>
            <span style="color: red">{{ fieldErrors.termsAndConditions }}</span>
          </div> 
        </div>
        <button v-if="saveStatus === 'SAVING'"
         disabled class="ui button">Zapisywanie</button>
        <button v-if="saveStatus === 'SUCCESS'" 
        :disabled="isNewItemInputLimitExceeded || isNotUrgent"
          class="ui button">Zapisano! Wyślij następne</button>
        <button v-if="saveStatus === 'ERROR'" 
        :disabled="isNewItemInputLimitExceeded || isNotUrgent"
          class="ui button">Zapis nieudany - ponowić?</button>
        <button v-if="saveStatus === 'READY'" 
        :disabled="isNewItemInputLimitExceeded || isNotUrgent"
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
      fieldErrors: {
        newItem: undefined,
        email: undefined,
        urgency: undefined,
        termsAndConditions: undefined
      },
      loading: false,
      saveStatus: 'READY',
    };
  },

  created() {
    this.loading = true;
    this.$store.dispatch('loadItems')
      .then((response) => {
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
      })
  },

  computed: Vuex.mapGetters({
    newItem: 'newItem',
    newItemLength: 'newItemLength',
    isNewItemInputLimitExceeded: 'isNewItemInputLimitExceeded',
    email: 'email',
    urgency: 'urgency',
    isNotUrgent: 'isNotUrgent',
    termsAndConditions: 'termsAndConditions',
    items: 'items',
  }),

  methods: {

    onInputChange(evt) {
      const element = evt.target;
      const value =
        element.name === "TERMS_AND_CONDITIONS"
          ? element.checked
          : element.value;
      this.$store.commit(`UPDATE_${element.name}`, value);
      console.log(element.name);
    },

    submitForm(evt) {
      // We prevent the browser’s default action of submitting the form with preventDefault().      
      evt.preventDefault();

      this.fieldErrors = this.validateForm(this.$store.state.fields);
      /* If the form has field errors upon submission, 
      we return early to prevent apiClient from being called. */
      if (Object.keys(this.fieldErrors).length) return;

      /* If no field errors exist, we create a new array called items which contains the existing
      component items array and the new field.newItem value. */
      const items = [...this.$store.state.items, this.$store.state.fields.newItem];

      // We then use apiClient to begin persisting the new items array with apiClient.saveItems().
      this.saveStatus = 'SAVING';
      /* If apiClient is successful, we update the component data with our new items array, empty
      fields, and saveStatus: 'SUCCESS'. If apiClient is not successful, we leave everything as is
      but set saveStatus to ‘ERROR’. */
      console.log("przed wywołaniem saveItems ze store");
      this.$store.dispatch('saveItems', items)
        .then(() => {
          this.saveStatus = 'SUCCESS';
        })
        .catch((err) => {
          console.log(err);
          this.saveStatus = 'ERROR';
        });
    },

    validateForm(fields) {
      const errors = {};
      if (!this.$store.state.fields.newItem){
        errors.newItem = "Nowy element garderoby wymagany";
      } 
      if (!this.$store.state.fields.email) {
        errors.email = "Email wymagany";
      }
      if (!this.$store.state.fields.urgency) {
        errors.urgency = "Priorytet wymagany";
      }
      if (!this.$store.state.fields.termsAndConditions) {
        errors.termsAndConditions = "Zasady i warunki muszą zostać zaakceptowane";
      }

      if (this.$store.state.fields.email && 
        !this.isEmail(this.$store.state.fields.email)) {
        errors.email = "Niepoprawny email";
      }
      return errors;
    },
    isEmail(email) {
      //regular expression
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    },

  }
}

/* v-model always picks the correct way to update the element, based on the input type it’s
bound to. */

Vue.createApp({
  components: {
    'input-form': InputForm
  }
}).use(store).mount('#Form_Vuex_app');





