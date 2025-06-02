<template>
  <div class="station-details-container">
    <div class="station-card">
      <div id="map"></div>
      <button @click="$emit('close')" class="close-button">× close</button>
      <div class="station-header">
        <h3 class="station-name">
          <Zap class="icon" /> {{ station.stationName }}
        </h3>
        <span :class="['status-badge', station.status.toLowerCase()]">
          {{ station.status }}
        </span>
      </div>

      <div class="station-container">
        <div class="station-details">
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
        <img src="../../assets/charging.png" style="height: 80px" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { Zap, MapPin, Battery, Plug, Edit, Trash2 } from "lucide-vue-next";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ref, onMounted, watch } from "vue";
import { useStations } from "@/hooks/useStation";
import redPin from "@/assets/redPin.png";
import bluePin from "@/assets/bluePin.png";
export default {
  name: "StationDetails",
  props: {
    station: {
      type: Object,
      required: true,
    },
  },
  components: {
    Zap,
    MapPin,
    Battery,
    Plug,
    Edit,
    Trash2,
  },
  setup(props) {
    const { filteredStations, getStations } = useStations();

    const map = ref(null);
    const group = ref(null);

    onMounted(() => {
      getStations();

      map.value = L.map("map").setView([0, 0], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map.value);

      group.value = L.featureGroup().addTo(map.value);
    });

    watch(filteredStations, (stations) => {
      if (!map.value) return;

      const redIcon = L.icon({
        iconUrl: redPin,
        iconColor: "red",
        iconSize: [35, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      const defaultIcon = L.icon({
        iconUrl: bluePin,
        iconColor: "blue",
        iconSize: [35, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      group.value.clearLayers();

      stations.forEach((station) => {
        const isSelected = String(station._id) === String(props.station._id);

        const marker = L.marker([station.latitude, station.longitude], {
          icon: isSelected ? redIcon : defaultIcon,
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

<style scoped>
.station-details-container {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#map {
  height: 60%;
  width: 100%;
}

.station-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
}

.station-card {
  background: white;
  padding: 24px;
  border-radius: 10px;
  width: 500px;
  height: 500px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 1rem;
}

.close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
  background-color: red;
  border-radius: 5px;
  color: white;
  z-index: 100 !important;
  padding: 3px;
}
</style>
