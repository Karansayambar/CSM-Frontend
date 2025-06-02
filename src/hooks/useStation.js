import axios from "axios";
import { ref, computed, inject } from "vue";

const API_URL = "https://csm-backend-ihis.onrender.com/api/charger";
// const API_URL = "http://localhost:3000/api/charger";

const token = localStorage.getItem("token");

export function useStations() {
  const auth = inject("auth");
  const stations = ref([]);
  const loading = ref(false);
  const filters = ref({
    status: "",
    powerOutput: "",
    connectorType: "",
  });

  const getStations = async () => {
    loading.value = true;

    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.stationList);
      stations.value = response.data.stationList;
      token;
    } catch (error) {
      console.error("Failed to fetch stations:", error);
    } finally {
      loading.value = false;
    }
  };

  const filteredStations = computed(() => {
    return stations.value.filter((station) => {
      if (filters.value.status && station.status !== filters.value.status) {
        return false;
      }
      if (
        filters.value.powerOutput &&
        station.powerOutput < Number.parseInt(filters.value.powerOutput)
      ) {
        return false;
      }
      if (
        filters.value.connectorType &&
        station.connectorType !== filters.value.connectorType
      ) {
        return false;
      }
      return true;
    });
  });

  const setFilters = (newFilters) => {
    filters.value = newFilters;
  };

  const addStation = async (stationData) => {
    loading.value = true;

    try {
      const response = await axios.post(
        `${API_URL}/add-charger-station`,
        stationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.data;
      if (!result && result.message) {
        console.log("Station added:", result);
      } else {
        console.log("Data not saved");
      }
      await getStations();
    } catch (error) {
      console.error("API error:", error);
    } finally {
      loading.value = false;
    }
  };

  const updateStation = async (stationId, stationData) => {
    console.log("edit button clicked");
    loading.value = true;
    try {
      const response = await axios.put(
        `${API_URL}/update/${stationId}`,
        stationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      if (!result && result.message) {
        console.log("Station added:", result);
      } else {
        console.log("Data not saved");
      }
      await getStations();
    } catch (error) {
      console.error("API error:", error);
    } finally {
      loading.value = false;
    }
  };

  const deleteStation = async (stationId) => {
    loading.value = true;
    try {
      const response = await axios.delete(`${API_URL}/delete/${stationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Station deleted successfully:", response.data);
      await getStations();
    } catch (error) {
      console.error(
        "Error deleting station:",
        error.response?.data || error.message
      );
    } finally {
      loading.value = false;
    }
  };

  return {
    getStations,
    stations,
    filteredStations,
    loading,
    filters,
    setFilters,
    addStation,
    updateStation,
    deleteStation,
  };
}
