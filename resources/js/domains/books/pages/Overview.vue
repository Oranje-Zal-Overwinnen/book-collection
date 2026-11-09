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
            </tr>
        </thead>
        <tbody>
            <tr v-for="book in getAllBooks" :key="book.id">
                <td>{{ book.title }}</td>
                <td>{{ book.summary }}</td>
            </tr>
        </tbody>
    </table>
</template>
