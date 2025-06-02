<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">
        {{ isLoginMode ? "Login" : "Register" }}
      </h2>

      <form @submit.prevent="handleSubmit">
        <div v-if="!isLoginMode" class="form-group">
          <label class="form-label">
            <User class="icon" />
            Name
          </label>
          <input
            v-model="authForm.name"
            type="text"
            class="form-input"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">
            <Mail class="icon" />
            Email
          </label>
          <input
            v-model="authForm.email"
            type="email"
            class="form-input"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">
            <Lock class="icon" />
            Password
          </label>
          <input
            v-model="authForm.password"
            type="password"
            class="form-input"
            required
          />
        </div>

        <button type="submit" class="submit-button" :disabled="loading">
          <Loader2 v-if="loading" class="spinner" />
          {{ loading ? "Processing..." : isLoginMode ? "Login" : "Register" }}
        </button>
      </form>

      <p class="toggle-text">
        {{
          isLoginMode ? "Don't have an account?" : "Already have an account?"
        }}
        <button @click="isLoginMode = !isLoginMode" class="toggle-button">
          {{ isLoginMode ? "Register" : "Login" }}
        </button>
      </p>

      <div v-if="error" class="error-message">
        <AlertCircle class="icon" />
        {{ error }}
      </div>
      <div class="login-details">
        <h2>login details</h2>
        <p>email : chargeEV@gmail.com</p>
        <p>password : chargeEV</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineExpose } from "vue";
import { User, Mail, Lock, Loader2, AlertCircle } from "lucide-vue-next";

export default {
  name: "LoginForm",
  components: {
    User,
    Mail,
    Lock,
    Loader2,
    AlertCircle,
  },
  emits: ["login", "show-success"],
  setup(props, { emit }) {
    const isLoginMode = ref(true);
    const loading = ref(false);
    const error = ref("");
    const authForm = ref({
      name: "",
      email: "",
      password: "",
    });

    const handleSubmit = () => {
      error.value = "";
      loading.value = true;

      if (!authForm.value.email || !authForm.value.password) {
        error.value = "Please fill in all required fields";
        loading.value = false;
        return;
      }

      if (!isLoginMode.value && !authForm.value.name) {
        error.value = "Please provide your name";
        loading.value = false;
        return;
      }

      const userData = {
        name: authForm.value.name,
        email: authForm.value.email,
        password: authForm.value.password,
      };

      if (isLoginMode.value) {
        emit("login", userData, isLoginMode);
      } else {
        emit("register", userData, isLoginMode);
      }
      authForm.value = { name: "", email: "", password: "" };
      loading.value = false;
    };

    return {
      isLoginMode,
      loading,
      error,
      authForm,
      handleSubmit,
    };
  },
};
</script>

<style>
.login-container {
  max-width: 28rem;
  margin: 2rem auto;
}

.login-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.login-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  color: #374151;
  font-size: 0.875rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

.form-input,
.form-select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.submit-button {
  width: 100%;
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.submit-button:hover:not(:disabled) {
  background-color: #2563eb;
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.toggle-text {
  margin-top: 1rem;
  text-align: center;
}

.toggle-button {
  color: #3b82f6;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
}

.toggle-button:hover {
  color: #2563eb;
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
}
.login-details {
  border-radius: 12px;
  margin: 30px auto;
  text-align: left;
  font-family: "Poppins", sans-serif;
}

.login-details h2 {
  margin-bottom: 16px;
  font-size: 20px;
  color: #333;
}

.login-details p {
  margin: 10px 0;
  font-size: 15px;
  color: #555;
}

.login-details strong {
  color: #222;
}
</style>
