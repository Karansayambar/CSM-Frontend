<template>
  <div>
    <div class="tabs-container">
      <div class="tabs-border">
        <nav class="tabs-nav">
          <button
            @click="activeTab = 'list'"
            :class="[
              'tab',
              activeTab === 'list' ? 'tab-active' : 'tab-inactive',
            ]"
          >
            <List class="tab-icon" />
            Charging Stations
          </button>
          <button
            @click="activeTab = 'map'"
            :class="[
              'tab',
              activeTab === 'map' ? 'tab-active' : 'tab-inactive',
            ]"
          >
            <MapPin class="tab-icon" />
            Map View
          </button>
        </nav>
      </div>
    </div>

    <StationsList
      v-if="activeTab === 'list'"
      @show-success="$emit('show-success', $event)"
    />
    <MapView v-else />
  </div>
</template>

<script>
import { ref } from "vue";
import { List, MapPin } from "lucide-vue-next";
import StationsList from "./StationList.vue";
import MapView from "./MapView.vue";

export default {
  name: "Dashboard",
  components: {
    List,
    MapPin,
    StationsList,
    MapView,
  },
  emits: ["show-success"],
  setup() {
    const activeTab = ref("list");

    return {
      activeTab,
    };
  },
};
</script>

<style>
.tabs-container {
  margin-bottom: 1.5rem;
}

.tabs-border {
  border-bottom: 1px solid #e5e7eb;
}

.tabs-nav {
  display: flex;
  gap: 2rem;
  margin-bottom: -1px;
}

.tab {
  padding: 0.5rem 0.25rem;
  border-bottom: 2px solid transparent;
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-active {
  border-bottom-color: #3b82f6;
  color: #2563eb;
}

.tab-inactive {
  color: #6b7280;
}

.tab-inactive:hover {
  color: #374151;
  border-bottom-color: #d1d5db;
}

.tab-icon {
  margin-right: 0.25rem;
  height: 1rem;
  width: 1rem;
}
</style>
