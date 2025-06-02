<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h3 class="modal-title">
        <Zap class="icon" />
        {{ station ? "Edit Station" : "Add New Station" }}
      </h3>

      <form @submit.prevent="handleSubmit">
        <div class="form-fields">
          <div class="form-group">
            <label class="form-label">Station Name</label>
            <input
              v-model="formData.stationName"
              type="text"
              class="form-input"
              placeholder="e.g., Downtown Charging Hub"
              required
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Latitude</label>
              <input
                v-model="formData.latitude"
                type="number"
                step="any"
                class="form-input"
                placeholder="40.7128"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">Longitude</label>
              <input
                v-model="formData.longitude"
                type="number"
                step="any"
                class="form-input"
                placeholder="-74.0060"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Status</label>
            <select v-model="formData.status" class="form-select">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="coming soon">Coming Soon</option>
              <option value="under maintenance">Under Maintenance</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Power Output (kW)</label>
            <input
              v-model="formData.powerOutput"
              type="number"
              class="form-input"
              placeholder="50"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">Connector Type</label>
            <select v-model="formData.connectorType" class="form-select">
              <option value="type 1">Type 1</option>
              <option value="type 2">Type 2</option>
              <option value="css">CCS</option>
              <option value="chademo">CHAdeMO</option>
            </select>
          </div>
        </div>

        <div class="modal-actions">
          <button
            type="submit"
            class="modal-button primary"
            :disabled="loading"
          >
            <Loader2 v-if="loading" class="spinner" />
            <Save v-else class="icon" />
            {{ loading ? "Saving..." : "Save" }}
          </button>
          <button
            type="button"
            @click="$emit('cancel')"
            class="modal-button secondary"
          >
            <X class="icon" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { Zap, Loader2, Save, X } from "lucide-vue-next";

export default {
  name: "StationModal",
  components: {
    Zap,
    Loader2,
    Save,
    X,
  },
  props: {
    station: {
      type: Object,
      default: null,
    },
  },
  emits: ["save", "cancel"],
  setup(props, { emit }) {
    const loading = ref(false);
    const formData = ref({
      stationName: "",
      latitude: "",
      longitude: "",
      status: "Active",
      powerOutput: "",
      connectorType: "Type 2",
    });

    watch(
      () => props.station,
      (newStation) => {
        if (newStation) {
          formData.value = {
            stationName: newStation.stationName,
            latitude: newStation.latitude.toString(),
            longitude: newStation.longitude.toString(),
            status: newStation.status,
            powerOutput: newStation.powerOutput(),
            connectorType: newStation.connectorType,
          };
        }
      },
      { immediate: true }
    );

    const handleSubmit = () => {
      loading.value = true;

      setTimeout(() => {
        emit("save", {
          ...formData.value,
          latitude: parseFloat(formData.value.latitude),
          longitude: parseFloat(formData.value.longitude),
          powerOutput: parseInt(formData.value.powerOutput),
        });
        loading.value = false;
      }, 800);
    };

    return {
      loading,
      formData,
      handleSubmit,
    };
  },
};
</script>
