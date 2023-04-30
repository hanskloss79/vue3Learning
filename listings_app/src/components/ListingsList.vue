<template>
  <div id="listings">
    <ListingsNotification 
      :notification="notification" 
      :toggleNotification="toggleNotification" 
    />
    <div v-for="listing in listings" :key="listing.id">
      <ListingsListItem :listing="listing"/>
    </div>
    <button
      class="button is-light"
      :class="{ 'is-primary': darkMode, 'is-info': !darkMode }"
      @click="resetListings" 
      :disabled="listings.length === 3">
      Reset
    </button>
  </div>
</template>

<script>
import { inject, onMounted } from "vue";

import ListingsListItem from './ListingsListItem';
import ListingsNotification from './ListingsNotification';

import useNotification from '../hooks/useNotification';
import useDarkMode from '../hooks/useDarkMode';

export default {
  name: 'ListingsList',
  props: ['listings'],
  
  setup() {
    // access the store
    const store = inject('store');
    const { darkMode } = useDarkMode();

    // reactive data properties - notifications
    const {
      notification,
      setNotification,
      toggleNotification,
    } = useNotification();

    // methods
    const resetListings = () => {
      setNotification("Oferty zostały zresetowane!");
      return store.actions.resetListings();
    };

    // mounted lifecycle hook
    onMounted(() => {
      setNotification("Witamy w NewlineBnB!!!!!");
    });

    // return properties for component to access
    return {
      darkMode,
      notification,
      toggleNotification,
      resetListings
    }
  },

  components: {
    ListingsListItem,
    ListingsNotification,
  },
}
</script>
