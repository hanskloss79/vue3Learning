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
import { ref, onMounted } from "vue";
import { useStore } from 'vuex';
import ListingsListItem from './ListingsListItem';
import ListingsNotification from './ListingsNotification';

export default {
  name: 'ListingsList',
  props: ['listings', 'isDark'],
  
  setup() {
    // access the store
    const store = useStore();

    // reactive data properties
    const notification = ref(null);

    // methods
    const resetListings = () => store.dispatch("resetListings");

    // mounted lifecycle hook
    onMounted(() => {
      notification.value = "Witamy w NewlineBnB!!!!!";

      setTimeout(() => {
        notification.value = null;
      }, 3000);
    });

    // return properties for component to access
    return {
      notification,
      resetListings
    }
  },

  components: {
    ListingsListItem,
    ListingsNotification,
  },
}
</script>
