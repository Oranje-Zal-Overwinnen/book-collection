<script setup lang="ts">
import { getAllBooks, fetchBooks } from '../store';

fetchBooks();
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
            <tr v-for="book in getAllBooks" :key="book.id">
                <td>{{ book.title }}</td>
                <td>{{ book.summary }}</td>
                <td><RouterLink :to="{ name: 'books.edit', params: { id: book.id } }">Bewerk</RouterLink></td>
            </tr>
        </tbody>
    </table>
</template>
