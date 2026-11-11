<script setup>
import Form from '../components/Form.vue';
import { createAuthor } from '../store';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const book = ref({
    name: '',
});

const handleSubmit = async (data) => {
    await createAuthor(data);
    router.push({name: 'authors.overview'});
};
</script>

<template>
    <div>
        <h2>Nieuwe auteur toevoegen</h2>
        <Form :author="author" @submit="handleSubmit" />
    </div>
</template>
