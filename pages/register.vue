<script setup lang="ts">

  const router = useRouter();

  definePageMeta({
    layout: false,
  })

  const { register } = useAuth();
  
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const showPassword = ref(false);
  const showConfirmPassword = ref(false);
  const errors  : any  = ref({});
  
  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  };
  
  const toggleConfirmPasswordVisibility = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
  };


  
  const handleRegister = async () => {
    if (password.value !== confirmPassword.value) {
      alert('Password and Confirm Password do not match.');
      return;
    }

     const formData = {
          email : email.value,
          password : password.value,
        }

        await register(formData).then(() => {router.push({ path: "/login" });}).catch((error) => {errors.value = error.data})


  };

  </script>

<template>
    <div class="container min-vh-100 d-flex align-items-center justify-content-center">
      <div class="card border-0 rounded shadow p-4 w-100" style="max-width: 400px;">
        <h2 class="text-center mb-4 fw-bold">Register</h2>
        <form @submit.prevent="handleRegister">
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
          <div class="mb-3 position-relative">
            <label for="confirmPassword" class="form-label fw-bold">Confirm Password</label>
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              v-model="confirmPassword"
              required
              class="form-control"
              placeholder="••••••••"
            />
            <span class="toggle-icon" @click="toggleConfirmPasswordVisibility">
              <i :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </span>
          </div>
          <button type="submit" class="btn btn-primary w-100">Register</button>
        </form>
        <div class="text-center mt-3">
          <p class="text-muted">
            Sudah punya akun?
            <NuxtLink to="/login" class="text-primary fw-bold">Login</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </template>
  
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
  