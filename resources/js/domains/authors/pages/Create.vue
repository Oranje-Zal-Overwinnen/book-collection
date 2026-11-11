<script setup>
import Form from '../components/Form.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { authorStore } from '@/domains/authors/store';

const router = useRouter();

const author = ref({
    name: '',
});

const handleSubmit = async (data) => {
    await authorStore.actions.create(data);
    router.push({ name: 'authors.overview' });
};
</script>


<template>
    <div>
        <h2>Nieuwe auteur toevoegen</h2>
        <Form :author="author" @submit="handleSubmit" />
    </div>
</template>
