<script setup>
import { ref } from 'vue';

const props = defineProps({ author: Object });
const emit = defineEmits(['submit']);

const form = ref({ ...props.author });

const handleSubmit = () => emit('submit', form.value);
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <label>Naam:</label>
        <input v-model="form.name" type="text" required />

        <button type="submit">Opslaan</button>
    </form>
</template>
