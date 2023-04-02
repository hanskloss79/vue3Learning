import { createRouter, createWebHistory } from 'vue-router';
import CartList from '../components/cart/CartList.vue';
import ProductList from '../components/product/ProductList.vue';
import NotFound from '../components/NotFound.vue';
import ProductItem from '../components/product/ProductItem.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/products",
            component: ProductList,
        },
        // opis każdego produktu - id produktu przez props
        {
            path: "/products/:id",
            component: ProductItem,
            props: true
        },
        {
            path: "/cart",
            component: CartList,
        },
        // redirection from the main page /
        {
            path: "/",
            redirect: "/products",
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFound
        }
    ],
});

export default router;