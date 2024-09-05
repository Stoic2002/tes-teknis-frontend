
<script setup lang="ts">

const route = useRoute();

const config = useRuntimeConfig();

const isActive = (path: string) => route.path === path;

const logout = async () => {
  const response = await $fetch(`${config.public.apiBase}/logout`, {
    method: 'POST',
    credentials: 'include'
  });
  if (response) {
    navigateTo('/login', { replace: true });
  }
}
</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <nav class="bg-white shadow-md w-64 fixed h-full flex flex-col justify-between">
      <div class="px-4 py-6">
        <NuxtLink to="/" class="text-xl font-bold text-gray-800 block mb-10">Dashboard</NuxtLink>
        <div class="flex flex-col space-y-2">
          <NuxtLink
            to="/pegawai"
            :class="{'bg-gray-200 text-gray-900': isActive('/pegawai')}"
            class="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Data Pegawai
          </NuxtLink>
          <NuxtLink
            to="/unit-kerja"
            :class="{'bg-gray-200 text-gray-900': isActive('/unit-kerja')}"
            class="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Unit Kerja
          </NuxtLink>
          <NuxtLink
            to="/jabatan"
            :class="{'bg-gray-200 text-gray-900': isActive('/jabatan')}"
            class="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Jabatan
          </NuxtLink>
        </div>
      </div>
      <div class="px-4 py-6">
        <button @click="logout" class="bg-red-500 text-white w-full px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors">
          Logout
        </button>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="flex-1 p-6 ml-64 overflow-auto">
      <slot />
    </div>
  </div>
</template>

