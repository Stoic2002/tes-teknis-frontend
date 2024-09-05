<template>
    <div class="container min-vh-100 d-flex align-items-center justify-content-center">
      <div class="card border-0 rounded shadow p-4 w-100" style="max-width: 400px;">
        <h2 class="text-center mb-4 fw-bold">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label fw-bold">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              class="form-control"
              placeholder="you@example.com"
            />
          </div>
          <div class="mb-3 position-relative">
            <label for="password" class="form-label fw-bold">Password</label>
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              required
              class="form-control"
              placeholder="••••••••"
            />
            <span class="toggle-icon" @click="togglePasswordVisibility">
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </span>
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
        <div class="text-center mt-3">
          <p class="text-muted">
            Belum punya akun?
            <NuxtLink to="/register" class="text-primary fw-bold">Register</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const { login } = useAuth();

  const router = useRouter();

  definePageMeta({
    layout: false,
  })
  
  const email = ref('');
  const password = ref('');
  const showPassword = ref(false);
  
  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  };
  
  const handleLogin = async () => {
   const formData = {
    email: email.value,
    password: password.value

   }

   await login(formData).then(() => {router.replace('/')}).catch((e) => {console.log(e)});

    };
  </script>
  
  <style scoped>
  .toggle-icon {
    position: absolute;
    top: 70%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
    color: #6c757d;
    z-index: 10;
  }
  </style>
  