<script setup lang="ts">
import DeleteBookButton from '../components/DeleteBookButton.vue';
import { bookStore } from '@/domains/books/store';

bookStore.actions.getAll();

const books = bookStore.getters.all;
</script>

<template>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Summary</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="book in books" :key="book.id">
                <td>
                    <RouterLink
                        :to="{ name: 'books.show', params: { id: book.id } }"
                    >
                        {{ book.title }}
                    </RouterLink>
                </td>
                <td>{{ book.summary }}</td>
                <td>
                    <RouterLink
                        :to="{ name: 'books.edit', params: { id: book.id } }"
                    >
                        Bewerk
                    </RouterLink>
                    <DeleteBookButton :book="book" />
                </td>
            </tr>
        </tbody>
    </table>
</template>
