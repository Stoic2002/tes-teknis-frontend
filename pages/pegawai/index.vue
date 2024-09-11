<script setup lang="ts">
import * as XLSX from 'xlsx';

useHead({
    title: 'Data Pegawai',
})

definePageMeta({
  middleware: 'auth'
});

const { deletePegawai, getAllPegawai } = usePegawai();
const { deleteFile } = useFile();

const config = useRuntimeConfig();

const items = ref(6);
const currentPage = ref(1);

const pegawaiData = ref(await getAllPegawai(currentPage.value, items.value));

const unitKerjaOptions = ref<UnitKerja[]>([]);
 
interface UnitKerja {
    id: string;
    nama: string;
    kode: string;
}

const fetchUnitKerja = async () => {
    const units: UnitKerja[] = await $fetch(`${config.public.apiBase}/unit-kerja`, {
        headers: {
            authorization: `Bearer ${useToken().getToken}`
        },
    });
    unitKerjaOptions.value = units;
};

fetchUnitKerja();

const fetchAllPegawai = async () => {
    let allPegawai:any = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        const response = await getAllPegawai(page, items.value);
        allPegawai = allPegawai.concat(response.data);
        page++;
        hasMore = page <= response.totalPages;
    }

    return allPegawai;
};

const del = async (id: String, url: String) => {
    const filenameToDelete = url.split('/').pop();

    try {
        await deletePegawai(id);
        await deleteFile(filenameToDelete);
        pegawaiData.value = await getAllPegawai(currentPage.value, items.value);
    } catch (e) {
        console.log(e);
    }
}

const searchQuery = ref('');
const selectedUnitKerja = ref('');

const filteredPegawai = computed(() => {
    return pegawaiData.value.data.filter((data: any) =>
        data.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
        (selectedUnitKerja.value ? data.unitKerjaId === selectedUnitKerja.value : true)
    );
});

const totalPages = computed(() => pegawaiData.value.totalPages);

const goToPage = async (page: number) => {
    currentPage.value = page;
    pegawaiData.value = await getAllPegawai(currentPage.value, items.value, searchQuery.value, selectedUnitKerja.value);
};

const exportToExcel = async () => {
    const allPegawai = await fetchAllPegawai();

    const pegawaiDataExport = allPegawai.map((data: any) => ({
        'NIP': data.nip,
        'Nama': data.nama,
        'Tempat Lahir': data.tempatLahir,
        'Alamat': data.alamat,
        'Tanggal Lahir': new Date(data.tanggalLahir).toLocaleDateString(),
        'Jenis Kelamin': data.jenisKelamin == 'male' ? 'Laki - laki' : 'Perempuan',
        'Golongan': data.Jabatan.golongan,
        'Eselon': data.Jabatan.eselon,
        'Jabatan': data.Jabatan.nama,
        'Agama': data.agama,
        'Unit Kerja': data.UnitKerja.nama,
        'Nomor HP': data.noHp,
        'NPWP': data.npwp,
    }));

    const worksheet = XLSX.utils.json_to_sheet(pegawaiDataExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Pegawai");
    XLSX.writeFile(workbook, 'Data_Pegawai.xlsx');
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).split('/').join('-');
}
</script>

<template>
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-wrap justify-between items-center mb-2">
        <div class="flex flex-wrap items-center sm:mb-0">
          <NuxtLink 
            to="/pegawai/create" 
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow transition duration-300 mr-2 sm:mb-0 hidden sm:inline-block"
          >
            Tambah Data
          </NuxtLink>
          <button 
            @click="exportToExcel" 
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow transition duration-300 hidden sm:inline-block"
          >
            Cetak
          </button>
          <button 
            @click="$router.push('/pegawai/create')"
            class="bg-green-500 hover:bg-green-600 text-white p-2 rounded shadow transition duration-300 sm:hidden"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </button>
          <button 
            @click="exportToExcel"
            class="bg-blue-500 hover:bg-blue-600 text-white p-2 ml-2 rounded shadow transition duration-300 sm:hidden"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
            </svg>
          </button>
        </div>
        <div class="flex flex-wrap items-center">
          <select 
            v-model="selectedUnitKerja" 
            @change="goToPage(1)" 
            class="form-select w-full sm:w-auto mb-2 sm:mb-0 sm:mr-2 p-2 mt-2 rounded border"
          >
            <option value="">Semua Unit Kerja</option>
            <option v-for="unit in unitKerjaOptions" :key="unit.id" :value="unit.id">{{ unit.nama }}</option>
          </select>
          <input 
            type="text" 
            v-model="searchQuery" 
            @input="goToPage(1)" 
            class="form-input w-full sm:w-auto p-2 rounded border" 
            placeholder="Cari nama..."
          />
        </div>
      </div>
  
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIP</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tempat lahir</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Lahir</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Kelamin</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Golongan</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eselon</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NPWP</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jabatan</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Kerja</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(data, index) in filteredPegawai" :key="index">
                <td class="px-6 py-4 whitespace-nowrap">{{ data.nip }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ data.nama }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ data.tempatLahir }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ data.alamat }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(data.tanggalLahir) }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ data.jenisKelamin == 'male' ? 'L' : 'P' }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ data.Jabatan.golongan }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ data.Jabatan.eselon }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ data.npwp }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ data.Jabatan.nama }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ data.UnitKerja.nama }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <NuxtLink 
                    :to="`/pegawai/detail/${data.id}`" 
                    class="text-green-600 hover:text-green-900 mr-2">
                    Detail
                  </NuxtLink>
                  <button 
                    @click="del(data.id, data.fotoPath)" 
                    class="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
              <tr v-if="filteredPegawai.length === 0">
                <td colspan="6" class="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                  Data tidak ditemukan
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <nav aria-label="Page navigation" class="mt-4">
  <ul class="flex justify-center">
    <li :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }">
      <a 
        class="px-3 py-2 bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 rounded-l-md"
        href="#" 
        @click.prevent="goToPage(currentPage - 1)"
      >
        Previous
      </a>
    </li>
    <li v-for="page in totalPages" :key="page" :class="{ 'bg-gray-200': currentPage === page }">
      <a 
        class="px-3 py-2 bg-white border border-gray-300 text-gray-300 hover:bg-gray-100"
        :class="{ 'text-black': currentPage === page }"
        href="#" 
        @click.prevent="goToPage(page)"
      >
        {{ page }}
      </a>
    </li>
    <li :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }">
      <a 
        class="px-3 py-2 bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 rounded-r-md"
        href="#" 
        @click.prevent="goToPage(currentPage + 1)"
      >
        Next
      </a>
    </li>
  </ul>
</nav>

    </div>
  </template>
  