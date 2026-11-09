<script setup lang="ts">
import { getAllAuthors, fetchAuthors } from '../store';

fetchAuthors();
</script>

<template>
    <table>
        <thead>
            <tr>
                <th>Name</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="author in getAllAuthors" :key="author.id">
                <td>{{ author.name }}</td>
            </tr>
        </tbody>
    </table>
</template>
