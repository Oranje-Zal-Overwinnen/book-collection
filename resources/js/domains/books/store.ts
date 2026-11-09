import axios from 'axios';
import { ref, computed } from 'vue';

// state
const books = ref([]);

// getters
export const getAllBooks = computed(() => books.value);
export const getBookById = (id) => computed(() => books.value.find(book => book.id == id));

// actions
export const fetchBooks = async () => {
    const { data: res } = await axios.get('/api/books');
    if (!res) return;
    books.value = res.data;
};

export const createBook = async (newBook) => {
    const {data} = await axios.post('/api/books', newBook);
    if(!data) return
    books.value = data;
};

export const updateBook = async (id, updatedBook) => {
    const { data } = await axios.put(`/api/books/${id}`, updatedBook);
    if (!data) return;
    books.value = data;
};
