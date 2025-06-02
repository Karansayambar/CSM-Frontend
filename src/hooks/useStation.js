import axios from "axios";
import { ref, computed, inject } from "vue";

// const initialStations = [
//   {
//     id: 1,
//     name: "Koregaon Park EV Hub",
//     latitude: 18.5362,
//     longitude: 73.9006,
//     status: "Active",
//     powerOutput: 120,
//     connectorType: "CCS",
//     createdBy: { name: "Karan Admin", email: "karan@example.com" },
//   },
//   {
//     id: 2,
//     name: "JM Road Fast Charger",
//     latitude: 18.5196,
//     longitude: 73.8415,
//     status: "Active",
//     powerOutput: 50,
//     connectorType: "Type 2",
//     createdBy: { name: "Karan Admin", email: "karan@example.com" },
//   },
//   {
//     id: 3,
//     name: "Baner EV Station",
//     latitude: 18.559,
//     longitude: 73.786,
//     status: "Inactive",
//     powerOutput: 75,
//     connectorType: "CHAdeMO",
//     createdBy: { name: "Karan Admin", email: "karan@example.com" },
//   },
//   {
//     id: 4,
//     name: "Hinjewadi Phase 1 Charger",
//     latitude: 18.5946,
//     longitude: 73.738,
//     status: "Active",
//     powerOutput: 100,
//     connectorType: "CCS",
//     createdBy: { name: "Karan Admin", email: "karan@example.com" },
//   },
//   {
//     id: 5,
//     name: "Magarpatta Cybercity EV Point",
//     latitude: 18.5185,
//     longitude: 73.9341,
//     status: "Active",
//     powerOutput: 60,
//     connectorType: "Type 1",
//     createdBy: { name: "Karan Admin", email: "karan@example.com" },
//   },
//   {
//     id: 6,
//     name: "Pimpri Chinchwad Charger",
//     latitude: 18.627,
//     longitude: 73.8007,
//     status: "Inactive",
//     powerOutput: 40,
//     connectorType: "Type 2",
//     createdBy: { name: "Karan Admin", email: "karan@example.com" },
//   },
//   {
//     id: 7,
//     name: "Deccan Gymkhana Rapid Charger",
//     latitude: 18.5196,
//     longitude: 73.8446,
//     status: "Active",
//     powerOutput: 150,
//     connectorType: "CCS",
//     createdBy: { name: "Karan Admin", email: "karan@example.com" },
//   },
//   {
//     id: 8,
//     name: "Viman Nagar EV Station",
//     latitude: 18.5679,
//     longitude: 73.9143,
//     status: "Coming Soon",
//     powerOutput: 80,
//     connectorType: "CHAdeMO",
//     createdBy: { name: "Karan Admin", email: "karan@example.com" },
//   },
//   {
//     id: 9,
//     name: "Kothrud EV Fast Charge",
//     latitude: 18.5074,
//     longitude: 73.8077,
//     status: "Active",
//     powerOutput: 70,
//     connectorType: "Type 2",
//     createdBy: { name: "Karan Admin", email: "karan@example.com" },
//   },
//   {
//     id: 10,
//     name: "Hadapsar Industrial Area Station",
//     latitude: 18.5089,
//     longitude: 73.9443,
//     status: "Under Maintenance",
//     powerOutput: 60,
//     connectorType: "Type 1",
//     createdBy: { name: "Karan Admin", email: "karan@example.com" },
//   },
// ];

const API_URL = "http://localhost:3000/api/charger";

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
      const response = await axios.get(API_URL);
      console.log(response.data.stationList);
      stations.value = response.data.stationList;
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
      const response = await axios.post(`${API_URL}/add-charger-station`, {
        stationData,
        // token,
      });
      const result = await response.data;
      if (!result && result.message) {
        console.log("Station added:", result);
      } else {
        console.log("Data not saved");
      }
    } catch (error) {
      console.error("API error:", error);
    } finally {
      loading.value = false;
    }
  };

  const updateStation = async (stationId, stationData) => {
    loading.value = true;
    try {
      const response = await axios.put(`${API_URL}/update/${stationId}`, {
        stationData,
      });
      const result = await response.data;
      if (!result && result.message) {
        console.log("Station added:", result);
      } else {
        console.log("Data not saved");
      }
    } catch (error) {
      console.error("API error:", error);
    } finally {
      loading.value = false;
    }
  };

  const deleteStation = async (stationId) => {
    loading.value = true;
    try {
      const response = await axios.delete(`${API_URL}/delete/${stationId}`);
      console.log("Station deleted successfully:", response.data);
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
