<script setup lang="ts">
import { getAllAuthors, fetchAuthors, deleteAuthor } from '../store';

fetchAuthors();
</script>

<template>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="author in getAllAuthors" :key="author.id">
                <td>{{ author.name }}</td>
                <td>
                    <RouterLink :to="{ name: 'authors.edit', params: { id: author.id } }">Bewerk</RouterLink>
                    <button @click="deleteAuthor(author.id)">Verwijder</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
