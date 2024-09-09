
<script setup lang="ts">

definePageMeta({
  middleware: 'auth'
});

    useHead({
        title: 'Data unit kerja',
    });

    const { getAllUnitKerja, deleteUnitKerja  } = useUnitKerja()
      

    const unitKerja = await getAllUnitKerja();
    

    const del = async (id: String) => {

        await deleteUnitKerja(id).then(() => {refreshNuxtData()}).catch((error) => {console.log(error)});
    }

</script>

<template>
    <div class="container mx-auto px-4 py-8">
      <div class="mb-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">Daftar Unit Kerja</h1>
        <NuxtLink 
          to="/unit-kerja/create" 
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow transition duration-300 mr-2 sm:mb-0 hidden sm:inline-block">
          Tambah Data
        </NuxtLink>
        <button 
            @click="$router.push('/unit-kerja/create')"
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
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(data, index) in unitKerja" :key="index">
                <td class="px-6 py-4 whitespace-nowrap">{{ data.nama }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ data.kode }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <NuxtLink 
                    :to="`/unit-kerja/edit/${data.id}`" 
                    class="text-indigo-600 hover:text-indigo-900 mr-2">
                    Edit
                  </NuxtLink>
                  <button 
                    @click="del(data.id)" 
                    class="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
              <tr v-if="unitKerja.length === 0">
                <td colspan="3" class="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                  Tidak ada data unit kerja
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>