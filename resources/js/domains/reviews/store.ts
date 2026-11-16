import { storeModuleFactory } from '@/services/store';

export interface Review {
    id: number;
    book_id: number;
    user_id: number | null;
    rating: number;
    comment: string;
    created_at?: string;
    updated_at?: string;
}

export const reviewStore = storeModuleFactory<Review>('reviews');
