<template>
    <div id="login" class="box has-text-centered">
        <h2 class="title">Sklep z odzieżą</h2>
        <button v-on:click="login" 
        v-bind:class="[{'is-loading': loading}, 'button is-primary']">
        Logowanie</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "LoginPage",
    computed: {
        ...mapGetters([
            'loading',
        ])
    },
    methods: {
        login() {
            this.$store.dispatch("login").then(() => {
                this.$router.push({ path: "/products" });
            });
        }
    }
};
</script>

<style scoped>
.box {
    padding: 30px;
}
</style>