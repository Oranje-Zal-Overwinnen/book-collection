<script setup lang="ts">
import { bookStore } from '@/domains/books/store';

bookStore.actions.getAll();

const books = bookStore.getters.all;

const deleteBook = async (id: number) => {
    await bookStore.actions.delete(id);
};
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
                <td>{{ book.title }}</td>
                <td>{{ book.summary }}</td>
                <td>
                    <RouterLink :to="{ name: 'books.edit', params: { id: book.id } }">Bewerk</RouterLink>
                    <button @click="deleteBook(book.id)">Verwijder</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
