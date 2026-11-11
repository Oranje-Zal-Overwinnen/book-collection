<script setup lang="ts">
import { getMessage } from '@/services/error';
</script>

<template>
    <div v-if="getMessage">
        {{ getMessage }}
    </div>
</template>
