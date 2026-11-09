<template>
    <nav>
        <router-link :to="{name: 'books.overview'}">Boeken Overzicht</router-link> |
        <router-link :to="{name: 'books.create'}">Nieuw Boek</router-link>
    </nav>
    <router-view></router-view>
</template>
