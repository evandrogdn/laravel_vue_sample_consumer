<script setup>
import { storeToRefs } from "pinia";
import { reactive } from "vue";
import { useAuthStore } from "../../stores/auth";

const { errors } = storeToRefs(useAuthStore());
const { authenticate } = useAuthStore();

const formData = reactive({
  email: "",
  password: "",
});
</script>

<template>
  <main>
    <h1 class="title">Login to your account</h1>

    <form
      @submit.prevent="authenticate('login', formData)"
      class="w-1/2 mx-auto space-y-3"
    >
      <div>
        <input type="text" v-model="formData.email" placeholder="E-mail" />
        <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>
      </div>
      <div>
        <input
          type="password"
          v-model="formData.password"
          placeholder="Password"
        />
        <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>
      </div>

      <button class="primary-btn">Login</button>
    </form>
  </main>
</template>
