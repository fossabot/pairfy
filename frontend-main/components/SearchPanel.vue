<template>

    <div class="SearchPanel">
        <form @submit.prevent="applyFilters">
            <div class="filters">
                <label>
                    SKU:
                    <input v-model="filters.sku" type="text" />
                </label>

                <label>
                    Precio mínimo:
                    <input v-model.number="filters.priceMin" type="number" min="0" />
                </label>

                <label>
                    Precio máximo:
                    <input v-model.number="filters.priceMax" type="number" min="0" />
                </label>

                <label>
                    Categoría:
                    <input v-model="filters.category" type="text" />
                </label>

                <label>
                    Marca:
                    <input v-model="filters.brand" type="text" />
                </label>

                <label>
                    Modelo:
                    <input v-model="filters.model" type="text" />
                </label>

                <label>
                    Condición:
                    <select v-model="filters.condition">
                        <option disabled value="">Selecciona una</option>
                        <option value="new">Nuevo</option>
                        <option value="used">Usado</option>
                        <option value="refurbished">Reacondicionado</option>
                    </select>
                </label>

                <label>
                    ¿Con descuento?
                    <input v-model="filters.discount" type="checkbox" />
                </label>

                <label>
                    % mínimo de descuento:
                    <input v-model.number="filters.discountPercentMin" type="number" min="0" max="100" />
                </label>

                <div class="actions">
                    <button type="submit">Aplicar filtros</button>
                    <button type="button" @click="resetFilters">Limpiar</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

type Condition = 'new' | 'used' | 'refurbished';

interface ProductSearchFilters {
    sku?: string;
    priceMin?: number;
    priceMax?: number;
    category?: string;
    brand?: string;
    model?: string;
    condition?: Condition;
    discount?: boolean;
    discountPercentMin?: number;
}

const router = useRouter();
const route = useRoute();

const defaultFilters: ProductSearchFilters = {
    sku: '',
    priceMin: undefined,
    priceMax: undefined,
    category: '',
    brand: '',
    model: '',
    condition: undefined,
    discount: false,
    discountPercentMin: undefined,
};

const filters = ref<ProductSearchFilters>({ ...defaultFilters });

onMounted(() => {
    const q = route.query;
    filters.value = {
        sku: (q.sku as string) || '',
        priceMin: q.priceMin ? Number(q.priceMin) : undefined,
        priceMax: q.priceMax ? Number(q.priceMax) : undefined,
        category: (q.category as string) || '',
        brand: (q.brand as string) || '',
        model: (q.model as string) || '',
        condition: q.condition as Condition || undefined,
        discount: q.discount === '1',
        discountPercentMin: q.discountPercentMin ? Number(q.discountPercentMin) : undefined,
    };
});

function applyFilters() {
    if (
        filters.value.priceMin !== undefined &&
        filters.value.priceMax !== undefined &&
        filters.value.priceMin > filters.value.priceMax
    ) {
        alert('El precio mínimo no puede ser mayor que el máximo.');
        return;
    }

    const query: Record<string, string> = {};
    Object.entries(filters.value).forEach(([key, val]) => {
        if (val !== undefined && val !== '') {
            query[key] = typeof val === 'boolean' ? (val ? '1' : '0') : String(val);
        }
    });

    router.push({ query: { ...route.query, ...query } });
}

function resetFilters() {
    filters.value = { ...defaultFilters };

    const cleanedQuery = { ...route.query };
    Object.keys(defaultFilters).forEach((key) => {
        delete cleanedQuery[key];
    });

    router.push({ query: cleanedQuery });
}
</script>

<style scoped>
.SearchPanel {
    border-top-right-radius: var(--radius-d);
    border: 1px solid rgba(0, 0, 0, 0.05);
    background: var(--background-b);
    border-left: none;
    position: sticky;
    min-height: 100vh;
    height: 100%;
}

.filters {
    display: grid;
    gap: 1rem;
    max-width: 400px;
}

label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
}

.actions {
    display: flex;
    gap: 1rem;
}

button {
    padding: 0.5rem 1rem;
}
</style>