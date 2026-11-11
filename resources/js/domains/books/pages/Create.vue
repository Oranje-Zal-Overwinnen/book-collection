<script setup>
import Form from '../components/Form.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { bookStore } from '@/domains/books/store';

const router = useRouter();

const book = ref({
    title: '',
    summary: '',
    author_id: null,
    isbn: '',
    published_date: ''
});

const handleSubmit = async (data) => {
    await bookStore.create(data);
    router.push({ name: 'books.overview' });
};
</script>

<template>
    <div>
        <h2>Nieuw boek toevoegen</h2>
        <Form :book="book" @submit="handleSubmit" />
    </div>
</template>
