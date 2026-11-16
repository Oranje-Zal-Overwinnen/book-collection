<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { reviewStore } from '@/domains/reviews/store';
import Form from '../components/Form.vue';

const route = useRoute();
const router = useRouter();

const reviewId = Number(route.params.id);
const review = reviewStore.getters.getById(reviewId);

onMounted(() => reviewStore.actions.getAll());

const handleSubmit = async (data) => {
    await reviewStore.actions.update(reviewId, data);
    router.push({ name: 'books.show', params: { id: data.book_id } });
};

const deleteReview = async () => {
    if (!review.value) return;
    if (!window.confirm('Weet je zeker dat je deze review wilt verwijderen?')) return;

    const bookId = review.value.book_id;
    const deleted = await reviewStore.actions.delete(reviewId);

    if (deleted) {
        router.push({ name: 'books.show', params: { id: bookId } });
    }
};
</script>

<template>
    <div>
        <h2>Review bewerken</h2>

        <template v-if="review">
            <Form :review="review" @submit="handleSubmit" />

            <button type="button" @click="deleteReview">Verwijder</button>
        </template>

        <p v-else>Review niet gevonden.</p>
    </div>
</template>
