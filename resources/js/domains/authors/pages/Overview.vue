<script setup lang="ts">
import { authorStore } from '@/domains/authors/store';
import ErrorMessage from '@/components/ErrorMessage.vue';

authorStore.actions.getAll();

const authors = authorStore.getters.all;

const deleteAuthor = async (id: number) => {
        await authorStore.actions.delete(id);
};
</script>

<template>
    <ErrorMessage />

    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Action</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="author in authors" :key="author.id">
                <td>{{ author.name }}</td>

                <td>
                    <RouterLink
                        :to="{ name: 'authors.edit', params: { id: author.id } }"
                    >
                        Bewerk
                    </RouterLink>

                    <button @click="deleteAuthor(author.id)">
                        Verwijder
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
