<!-- pages/jabatan.vue -->
<script setup lang="ts">

useHead({
  title: 'Data Jabatan',
});

definePageMeta({
  middleware: 'auth'
});


const { getAllJabatan, deleteJabatan } = useJabatan();

const jabatan = await getAllJabatan();


const delJabatan = async (id: string) => {
  await deleteJabatan(id).then(() => {refreshNuxtData()}).catch((e)=>{console.log(e)})
};

</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">Daftar Jabatan</h1>
      <NuxtLink 
        to="/jabatan/create" 
        class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow transition duration-300 mr-2 sm:mb-0 hidden sm:inline-block">
          Tambah Data
        </NuxtLink>
        <button 
            @click="$router.push('/jabatan/create')"
            class="bg-green-500 hover:bg-green-600 text-white p-2 rounded shadow transition duration-300 sm:hidden">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </button>
    </div>

    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eselon</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Golongan</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="data in jabatan" :key="data.id">
              <td class="px-6 py-4 whitespace-nowrap">{{ data.nama }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ data.eselon }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ data.golongan }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <NuxtLink 
                  :to="`/jabatan/edit/${data.id}`" 
                  class="text-indigo-600 hover:text-indigo-900 mr-2"
                >
                  Edit
                </NuxtLink>
                <button 
                  @click="delJabatan(data.id)" 
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr v-if="jabatan.length === 0">
              <td colspan="4" class="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                Tidak ada data jabatan
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>