<script setup>
import { computed, watch } from 'vue';

import { reviewStore } from '@/domains/reviews/store';

const props = defineProps({ book: Object });
const emit = defineEmits(['deleted']);

const reviews = computed(() =>
    Object.values(reviewStore.getters.all.value)
        .filter((review) => review.book_id === props.book?.id)
        .sort((first, second) => second.id - first.id),
);

watch(
    () => props.book?.id,
    (bookId) => {
        if (!bookId) return;
        reviewStore.actions.getAll({ book_id: bookId });
    },
    { immediate: true },
);

const deleteReview = async (id) => {
    if (!window.confirm('Weet je zeker dat je deze review wilt verwijderen?')) return;

    const deleted = await reviewStore.actions.delete(id);
    if (deleted) emit('deleted');
};
</script>

<template>
    <div>
        <h3>Reviews</h3>

        <p v-if="reviews.length === 0">Er zijn nog geen reviews voor dit boek.</p>

        <ul v-else>
            <li v-for="review in reviews" :key="review.id">
                <strong>{{ review.rating }} / 5</strong>
                <p>{{ review.comment }}</p>

                <RouterLink
                    :to="{ name: 'reviews.edit', params: { id: review.id } }"
                >
                    Bewerk
                </RouterLink>
                <button type="button" @click="deleteReview(review.id)">
                    Verwijder
                </button>
            </li>
        </ul>
    </div>
</template>
