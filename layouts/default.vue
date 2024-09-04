<template>
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <NuxtLink to="/" class="text-xl font-bold text-gray-800">Dashboard</NuxtLink>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <NuxtLink
                  to="/pegawai"
                  :class="{'bg-gray-200 text-gray-900': isActive('/pegawai')}"
                  class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Data Pegawai
                </NuxtLink>
                <NuxtLink
                    to="/unit-kerja"
                  :class="{'bg-gray-200 text-gray-900': isActive('/unit-kerja')}"
                  class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Unit Kerja
                </NuxtLink>
                <NuxtLink
                  to="/jabatan"
                  :class="{'bg-gray-200 text-gray-900': isActive('/jabatan')}"
                  class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Jabatan
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button @click="logout" class="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div>
        <slot />
    </div>
  </template>
  
  <script setup lang="ts">
  
  // Function to check if the current route is active
  const route = useRoute();

  const router = useRouter();

  const config = useRuntimeConfig();

  const isActive = (path: string) => route.path === path;

  const logout = async () => {

    const response = await $fetch(`${config.public.apiBase}/logout`, {
      method: 'POST',
      credentials : 'include'
    });
    if(response){
      navigateTo('/login', {replace: true})
    }
  }
  </script>
  
  <style scoped>
  /* Additional styling can be added here if needed */
  </style>
  