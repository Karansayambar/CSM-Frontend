<template>
  <nav class="navigation">
    <div class="nav-container">
      <h1 class="nav-title">
        <Zap class="nav-icon" />
        Charging Station Manager
      </h1>
      <div v-if="isAuthenticated" class="nav-user">
        <span>Welcome, {{ user?.name }}</span>
        <button @click="$emit('logout')" class="logout-button">
          <LogOut class="icon" />
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { Zap, LogOut } from "lucide-vue-next";

export default {
  name: "Navigation",
  components: {
    Zap,
    LogOut,
  },
  props: {
    isAuthenticated: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Object,
      default: null,
    },
  },
  emits: ["logout"],
};
</script>

<style>
/* Navigation */
.navigation {
  background-color: #2564ebc0;
  color: white;
  padding: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-title {
  font-size: 1.25rem;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.nav-icon {
  margin-right: 0.5rem;
  height: 1.5rem;
  width: 1.5rem;
}

.nav-user {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logout-button {
  background-color: #dc2626;
  color: white;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background-color: #b91c1c;
}
</style>
