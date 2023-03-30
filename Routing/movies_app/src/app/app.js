import mitt from 'mitt';

// noty wydawnicze o filmach
// blurb - a short description of a book, movie, or other product written 
// for promotional purposes and appearing on the cover of a book or in an advertisement
const DunkirkBlurb = {
  name: 'dunkirk-blurb',
  template:
  `<div>
    <h2>Dunkierka</h2>
    <p class="movies__description">
      Niesamowita ewakuacja żołnierzy alianckich z Belgii, Wielkiej Brytanii, Kanady i Francji,
       którzy zostali odcięci i otoczeni przez armię niemiecką z plaż i portu Dunkierki
        we Francji w czasie II wojny światowej - Bitwa o Francję.
    </p>
  </div>`
};
const InterstellarBlurb = {
  name: 'interstellar-blurb',
  template: 
  `<div>
    <h2>Interstellar</h2>
    <p class="movies__description">
    Interstellar to kronika przygód grupy odkrywców, którzy wykorzystują nowo odkryty 
    tunel czasoprzestrzenny, aby przekroczyć ograniczenia ludzkich podróży kosmicznych 
    i pokonać ogromne odległości związane z podróżą międzygwiezdną.
    </p>
  </div>`
};
const TheDarkKnightRisesBlurb = {
  name: 'the-dark-knight-rises-blurb',
  template:
  `<div>
    <h2>The Dark Knight Rises</h2>
    <p class="movies__description">
    Batman spotyka tajemniczą Selinę Kyle i nikczemnego Bane'a, nowego przywódcę terrorystów,
     który przytłacza najlepszych w Gotham. Mroczny Rycerz powraca, by chronić miasto, 
     które uczyniło go wrogiem.
    </p>
  </div>`
};
// routes array
const routes = [
  {
    path: '/',
    component: {
      name: 'index-blurb',
      template: `<h2>Wybierz film Christophera Nolana!</h2>`
    }
  },
  {path: '/dunkirk', component: DunkirkBlurb},
  {path: '/interstellar', component: InterstellarBlurb},
  {path: '/the-dark-knight-rises', component: TheDarkKnightRisesBlurb},
];

const emitter = mitt();

// nasłuch do zdarzeń związanych z przechodzeniem do poprzedniej/następnej strony
window.addEventListener('popstate', () => {
  emitter.emit('navigate');
});


// View component
const View = {
  name: 'router-view',
  template: `<component :is="currentView"></component>`,
  data() {
    return {
      currentView: {},
    }
  },
  created() {
    if (this.getRouteObject() === undefined) {
      this.currentView = {
        template: `<h2>Nie znaleziono :(. Wybierz film z listy!</h2>`
      };
    } else {
      this.currentView = this.getRouteObject().component;
    }
    // Event listener for link navigation
    emitter.on('navigate', () => {
      this.currentView = this.getRouteObject().component;
    });

  },
  methods: {
    getRouteObject() {
      return routes.find(
        route => route.path === window.location.pathname
      );
    }
  }
};

// Link component
const Link = {
  name: 'router-link',
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  template: `<a @click="navigate" :href="to">{{ to }}</a>`,
  methods: {
    navigate(evt) {
      evt.preventDefault();
      window.history.pushState(null, null, this.to);
      emitter.emit('navigate');
    }
  }
};


const App = {
  name: 'App',
  template: 
  `<div id="app">
    <div class="movies">
      <h2>Który film?</h2>
      <router-link to="/dunkirk">/dunkirk</router-link>
      <router-link to="/interstellar">/interstellar</router-link>
      <router-link to="/the-dark-knight-rises">/the-dark-knight-rises</router-link>     
      <router-view></router-view>
    </div>
  </div>`,
  components: {
    'router-view': View,
    'router-link': Link
  }
};

export default App;
