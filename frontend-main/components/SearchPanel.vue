<template>
  <div class="SearchPanel">
    <form @submit.prevent="applyFilters">
      <div class="filters">
        <label>
          SKU
          <input v-model="filters.sku" type="text" placeholder="e.g. RZ16-3090" />
        </label>

        <label>
          Min price
          <input v-model.number="filters.priceMin" type="number" min="0" step="any" placeholder="e.g. 100" />
        </label>

        <label>
          Max price
          <input v-model.number="filters.priceMax" type="number" min="0" step="any" placeholder="e.g. 1000" />
        </label>

        <label>
          Category

          <select v-model="filters.category">
            <option disabled value="">Select</option>
            <option v-for="item in categories" :key="item.code" :value="item.code">{{ item.label }}</option>
          </select>
        </label>

        <label>
          Brand
          <input v-model="filters.brand" type="text" placeholder="e.g. Samsung" />
        </label>

        <label>
          Model
          <input v-model="filters.model" type="text" placeholder="e.g. Pro 16" />
        </label>

        <label>
          Condition
          <select v-model="filters.condition">
            <option disabled value="">Select</option>
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="refurbished">Refurbished</option>
          </select>
        </label>

        <label>
          Min discount
          <input v-model.number="filters.discountPercentMin" type="number" min="0" max="100" placeholder="%" />
        </label>

        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

        <div class="actions">
          <button type="submit">Apply Filters</button>
          <button type="button" @click="resetFilters">Clear</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import categoryList from "@/assets/json/categories.json"

const categories = computed(() =>

  Object.values(categoryList).map(category => ({
    label: category.label,
    code: category.code,
  }))

)
type Condition = 'new' | 'used' | 'refurbished';

interface ProductSearchFilters {
  sku?: string;
  priceMin?: number;
  priceMax?: number;
  category?: string;
  brand?: string;
  model?: string;
  condition?: Condition;
  discountPercentMin?: number;
}

const router = useRouter();
const route = useRoute();

const filters = ref<ProductSearchFilters>({});
const errorMessage = ref<string | null>(null);

const filterSchema = z.object({
  sku: z.string().optional(),
  priceMin: z.coerce.number().optional(),
  priceMax: z.coerce.number().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  condition: z.enum(['new', 'used', 'refurbished']).optional(),
  discountPercentMin: z.coerce.number().min(0).max(100).optional()
});

onMounted(() => {
  const parsed = filterSchema.safeParse(route.query);
  if (parsed.success) {
    filters.value = parsed.data;
  } else {
    console.warn("Invalid parameters in the URL", parsed.error);
  }
});

function applyFilters() {
  errorMessage.value = null;

  const f = filters.value;

  if (f.priceMin !== undefined && f.priceMax !== undefined && f.priceMin > f.priceMax) {
    errorMessage.value = 'The minimum price cannot be greater than the maximum.';
    return;
  }

  const query: Record<string, string> = {};

  Object.entries(f).forEach(([key, val]) => {
    if (val !== undefined) {
      query[key] = String(val);
    }
  });

  router.push({ name: 's', query: { ...route.query, ...query } });
}

function resetFilters() {
  filters.value = {};
  const cleanedQuery = { ...route.query };
  Object.keys(cleanedQuery).forEach((key) => {
    if (filterSchema.shape[key as keyof typeof filterSchema.shape]) {
      delete cleanedQuery[key];
    }
  });
  router.push({ query: cleanedQuery });
}
</script>

<style scoped>
.SearchPanel {
  box-sizing: border-box;
  min-height: 100vh;
  overflow-y: auto;
  height: 100%;
  width: 100%;
}

.filters {
  width: 100%;
  display: grid;
  gap: 1rem;
  box-sizing: border-box;
}

label {
  display: flex;
  font-weight: 700;
  color: var(--text-a);
  flex-direction: column;
  font-size: var(--text-size-0);
}

input,
select {
  width: 100%;
  margin-top: 0.5rem;
  box-sizing: border-box;
  padding: 0.5rem 0.75rem;
  font-size: var(--text-size-1);
  border: 1px solid var(--border-a);
  border-radius: var(--input-radius);
  transition: var(--transition-a);
  background: var(--background-a);
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' fill='currentColor' class='chevron-down' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.355a.75.75 0 111.04 1.08l-4 3.615a.75.75 0 01-1.04 0l-4-3.615a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
}

select {
  font-size: var(--text-size-1);
}

select option {
  font-size: var(--text-size-0);
}

input::placeholder {
  font-size: var(--text-size-0);
}

input:focus::placeholder {
  color: transparent;
}

input:focus,
select:focus {
  outline: none;
  border-color: var(--primary-a);
}


.actions {
  gap: 1rem;
  display: flex;
  justify-content: flex-end;
}

button {
  transition: var(--transition-a);
  border-radius: var(--radius-b);
  background: var(--primary-a);
  padding: 0.75rem 1rem;
  color: var(--text-w);
  font-weight: 600;
  cursor: pointer;
  border: none;
}

button:hover {
  opacity: 0.8;
}

button[type="button"] {
  background: var(--background-b);
  color: var(--text-a);
}

button[type="button"]:hover {
  background: var(--background-b);
}

.error {
  color: #dc2626;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: #fee2e2;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
}
</style>