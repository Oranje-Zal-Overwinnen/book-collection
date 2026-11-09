import axios from 'axios';
import { ref, computed } from 'vue';

// state
const books = ref([]);

// getters
export const getAllBooks = computed(() => books.value);

// actions
export const fetchBooks = async () => {
    const { data: res } = await axios.get('/api/books');
    if (!res) return;
    books.value = res.data;
};
