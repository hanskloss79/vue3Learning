<template>
  <div id="app" class="shop_app">
    <div v-if="$route.path !== '/login'" class="navigation-buttons">
      <button @click="logout" class="button is-text is-pulled-left">Logout</button>
      <div class="is-pulled-right">
        <router-link to="/products" class="button">
          <i class="fa fa-user-circle"></i><span>Sklep</span>
        </router-link>
        <router-link to="/cart" class="button is-primary">
          <i class="fa fa-shopping-cart"></i><span>{{ cartQuantity }}</span>
        </router-link>
      </div>
    </div>
    <div class="container">
      <div class="columns">
        <div class="column is-6 column--align-center">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>  

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'token',  // new computed property  
      'cartQuantity'
    ]),
  },
  created() {
    
    const token = localStorage.getItem("token");
    if (token) {
      this.updateInitialState(token);
    }
  },
  watch: {
    token() {
      if (this.token) {
        this.updateInitialState(this.token);
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login")
      });
    },
    updateInitialState(token) {
      this.$store.dispatch('getCartItems', token);
      this.$store.dispatch('getProductItems', token);
    }
  }
};
</script>

<style>
html,
body {
  height: 100vh;
  background: #F2F6FA;
}

.shop_app {
  height: 100vh;
  display: flex;
  align-items: top;
  justify-content: center;
}

.column--align-center {
  margin: 0 auto;
}

.navigation-buttons {
  position: absolute;
  top: 10px;
  width: 99%;
  z-index: 99;
}

.navigation-buttons .button {
  margin: 0 2px;
}

.navigation-buttons .button .fa {
  padding-right: 5px;
}
</style>