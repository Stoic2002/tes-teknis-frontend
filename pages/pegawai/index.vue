<script setup lang="ts">
import * as XLSX from 'xlsx';

useHead({
    title: 'Data Pegawai',
});

const config = useRuntimeConfig();
const getToken = useCookie('token').value

const items = ref(8);
const currentPage = ref(1);

const { data: allPegawai }: any = await useAsyncData('pegawai', () => $fetch(`${config.public.apiBase}/pegawai`, {
    headers: {
        authorization: `Bearer ${getToken}`
    },
}));

const unitKerjaOptions = ref<UnitKerja[]>([]);

interface UnitKerja {
    id: string;
    nama: string;
    kode: string;
}

const fetchUnitKerja = async () => {
    const units: UnitKerja[] = await $fetch(`${config.public.apiBase}/unit-kerja`, {
        headers: {
            authorization: `Bearer ${getToken}`
        },
    });
    unitKerjaOptions.value = units;
};

fetchUnitKerja();

const deletePegawai = async (id: String, url: String) => {
    const filenameToDelete = url.split('/').pop();

    try {
        await $fetch(`${config.public.apiBase}/pegawai/${id}`, {
            headers: {
                authorization: `Bearer ${getToken}`
            },
            method: 'DELETE'
        });

        await $fetch(`${config.public.apiBase}/delete`, {
            headers: {
                authorization: `Bearer ${getToken}`
            },
            method: 'POST',
            body: {
                fileName: filenameToDelete
            }
        });

        refreshNuxtData()
    } catch (e) {
        console.log(e);
    }
}

const searchQuery = ref('');
const selectedUnitKerja = ref('');

const filteredPegawai = computed(() => {
    return allPegawai.value.filter((data: any) =>
        data.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
        (selectedUnitKerja.value ? data.unitKerjaId === selectedUnitKerja.value : true)
    );
});

const paginatedPegawai = computed(() => {
    const startIndex = (currentPage.value - 1) * items.value;
    const endIndex = startIndex + items.value;
    return filteredPegawai.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(filteredPegawai.value.length / items.value));

const goToPage = (page: number) => {
    currentPage.value = page;
};

const exportToExcel = () => {
    const pegawaiData = filteredPegawai.value.map((data: any) => ({
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

    const worksheet = XLSX.utils.json_to_sheet(pegawaiData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Pegawai");
    XLSX.writeFile(workbook, 'Data_Pegawai.xlsx');
}
</script>

<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-12">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <NuxtLink to="/pegawai/create" class="btn btn-md btn-success rounded shadow border-0 me-2">Tambah Data Pegawai</NuxtLink>
                        <button @click="exportToExcel" class="btn btn-md btn-info rounded shadow border-0 me-2">Cetak</button>
                    </div>
                    <div class="d-flex align-items-center">
                        <select v-model="selectedUnitKerja" class="form-select w-auto me-2">
                            <option value="">Semua Unit Kerja</option>
                            <option v-for="unit in unitKerjaOptions" :key="unit.id" :value="unit.id">{{ unit.nama }}</option>
                        </select>
                        <input type="text" v-model="searchQuery" class="form-control w-auto" placeholder="Cari nama..."/>
                    </div>
                </div>
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <table class="table table-bordered">
                            <thead class="bg-dark text-white">
                                <tr>
                                    <th scope="col">NIP</th>
                                    <th scope="col">Nama</th>
                                    <th scope="col">Tempat Lahir</th>
                                    <th scope="col">NPWP</th>
                                    <th scope="col">Jabatan</th>
                                    <th scope="col">Unit Kerja</th>
                                    <th scope="col" style="width:15%">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, index) in paginatedPegawai" :key="index">
                                    <td>{{ data.nip }}</td>
                                    <td>{{ data.nama }}</td>
                                    <td>{{ data.tempatLahir }}</td>
                                    <td>{{ data.npwp }}</td>
                                    <td>{{ data.Jabatan.nama }}</td>
                                    <td>{{ data.UnitKerja.nama }}</td>
                                    <td class="text-center">
                                        <NuxtLink :to="`/pegawai/detail/${data.id}`" class="btn btn-sm btn-success rounded-sm shadow border-0 me-2">DETAIL</NuxtLink>
                                        <button @click="deletePegawai(data.id, data.fotoPath)" class="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                    </td>
                                </tr>
                                <tr v-if="paginatedPegawai.length === 0">
                                    <td colspan="15" class="text-center">Data tidak ditemukan</td>
                                </tr>
                            </tbody>
                        </table>
                        <nav aria-label="Page navigation" class="mt-4">
                            <ul class="pagination justify-content-center">
                                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                    <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">Previous</a>
                                </li>
                                <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                                    <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
                                </li>
                                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                    <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.pagination .page-link {
  color: #000;
  background-color: #fff;
  border-color: #dee2e6;
}

.pagination .page-link:hover {
  color: #fff;
  background-color: #000;
  border-color: #000;
}

.pagination .page-item.active .page-link {
  color: #fff;
  background-color: #000;
  border-color: #000;
}

.pagination .page-item.disabled .page-link {
  color: #6c757d;
  background-color: #fff;
  border-color: #dee2e6;
}
</style>