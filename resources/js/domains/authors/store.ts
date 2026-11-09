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
