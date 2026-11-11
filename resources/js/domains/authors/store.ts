import { storeModuleFactory } from '@/services/store';

interface Author {
    id: number;
    name: string;
}

export const authorStore = storeModuleFactory<Author>('authors');
