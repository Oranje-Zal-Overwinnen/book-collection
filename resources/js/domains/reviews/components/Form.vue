<script setup>
import { ref } from 'vue';

import ErrorMessage from '@/components/ErrorMessage.vue';
import FormError from '@/components/FormError.vue';

const props = defineProps({
    review: {
        type: Object,
        default: () => ({ rating: 5, comment: '' }),
    },
});
const emit = defineEmits(['submit']);

const form = ref({ ...props.review });

const handleSubmit = () => emit('submit', form.value);
</script>

<template>
    <ErrorMessage />

    <form @submit.prevent="handleSubmit">
        <label>Beoordeling:</label>
        <select v-model.number="form.rating" required>
            <option v-for="rating in 5" :key="rating" :value="rating">
                {{ rating }} / 5
            </option>
        </select>
        <FormError name="rating" />

        <label>Review:</label>
        <textarea v-model="form.comment" rows="3" required />
        <FormError name="comment" />

        <button type="submit">Opslaan</button>
    </form>
</template>
