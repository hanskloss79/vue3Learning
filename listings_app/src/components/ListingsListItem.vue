<template>
  <article class="media mb-2">
    <figure class="media-left">
      <p class="image is-128x128 is-hidden-mobile">
        <img :src="listing.image">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p :class="{ 'has-text-white': darkMode }">
          <strong :class="{ 'has-text-white': darkMode }">
            {{ listing.title }}
          </strong>
          <small class="pl-1" 
            :class="{ 'has-text-primary': darkMode, 'has-text-info': !darkMode }">
            {{ listing.address }}
          </small>
          <br>
          {{ listing.description }}
          <br>
          <small class="has-text-weight-bold"
            :class="{ 'has-text-primary': darkMode, 'has-text-info': !darkMode }">
            <span>${{ listing.price/100 }}/day</span> · <span>Rating: {{ listing.rating }}/5</span>
          </small>
        </p>
      </div>
    </div>
    <div class="media-right">
      <button class="button is-light is-small"
        :class="{ 'is-primary': darkMode, 'is-info': !darkMode }" @click="removeListing(listing)">
        Remove
      </button>
    </div>
  </article>
</template>

<script>
import { inject } from 'vue';

import useNotification from '../hooks/useNotification';
import useDarkMode from '../hooks/useDarkMode';

export default {
  name: 'ListingsListItem',
  props: ['listing'],
  setup(props){
    // access the store
    const store = inject('store');
    const { darkMode } = useDarkMode();
    const { setNotification } = useNotification();

    //methods
    const removeListing = () => {
      setNotification("Oferta zostanie usunięta!");
      return store.actions.removeListing(props.listing);
    };
    // return properties for component to access
    return {
      darkMode,
      removeListing
    }
  }
}

</script>
