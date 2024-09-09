<script lang="ts" setup>
useHead({
  title: 'Detail Pegawai'
})

definePageMeta({
  layout: false,
  middleware: 'auth'
})

const { getByIdPegawai } = usePegawai();

const { id } = useRoute().params;

const pegawai = await getByIdPegawai(id);

const formattedDate = (date: string) => {
  if (!date) return ''
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('id-ID', options)
}

const showModal = ref(false);

const toggleModal = () => {
  showModal.value = !showModal.value;
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.modal img {
  max-width: 80%;
  max-height: 80%;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}
</style>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Detail Pegawai</h1>
      <NuxtLink :to="`/pegawai/edit/${id}`">
        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105">
          Edit
        </button>
      </NuxtLink>
    </div>
    <div class="flex flex-col md:flex-row items-start bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 shadow-md">
      <img
        :src="`${pegawai.fotoPath}` || 'https://i.pinimg.com/736x/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg'"
        alt="Foto Pegawai"
        class="w-48 h-48 rounded-lg object-cover mb-6 md:mb-0 md:mr-6 shadow-lg cursor-pointer"
        @click="toggleModal"
      />
      <div class="flex-grow">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white rounded-lg p-4 shadow-lg">
            <p class="text-gray-600"><strong>NIP:</strong> {{ pegawai.nip }}</p>
            <p class="text-gray-600"><strong>Nama:</strong> {{ pegawai.nama }}</p>
            <p class="text-gray-600"><strong>Tempat Lahir:</strong> {{ pegawai.tempatLahir || 'N/A' }}</p>
            <p class="text-gray-600"><strong>Tanggal Lahir:</strong> {{ formattedDate(pegawai.tanggalLahir) || 'N/A' }}</p>
            <p class="text-gray-600"><strong>Jenis Kelamin:</strong> {{ pegawai.jenisKelamin == 'male' ? 'Laki - laki' : 'perempuan'}}</p>
          </div>
          <div class="bg-white rounded-lg p-4 shadow-lg">
            <p class="text-gray-600"><strong>Agama:</strong> {{ pegawai.agama }}</p>
            <p class="text-gray-600"><strong>NPWP:</strong> {{ pegawai.npwp || 'N/A' }}</p>
            <p class="text-gray-600"><strong>Alamat:</strong> {{ pegawai.alamat || 'N/A' }}</p>
            <p class="text-gray-600"><strong>No HP:</strong> {{ pegawai.noHp || 'N/A' }}</p>
          </div>
          <div class="bg-white rounded-lg p-4 shadow-lg col-span-full">
            <p class="text-gray-600"><strong>Unit Kerja:</strong> {{ pegawai.UnitKerja?.nama || 'N/A' }}</p>
            <p class="text-gray-600"><strong>Jabatan:</strong> {{ pegawai.Jabatan?.nama || 'N/A' }}</p>
            <p class="text-gray-600"><strong>Eselon:</strong> {{ pegawai.Jabatan?.eselon || 'N/A' }}</p>
            <p class="text-gray-600"><strong>Golongan:</strong> {{ pegawai.Jabatan?.golongan || 'N/A' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for enlarged photo -->
    <div v-if="showModal" class="modal" @click="toggleModal">
      <img :src="pegawai.fotoPath || 'https://i.pinimg.com/736x/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg'" alt="Foto Pegawai" />
    </div>
  </div>
</template>