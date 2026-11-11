<script setup>
import { useRoute, useRouter } from 'vue-router';
import Form from '../components/Form.vue';
import { bookStore } from '@/domains/books/store';

const route = useRoute();
const router = useRouter();

bookStore.actions.getAll();

const book = bookStore.getters.getById(Number(route.params.id));

const handleSubmit = async (data) => {
    await bookStore.actions.update(Number(route.params.id), data);
    router.push({ name: 'books.overview' });
};
</script>

<template>
    <div>
        <h2>Boek bewerken</h2>
        <Form v-if="book" :book="book" @submit="handleSubmit" />
    </div>
</template>
