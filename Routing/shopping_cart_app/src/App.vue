<template>
  <div id="app">
    <div class="container">
      <div class="columns">
        <div class="column is-4">
          <CartList />
        </div>
        <div class="column is-8">
          <ProductList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartList from './components/cart/CartList';
import ProductList from './components/product/ProductList';

export default {
  name: 'App',
  components: {
    CartList,
    ProductList
  }
};
</script>

<style>
html,
body {
  background: #f2f6fa;
}

#app {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (min-width: 769px) {
  html,
  body {
    height: 100vh;
  }
}
</style>
