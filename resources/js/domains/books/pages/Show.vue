<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import DeleteBookButton from '../components/DeleteBookButton.vue';
import ReviewForm from '@/domains/reviews/components/Form.vue';
import ReviewList from '@/domains/reviews/components/List.vue';
import { authorStore } from '@/domains/authors/store';
import { bookStore } from '@/domains/books/store';
import { reviewStore } from '@/domains/reviews/store';

const route = useRoute();
const router = useRouter();

bookStore.actions.getAll();
authorStore.actions.getAll();

const bookId = computed(() => Number(route.params.id));
const book = computed(() => bookStore.getters.getById(bookId.value).value);
const author = computed(() => {
    if (!book.value) return undefined;

    return authorStore.getters.getById(book.value.author_id).value;
});

const newReviewKey = ref(0);
const newReview = computed(() => ({
    book_id: book.value?.id,
    rating: 5,
    comment: '',
}));

const handleCreate = async (data) => {
    await reviewStore.actions.create({ ...data, book_id: book.value.id });
    await bookStore.actions.getAll();
    newReviewKey.value++;
};

const refreshBook = () => bookStore.actions.getAll();

const handleDeleted = () => router.push({ name: 'books.overview' });
</script>

<template>
    <div v-if="book">
        <h2>{{ book.title }}</h2>

        <dl>
            <dt>Samenvatting</dt>
            <dd>{{ book.summary }}</dd>

            <dt>Auteur</dt>
            <dd>{{ author?.name ?? 'Onbekend' }}</dd>

            <dt>ISBN</dt>
            <dd>{{ book.isbn }}</dd>

            <dt>Publicatiedatum</dt>
            <dd>{{ book.published_date }}</dd>

            <dt>Aantal reviews</dt>
            <dd>{{ book.reviews_count ?? 0 }}</dd>
        </dl>

        <RouterLink :to="{ name: 'books.edit', params: { id: book.id } }">
            Bewerk
        </RouterLink>
        <DeleteBookButton :book="book" @deleted="handleDeleted" />

        <ReviewList :book="book" @deleted="refreshBook" />

        <h3>Nieuwe review</h3>
        <ReviewForm
            :key="newReviewKey"
            :review="newReview"
            @submit="handleCreate"
        />
    </div>

    <p v-else>Boek niet gevonden.</p>
</template>
