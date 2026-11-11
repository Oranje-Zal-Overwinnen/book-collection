<script setup>
import { useRoute, useRouter } from 'vue-router';
import Form from '../components/Form.vue';
import { authorStore } from '@/domains/authors/store';

const route = useRoute();
const router = useRouter();

authorStore.actions.getAll();

const author = authorStore.getters.getById(Number(route.params.id));

const handleSubmit = async (data) => {
    await authorStore.actions.update(Number(route.params.id), data);
    router.push({ name: 'authors.overview' });
};
</script>

<template>
    <div>
        <h2>Auteur bewerken</h2>
        <Form v-if="author" :author="author" @submit="handleSubmit" />
    </div>
</template>
