import { ref, computed, type Ref } from 'vue';
import { getRequest, postRequest, deleteRequest, putRequest } from '@/services/http';

type State<T extends { id: number }> = Ref<{ [id: number]: Readonly<T> }>;

type New<T extends { id: number }> = Omit<T, 'id'>;
type Updatable<T extends { id: number }> = New<T> & { id?: number };

export const storeModuleFactory = <T extends { id: number }>(moduleName: string) => {
    const state: State<T> = ref({});

    const getters = {
        all: computed(() => state.value),
        getById: (id: number) => computed(() => state.value[id])
    };

    const setters = {
        setAll: (items: T[]) => {
            for (const item of items) state.value[item.id] = Object.freeze(item);
        },
        deleteById: (id: number) => {
            delete state.value[id];
        }
    };

    const actions = {
        getAll: async () => {
            const { data: res } = await getRequest(moduleName);
            if (!res) return;
            setters.setAll(res.data);
        },
        create: async (item: New<T>) => {
            const { data: req } = await postRequest(moduleName, item);
            if (!req) return;
            setters.setAll(req.data);
        },
        update: async (id: number, item: Updatable<T>) => {
            const { data: req } = await putRequest(`${moduleName}/${id}`, item);
            if (!req) return;
            setters.setAll(req.data);
        },
        delete: async (id: number) => {
            try {
                await deleteRequest(`${moduleName}/${id}`);
                setters.deleteById(id);
            } catch (error) {
                return;
            }
        }
    };

    return { getters, setters, actions };
};
