<script setup>
import { ref } from 'vue';

import ErrorMessage from '@/components/ErrorMessage.vue';
import { bookStore } from '@/domains/books/store';

const props = defineProps({
    book: {
        type: Object,
        required: true,
    },
});
const emit = defineEmits(['deleted']);

const open = ref(false);
const deleting = ref(false);
const hasReviews = ref(false);

const askDelete = () => {
    hasReviews.value = (props.book.reviews_count ?? 0) > 0;
    open.value = true;
};

const close = () => {
    if (deleting.value) return;
    open.value = false;
};

const deleteBook = async (withReviews) => {
    deleting.value = true;

    const deleted = await bookStore.actions.delete(
        props.book.id,
        withReviews ? { with_reviews: 1 } : undefined,
    );

    deleting.value = false;

    if (deleted) {
        open.value = false;
        emit('deleted');
        return;
    }

    if (!withReviews) {
        hasReviews.value = true;
    }
};
</script>

<template>
    <button type="button" @click="askDelete">Verwijder</button>

    <Teleport to="body">
        <div v-if="open" class="modal-backdrop" @click.self="close">
            <div
                class="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-book-title"
            >
                <h3 id="delete-book-title">Boek verwijderen</h3>
                <p><strong>{{ book.title }}</strong></p>

                <template v-if="hasReviews">
                    <p>
                        Dit boek heeft gekoppelde reviews. Een boek met reviews
                        kan niet los verwijderd worden. Kies wat je wilt doen:
                    </p>

                    <div class="modal-actions">
                        <button type="button" @click="close">
                            Niet verwijderen
                        </button>
                        <button
                            type="button"
                            :disabled="deleting"
                            @click="deleteBook(true)"
                        >
                            Boek en bijbehorende reviews verwijderen
                        </button>
                    </div>
                </template>

                <template v-else>
                    <p>Weet je zeker dat je dit boek wilt verwijderen?</p>

                    <div class="modal-actions">
                        <button type="button" @click="close">Annuleren</button>
                        <button
                            type="button"
                            :disabled="deleting"
                            @click="deleteBook(false)"
                        >
                            Verwijderen
                        </button>
                    </div>
                </template>

                <ErrorMessage />
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: rgb(0 0 0 / 50%);
}

.modal {
    width: 100%;
    max-width: 32rem;
    padding: 1.5rem;
    background: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 10%);
}

.modal-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: flex-end;
    margin-top: 1rem;
}
</style>
