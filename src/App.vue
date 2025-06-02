<template>
  <div id="app">
    <Navigation
      :isAuthenticated="isAuthenticated"
      :user="user"
      @logout="handleLogout"
    />

    <main class="container">
      <LoginForm
        v-if="!isAuthenticated"
        @login="handleLogin"
        @register="handleRegister"
        @show-success="showSuccess"
      />
      <Dashboard v-else @show-success="showSuccess" />
    </main>

    <SuccessMessage v-if="successMessage" :message="successMessage" />
  </div>
</template>

<script>
import { ref, onMounted, provide } from "vue";
import Navigation from "./components/layout/Navigation.vue";
import LoginForm from "./components/auth/LoginForm.vue";
import Dashboard from "./components/dashboard/Dashboard.vue";
import SuccessMessage from "./components/ui/SuccessMessage.vue";
import axios from "axios";
const loginFormRef = ref(null);

// import useRouter from "./hooks/useRouter";

// const router = useRouter();
const API_URL = "http://localhost:3000/api";

export default {
  name: "App",
  components: {
    Navigation,
    LoginForm,
    Dashboard,
    SuccessMessage,
  },
  setup() {
    const isAuthenticated = ref(false);
    const user = ref(null);
    const successMessage = ref("");

    const showSuccess = (message) => {
      successMessage.value = message;
      setTimeout(() => {
        successMessage.value = "";
      }, 3000);
    };

    const handleLogin = async (userData) => {
      console.log("userData", userData);
      try {
        const response = await axios.post(
          `${API_URL}/auth/login-user`,

          userData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.data;
        if (result) {
          localStorage.setItem("token", result.token);
          isAuthenticated.value = true;
          user.value = result.user;
          showSuccess("Login successful!");
          console.log("isLoginMode", isLoginMode);
        } else {
          showSuccess("Login failed. No token received.");
        }
      } catch (error) {
        console.error("Login failed:", error);
        showSuccess("Login failed.");
      }
    };
    const handleRegister = async (userData) => {
      try {
        const response = await axios.post(
          `${API_URL}/auth/register-user`,
          {
            userData,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.data;
        if (result) {
          user.value = result.user;

          showSuccess("Register successful!");
          switchToLoginMode();
        } else {
          showSuccess("Register failed. No token received.");
        }
      } catch (error) {}
      user.value = userData;
      showSuccess("Registration successful!");
    };

    const handleLogout = () => {
      localStorage.clear("token");
      isAuthenticated.value = false;
      user.value = null;
      showSuccess("Logged out successfully");
    };

    // Provide auth context to child components
    provide("auth", {
      user,
      isAuthenticated,
      showSuccess,
    });

    // Auto-login for demo
    onMounted(() => {
      setTimeout(() => {
        const token = localStorage.getItem("token");
        if (token) {
          isAuthenticated.value = true;
          // router.push("/dashboard");
        }
      }, 800);
    });

    return {
      isAuthenticated,
      user,
      successMessage,
      showSuccess,
      handleLogin,
      handleLogout,
      handleRegister,
    };
  },
};
</script>
