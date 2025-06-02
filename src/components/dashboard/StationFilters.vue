<template>
  <div class="filters-container">
    <h3 class="filters-title">
      <Filter class="icon" />
      Filters
    </h3>
    <div class="filters-grid">
      <div class="filter-group">
        <label class="filter-label">Status</label>
        <select
          :value="filters.status"
          @change="handleFilterChange('status', $event.target.value)"
          class="filter-select"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="coming soon">Coming Soon</option>
          <option value="under maintenance">Under Maintenance</option>
        </select>
      </div>
      <div class="filter-group">
        <label class="filter-label">Min Power Output (kW)</label>
        <input
          type="number"
          :value="filters.powerOutput"
          @input="handleFilterChange('powerOutput', $event.target.value)"
          class="filter-input"
          placeholder="e.g., 50"
        />
      </div>
      <div class="filter-group">
        <label class="filter-label">Connector Type</label>
        <select
          :value="filters.connectorType"
          @change="handleFilterChange('connectorType', $event.target.value)"
          class="filter-select"
        >
          <option value="">All</option>
          <option value="type 1">Type 1</option>
          <option value="type 2">Type 2</option>
          <option value="css">CCS</option>
          <option value="chademo">CHAdeMO</option>
        </select>
      </div>
    </div>
    <div class="filters-actions">
      <button @click="applyFilters" class="filter-button primary">
        <Search class="icon" />
        Apply Filters
      </button>
      <button @click="clearFilters" class="filter-button secondary">
        <X class="icon" />
        Clear
      </button>
    </div>
  </div>
</template>

<script>
import { Filter, Search, X } from "lucide-vue-next";

export default {
  name: "StationFilters",
  components: {
    Filter,
    Search,
    X,
  },
  props: {
    filters: {
      type: Object,
      required: true,
    },
  },
  emits: ["filters-change", "show-success"],
  setup(props, { emit }) {
    const handleFilterChange = (field, value) => {
      emit("filters-change", { ...props.filters, [field]: value });
    };

    const applyFilters = () => {
      emit("show-success", "Filters applied");
    };

    const clearFilters = () => {
      emit("filters-change", {
        status: "",
        powerOutput: "",
        connectorType: "",
      });
      emit("show-success", "Filters cleared");
    };

    return {
      handleFilterChange,
      applyFilters,
      clearFilters,
    };
  },
};
</script>

<style>
.filters-container {
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
}

.filters-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

.filter-input,
.filter-select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
}

.filters-actions {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.filter-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
  transition: background-color 0.2s;
}

.filter-button.primary {
  background-color: #3b82f6;
  color: white;
}

.filter-button.primary:hover {
  background-color: #2563eb;
}

.filter-button.secondary {
  background-color: #6b7280;
  color: white;
}

.filter-button.secondary:hover {
  background-color: #4b5563;
}
</style>
