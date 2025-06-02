<template>
  <div class="map-container">
    <h3 class="map-title">
      <MapPin class="icon" />
      Charging Stations Map
    </h3>

    <div class="map-placeholder">
      <div id="map"></div>
    </div>
    <div v-if="filteredStations.length" class="map-stations">
      <div
        v-for="station in filteredStations"
        :key="station._id"
        class="map-station-card"
      >
        <h4 class="map-station-name">
          <MapPin class="map-pin" />
          {{ station.stationName }}
        </h4>
        <p class="map-station-location">
          {{ station.latitude }}, {{ station.longitude }}
        </p>
        <p class="map-station-details">
          <Battery class="icon" />
          {{ station.powerOutput }}kW - {{ station.connectorType }}
        </p>
        <span :class="['map-status-badge', station.status.toLowerCase()]">
          {{ station.status }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { MapPin, Battery } from "lucide-vue-next";
import { onMounted, watch, ref } from "vue";
import { useStations } from "../../hooks/useStation.js";
import L, { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import bluePin from "@/assets/bluePin.png";

export default {
  name: "MapView",
  components: {
    MapPin,
    Battery,
  },

  setup() {
    const { filteredStations, getStations } = useStations();

    const map = ref(null);
    const group = ref(null);

    onMounted(() => {
      // Fetch station data
      getStations();

      // Initialize map
      map.value = L.map("map").setView([0, 0], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map.value);

      group.value = L.featureGroup().addTo(map.value);
    });

    // Watch for data changes and add markers reactively
    watch(filteredStations, (stations) => {
      if (!map.value) return;
      const defaultIcon = L.icon({
        iconUrl: bluePin,
        iconColor: "blue",
        iconSize: [35, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });
      group.value.clearLayers();

      stations.forEach((station) => {
        const marker = L.marker([station.latitude, station.longitude], {
          icon: defaultIcon,
        }).addTo(group.value);

        marker.bindPopup(`
          <b>${station.stationName}</b><br>
          ${station.powerOutput}kW - ${station.connectorType}<br>
          Status: <strong>${station.status}</strong>
        `);
      });

      if (stations.length > 0) {
        map.value.fitBounds(group.value.getBounds(), { padding: [20, 20] });
      }
    });

    return {
      filteredStations,
    };
  },
};
</script>

<style>
/* Map View */
.map-container {
  background: white;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.map-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.map-placeholder {
  background: linear-gradient(135deg, #dbeafe 0%, #dcfce7 100%);
  height: 34rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #d1d5db;
  box-sizing: border-box;
}
#map {
  width: 100%;
  height: 100%;
}

.map-content {
  text-align: center;
  max-width: 48rem;
}

.map-emoji {
  font-size: 3.75rem;
  margin-bottom: 1rem;
}

.map-text {
  color: #6b7280;
  font-size: 1.125rem;
  font-weight: 500;
}

.map-description {
  font-size: 0.875rem;
  color: #9ca3af;
  margin-top: 0.5rem;
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
}

.map-stations {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  /* max-width: 64rem; */
}

.map-station-card {
  background: white;
  padding: 1rem;
  border-radius: 0.375rem;
  text-align: left;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.247);
  transition: box-shadow 0.2s;
}

.map-station-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.226);
}

.map-station-name {
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
}

.map-pin {
  margin-right: 0.25rem;
  height: 1rem;
  width: 1rem;
  color: #ef4444;
}

.map-station-location {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.map-station-details {
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.map-status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.map-status-badge.active {
  background-color: #d1fae5;
  color: #065f46;
}

.map-status-badge.inactive {
  background-color: #fee2e2;
  color: #991b1b;
}
</style>
