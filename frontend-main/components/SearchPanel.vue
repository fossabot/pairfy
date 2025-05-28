<template>
    <div class="SearchPanel">
      <form @submit.prevent="applyFilters">
        <div class="filters">
          <label>
            SKU:
            <input v-model="filters.sku" type="text" placeholder="e.g. ABC123" />
          </label>
  
          <label>
            Precio mínimo:
            <input v-model.number="filters.priceMin" type="number" min="0" step="any" />
          </label>
  
          <label>
            Precio máximo:
            <input v-model.number="filters.priceMax" type="number" min="0" step="any" />
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
            % mínimo de descuento:
            <input v-model.number="filters.discountPercentMin" type="number" min="0" max="100" />
          </label>
  
          <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  
          <div class="actions">
            <button type="submit">Aplicar filtros</button>
            <button type="button" @click="resetFilters">Limpiar</button>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { z } from 'zod';
  
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
      console.warn("Parámetros inválidos en la URL", parsed.error);
    }
  });
  
  function applyFilters() {
    errorMessage.value = null;
  
    const f = filters.value;
  
    if (f.priceMin !== undefined && f.priceMax !== undefined && f.priceMin > f.priceMax) {
      errorMessage.value = 'El precio mínimo no puede ser mayor que el máximo.';
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
    border-top-right-radius: var(--radius-d);
    border: 1px solid rgba(0, 0, 0, 0.05);
    background: var(--background-b);
    border-left: none;
    position: sticky;
    min-height: 100vh;
    box-sizing: border-box;
    padding: 1rem;
    height: 100%;
  }
  
  .filters {
    width: 100%;
    max-width: 420px;
    display: grid;
    gap: 1.5rem;
  }
  
  label {
    display: flex;
    flex-direction: column;
    font-weight: 600;
    color: #374151;
    font-size: 0.95rem;
  }
  
  input,
  select {
    margin-top: 0.5rem;
    padding: 0.6rem 0.75rem;
    font-size: 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    background: #f9fafb;
  }
  
  input:focus,
  select:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    background: #fff;
  }
  
  .actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }
  
  button {
    background-color: #3b82f6;
    color: white;
    padding: 0.6rem 1.2rem;
    font-weight: 600;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  button:hover {
    background-color: #2563eb;
  }
  
  button[type="button"] {
    background-color: #e5e7eb;
    color: #374151;
  }
  
  button[type="button"]:hover {
    background-color: #d1d5db;
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
  
  