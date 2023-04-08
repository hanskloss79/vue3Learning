<template>
  <div id="listings">
    <ListingsNotification :notification="notification" :isDark="isDark" />
    <div v-for="listing in listings" :key="listing.id">
      <ListingsListItem :listing="listing" :isDark="isDark" />
    </div>
    <button
      class="button is-light"
      :class="{ 'is-primary': isDark, 'is-info': !isDark }"
      @click="resetListings" 
      :disabled="listings.length === 3">
      Reset
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ListingsListItem from './ListingsListItem';
import ListingsNotification from './ListingsNotification';

export default {
  name: 'ListingsList',
  props: ['listings', 'isDark'],
  data() {
    return {
      notification: null,
    }
  },
  methods: {
    ...mapActions([
      'resetListings'
    ])
  },
  components: {
    ListingsListItem,
    ListingsNotification,
  },
  mounted() {
    this.notification = "Welcome to NewlineBnB!";

    setTimeout(() => {
      this.notification = null;
    }, 5000);
  }
}
</script>
