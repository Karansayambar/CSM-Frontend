<template>
  <div>
    <StationFilters
      :filters="filters"
      @filters-change="setFilters"
      @show-success="$emit('show-success', $event)"
    />

    <div class="add-button-container">
      <button @click="showAddForm = true" class="add-button">
        <Plus class="icon" />
        Add New Station
      </button>
    </div>

    <div v-if="loading && !filteredStations.length" class="loading-container">
      <Loader2 class="spinner large" />
      <p class="loading-text">Loading charging stations...</p>
    </div>

    <div v-else-if="filteredStations.length" class="stations-grid">
      <StationCard
        v-for="station in filteredStations"
        :key="station._id"
        :station="station"
        @edit="handleEdit"
        @delete="handleDelete"
        @view-details="handleViewDetails"
      />
    </div>

    <div v-else class="empty-state">
      <Zap class="empty-icon" />
      <p class="empty-title">No charging stations found</p>
      <p class="empty-subtitle">Add a new station or adjust your filters!</p>
    </div>

    <StationModal
      v-if="showAddForm || editingStation"
      :station="editingStation"
      @save="handleSave"
      @cancel="handleCancel"
      @getStations="loadStations"
    />
    <StationDetails
      v-if="selectedStation"
      :station="selectedStation"
      @close="closeDetails"
    />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { Plus, Loader2, Zap } from "lucide-vue-next";
import StationFilters from "./StationFilters.vue";
import StationCard from "./StationCard.vue";
import StationModal from "./StationModal.vue";
import { useStations } from "../../hooks/useStation.js";
import StationDetails from "./StationDetails.vue";

export default {
  name: "StationsList",
  components: {
    Plus,
    Loader2,
    Zap,
    StationFilters,
    StationCard,
    StationModal,
    StationDetails,
  },
  emits: ["show-success"],
  setup(props, { emit }) {
    const showAddForm = ref(false);
    const editingStation = ref(null);
    const selectedStation = ref(null);

    const {
      filteredStations,
      loading,
      filters,
      getStations,
      setFilters,
      addStation,
      updateStation,
      deleteStation,
    } = useStations();

    const handleViewDetails = (station) => {
      selectedStation.value = station;
    };

    const closeDetails = () => {
      selectedStation.value = null;
    };

    const handleSave = async (stationData) => {
      if (editingStation.value) {
        await updateStation(editingStation.value._id, stationData);
        emit("show-success", "Station updated successfully!");
      } else {
        await addStation(stationData);
        emit("show-success", "Station added successfully!");
      }
      showAddForm.value = false;
      editingStation.value = null;
    };

    onMounted(() => {
      getStations();
    });

    const handleEdit = (station) => {
      editingStation.value = station;
      showAddForm.value = true;
    };

    const handleDelete = async (stationId) => {
      if (!confirm("Are you sure you want to delete this charging station?")) {
        return;
      }
      await deleteStation(stationId);
      emit("show-success", "Station deleted successfully!");
    };

    const handleCancel = () => {
      showAddForm.value = false;
      editingStation.value = null;
    };

    return {
      showAddForm,
      editingStation,
      filteredStations,
      loading,
      selectedStation,
      filters,
      setFilters,
      handleEdit,
      handleSave,
      handleDelete,
      handleCancel,
      handleViewDetails,
      closeDetails,
    };
  },
};
</script>
