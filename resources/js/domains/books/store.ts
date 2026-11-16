import { storeModuleFactory } from '@/services/store';

interface Book {
    id: number;
    title: string;
    summary: string;
    author_id: number;
    isbn: string;
    published_date: string;
    reviews_count?: number;
}

export const bookStore = storeModuleFactory<Book>('books');

