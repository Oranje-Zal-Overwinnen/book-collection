<template>
    <nav>
        <router-link :to="{name: 'authors.overview'}">Auteurs Overzicht</router-link> |
        <router-link :to="{name: 'authors.create'}">Nieuwe Auteur</router-link> |
        <router-link :to="{name: 'books.overview'}">Boeken Overzicht</router-link> |
        <router-link :to="{name: 'books.create'}">Nieuw Boek</router-link>
    </nav>
    <router-view></router-view>
</template>
