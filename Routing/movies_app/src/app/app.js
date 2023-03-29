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
  },
  methods: {
    getRouteObject() {
      return routes.find(
        route => route.path === window.location.pathname
      );
    }
  }
};

const App = {
  name: 'App',
  template: 
  `<div id="app">
    <div class="movies">
      <h2>Który film?</h2>
      <a href="/dunkirk">/dunkirk</a>
      <a href="/interstellar">/interstellar</a>
      <a href="/the-dark-knight-rises">/the-dark-knight-rises</a>     
      <router-view></router-view>
    </div>
  </div>`,
  components: {
    'router-view': View
  }
};

export default App;
