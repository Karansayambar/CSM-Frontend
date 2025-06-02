<template>
  <div class="success-message">
    <CheckCircle class="icon" />
    {{ message }}
  </div>
</template>

<script>
import { CheckCircle } from "lucide-vue-next";

export default {
  name: "SuccessMessage",
  components: {
    CheckCircle,
  },
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>
