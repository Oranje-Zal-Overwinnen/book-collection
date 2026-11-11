import axios from 'axios';
import { ref, computed } from 'vue';

// state
const authors = ref([]);

// getters
export const getAllAuthors = computed(() => authors.value);

// actions
export const fetchAuthors = async () => {
    const { data: res } = await axios.get('/api/authors');
    if (!res) return;
    authors.value = res.data;
};

export const createAuthor = async (newAuthor) => {
    const {data} = await axios.post('/api/authors', newAuthor);
    if(!data) return
    authors.value = data;
};

export const updateAuthor = async (id, updatedAuthor) => {
    const { data } = await axios.put(`/api/authors/${id}`, updatedAuthor);
    if (!data) return;
    authors.value = data;
};

export const deleteAuthor = async (id) => {
    await axios.delete(`/api/authors/${id}`);
    authors.value = authros.value.filter(author => author.id !== id);
};
