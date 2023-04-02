<template>
    <div>
        <h2 class="has-text-weight-bold">
            <router-link :to="'/products/' + productItem.id">
                {{ productItem.title }}
            </router-link>
            <span v-on:click="addCartItem(productItem)"
                class="tag is-primary is-pulled-right has-text-white">
                Dodaj do koszyka
            </span>
        </h2>
        <p>{{ productItem.description }}</p>
        <span class="has-text-primary has-text-weight-bold">
             {{ productItem.price }} zł
        </span>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'ProductListItem',
    props: ['productItem'],

    methods: {
        ...mapActions([
            'addCartItem'
        ])
        
    },

}
</script>
<style scoped>
.tag {
    cursor: pointer;
}
</style>