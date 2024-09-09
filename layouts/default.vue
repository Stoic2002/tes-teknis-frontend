<script setup lang="ts">
const { logout } = useAuth();
const router = useRouter();
const route = useRoute();

const isActive = (path: string) => route.path === path;

const handleLogout = async () => {
  try {
    await logout();
    router.replace('/login'); // Use router.replace for consistent navigation
  } catch (e) {
    console.error(e);
  }
};

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handleResize = () => {
  isSidebarOpen.value = window.innerWidth >= 1024;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize(); // Initial check
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>


<template>
  <div class="flex flex-col h-screen">
    <!-- Mobile Header -->
    <div class="lg:hidden bg-white shadow-md p-4 flex justify-between items-center">
  <button @click="toggleSidebar" class="text-gray-500 hover:text-gray-700 mr-2">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>
  <NuxtLink to="/" class="text-xl font-bold text-gray-800">Dashboard</NuxtLink>
  <div class="flex items-center">
    
    <button @click="handleLogout" class="text-gray-500 hover:text-gray-700 px-2 py-2 rounded-md transition-colors">
  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
  </svg>
</button>
  </div>
</div>

    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <nav :class="{'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen}" 
           class="bg-white shadow-md w-64 fixed h-full flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 z-30">
        <div class="px-4 py-6">
          <NuxtLink to="/" class="text-xl font-bold text-gray-800 block mb-10 hidden lg:block">Dashboard</NuxtLink>
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
          <button @click="handleLogout" class="bg-red-500 text-white w-full px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors">
            Logout
          </button>
        </div>
      </nav>

      <!-- Overlay -->
      <div v-if="isSidebarOpen" @click="toggleSidebar" class="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"></div>

      <!-- Main Content -->
      <div class="flex-1 p-6 lg:ml-64 overflow-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

