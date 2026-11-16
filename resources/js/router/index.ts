import { createRouter, createWebHistory } from 'vue-router';
import { authorRoutes } from '../domains/authors/routes';
import { bookRoutes } from '../domains/books/routes';
import { reviewRoutes } from '../domains/reviews/routes';

export const router = createRouter({
    history: createWebHistory(),
    routes: [...authorRoutes, ...bookRoutes, ...reviewRoutes],
});
