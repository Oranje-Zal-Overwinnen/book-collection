import { getRequest, postRequest, deleteRequest, putRequest } from '@/services/http';
import { ref, computed } from 'vue';

// state
const books = ref([]);

// getters
export const getAllBooks = computed(() => books.value);
export const getBookById = (id) => computed(() => books.value.find(book => book.id == id));

// actions
export const fetchBooks = async () => {
    const { data: res } = await getRequest('/books');
    if (!res) return;
    books.value = res.data;
};

export const createBook = async (newBook) => {
    const {data} = await postRequest('/books', newBook);
    if(!data) return
    books.value = data;
};

export const updateBook = async (id, updatedBook) => {
    const { data } = await putRequest(`/books/${id}`, updatedBook);
    if (!data) return;
    books.value = data;
};

export const deleteBook = async (id) => {
    await deleteRequest(`/books/${id}`);
    books.value = books.value.filter(book => book.id !== id);
};
