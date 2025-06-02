<template>
  <div class="station-card">
    <div class="station-header">
      <h3 class="station-name">
        <Zap class="icon" />
        {{ station.stationName }}
      </h3>
      <span :class="['status-badge', station.status.toLowerCase()]">
        {{ station.status }}
      </span>
    </div>

    <div class="station-container">
      <div>
        <div class="station-details" @click="$emit('view-details', station)">
          <p class="detail-item">
            <MapPin class="icon" />
            <strong>Location:</strong> {{ station.latitude }},
            {{ station.longitude }}
          </p>
          <p class="detail-item">
            <Battery class="icon" />
            <strong>Power Output:</strong> {{ station.powerOutput }} kW
          </p>
          <p class="detail-item">
            <Plug class="icon" />
            <strong>Connector:</strong> {{ station.connectorType }}
          </p>
        </div>
        <!-- <p class="detail-item">
        <User class="icon" />
        <strong>Created by:</strong> {{ station.createdBy.name }}
      </p> -->
        <div class="station-actions">
          <button
            @click.stop.prevent="$emit('edit', station, station._id)"
            class="action-button edit"
          >
            <Edit class="icon" />
            Edit
          </button>
          <button
            @click="$emit('delete', station._id)"
            class="action-button delete"
          >
            <Trash2 class="icon" />
            Delete
          </button>
        </div>
      </div>

      <img src="../../assets/charging.png" style="height: 60px" />
    </div>
  </div>
</template>

<script>
import {
  Zap,
  MapPin,
  Battery,
  Plug,
  User,
  Edit,
  Trash2,
} from "lucide-vue-next";
import { ref } from "vue";

export default {
  name: "StationCard",
  components: {
    Zap,
    MapPin,
    Battery,
    Plug,
    User,
    Edit,
    Trash2,
  },
  props: {
    station: {
      type: Object,
      required: true,
    },
  },

  emits: ["edit", "delete"],
};
</script>

<style>
.stations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.station-card {
  background: rgba(105, 183, 214, 0.308);
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: box-shadow 0.2s;
}

.station-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.station-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.station-name {
  font-size: 1.125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge.active {
  background-color: #d1fae5;
  color: #023829;
}

.status-badge.inactive {
  background-color: #dce3e7;
  color: #991b1b;
}
.station-container {
  align-items: center;
  justify-content: space-between;
  display: flex;
}
.station-details {
  margin-bottom: 1rem;
}

.detail-item {
  font-size: 0.875rem;
  color: #0a3147;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

.station-actions {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
}

.action-button.edit {
  background-color: #3b82f6;
  color: white;
}

.action-button.edit:hover {
  background-color: #2563eb;
}

.action-button.delete {
  background-color: #ef4444;
  color: white;
}

.action-button.delete:hover {
  background-color: #dc2626;
}
</style>
