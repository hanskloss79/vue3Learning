import { createRouter, createWebHistory } from 'vue-router';
import CartList from '../components/cart/CartList.vue';
import ProductList from '../components/product/ProductList.vue';
import ProductItem from '../components/product/ProductItem.vue';
import LoginPage from '../components/login/LoginPage.vue';
import NotFound from '../components/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // lista wszystkich produktów
        {
            path: "/products",
            component: ProductList,
        },
        // opis każdego produktu - id produktu przez props
        {
            path: "/products/:id",
            component: ProductItem,
            props: true,
            beforeEnter: (to, from, next) => {
                const id = to.params.id;
                if (![1, 2, 3, 4].includes(Number(id))) next('/not-found');
                else next();
            }
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
            path: '/login',
            component: LoginPage,
            beforeEnter: (to, from, next) => {
                const token = localStorage.getItem("token");
                if (token) next('/products');
                else next();
            }
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFound
        }
    ],
});

// strażnik globalny wszystkich ścieżek
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    if (!token && to.path !== '/login') next("/login");
    else next();
});

export default router;