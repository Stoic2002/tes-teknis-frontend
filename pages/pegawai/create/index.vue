<script setup lang="ts">
import { v4 }  from 'uuid';

useHead({
    title: 'Create Data Pegawai',
});

definePageMeta({
  layout: false,
  middleware:'auth'
})

const { createPegawai } = usePegawai();

const { uploadFile } = useFile();

const { getAllJabatan } = useJabatan();

const { getAllUnitKerja } = useUnitKerja();

const config = useRuntimeConfig();  

const router = useRouter();


const foto = ref<File | null>(null);
const nip = ref('');
const nama = ref('');
const tempatLahir = ref('');
const tanggalLahir = ref('');
const jenisKelamin = ref('');
const agama = ref('');
const alamat = ref('');
const noHp = ref('');
const npwp = ref('');
const unitKerjaId = ref('');
const jabatanId = ref('');
const errors: any = ref({});

const jabatanOptions = ref<Jabatan[]>([]);
const unitKerjaOptions = ref<UnitKerja[]>([]);

interface Jabatan {
        id: string;
        nama: string;
        eselon: string;
        golongan: string;
    }

interface UnitKerja {
        id: string;
        nama: string;
        kode: string;
}

const fetchDropdownData = async () => {
  try {
    const jabatanResponse: Jabatan[] = await $fetch(`${config.public.apiBase}/jabatan`, {
      headers : {
            authorization : `Bearer ${useToken().getToken}`
        }, 
    });
    jabatanOptions.value = jabatanResponse;

    const unitKerjaResponse: UnitKerja[] = await $fetch(`${config.public.apiBase}/unit-kerja`, {
      headers : {
            authorization : `Bearer ${useToken().getToken}`
        }, 
    });
    unitKerjaOptions.value = unitKerjaResponse;
  } catch (error) {
    console.error("Error fetching dropdown data:", error);
  }
};

onMounted(fetchDropdownData);


const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    foto.value = target.files[0];
  }
};

const create = async () => {
  const formattedTanggalLahir = tanggalLahir.value ? new Date(tanggalLahir.value).toISOString() : '';
  const randomString = v4();
  const filename = randomString + foto.value?.name
  const filepath = foto.value ? config.public.apiBase + '/file/' + filename : '';

  const data = new FormData();
    if (foto.value) {
    data.append('fotoPath', foto.value, filename);
    }
  
    const formData = {
      fotoPath: filepath,
      nip: nip.value,
      nama: nama.value,
      tempatLahir: tempatLahir.value,
      tanggalLahir: formattedTanggalLahir,
      jenisKelamin: jenisKelamin.value,
      agama: agama.value,
      alamat: alamat.value,
      noHp: noHp.value,
      npwp: npwp.value,
      unitKerjaId: unitKerjaId.value,
      jabatanId: jabatanId.value,
    };

    await createPegawai(formData).then( async () => {await uploadFile(data); router.push({path:'/pegawai'})}).catch((e) => {console.log(e)});
};

</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <form @submit.prevent="create()">
                          <div class="mb-3">
                            <label class="form-label fw-bold">Upload Foto</label>
                              <input type="file" class="form-control" @change="handleFileChange" accept=".png, .jpg, .jpeg">
                              <div v-if="errors.fotoPath" class="alert alert-danger mt-2">
                                  <span>{{ errors.fotoPath[0] }}</span>
                                </div>

                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">NIP</label>
                                <input type="text" class="form-control" v-model="nip" placeholder="Masukkan NIP">
                                <div v-if="errors.nip" class="alert alert-danger mt-2">
                                    <span>{{ errors.nip[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Nama</label>
                                <input type="text" class="form-control" v-model="nama" placeholder="Masukkan nama pegawai">
                                <div v-if="errors.nama" class="alert alert-danger mt-2">
                                    <span>{{ errors.nama[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Tempat Lahir</label>
                                <input type="text" class="form-control" v-model="tempatLahir" placeholder="Masukkan tempat lahir">
                                <div v-if="errors.tempatLahir" class="alert alert-danger mt-2">
                                    <span>{{ errors.tempatLahir[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Tanggal Lahir</label>
                                <input type="date" class="form-control" v-model="tanggalLahir">
                                <div v-if="errors.tanggalLahir" class="alert alert-danger mt-2">
                                    <span>{{ errors.tanggalLahir[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Jenis Kelamin</label>
                                <select class="form-control" v-model="jenisKelamin">
                                    <option value="" disabled>Pilih Jenis Kelamin</option>
                                    <option value="male">Laki-laki</option>
                                    <option value="female">Perempuan</option>
                                </select>
                                <div v-if="errors.jenisKelamin" class="alert alert-danger mt-2">
                                    <span>{{ errors.jenisKelamin[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Agama</label>
                                <select class="form-control" v-model="agama">
                                    <option value="" disabled>Pilih Agama</option>
                                    <option value="islam">Islam</option>
                                    <option value="kristen">Kristen</option>
                                    <option value="katolik">Katolik</option>
                                    <option value="hindu">Hindu</option>
                                    <option value="buddha">Buddha</option>
                                    <option value="konghucu">Konghucu</option>
                                </select>
                                <div v-if="errors.agama" class="alert alert-danger mt-2">
                                    <span>{{ errors.agama[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Alamat</label>
                                <input type="text" class="form-control" v-model="alamat" placeholder="Masukkan alamat">
                                <div v-if="errors.alamat" class="alert alert-danger mt-2">
                                    <span>{{ errors.alamat[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">No HP</label>
                                <input type="text" class="form-control" v-model="noHp" placeholder="Masukkan no HP">
                                <div v-if="errors.noHp" class="alert alert-danger mt-2">
                                    <span>{{ errors.noHp[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">NPWP</label>
                                <input type="text" class="form-control" v-model="npwp" placeholder="Masukkan NPWP">
                                <div v-if="errors.npwp" class="alert alert-danger mt-2">
                                    <span>{{ errors.npwp[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Unit Kerja</label>
                                <select class="form-control" v-model="unitKerjaId">
                                    <option value="" disabled>Pilih Unit Kerja</option>
                                    <option v-for="unit in unitKerjaOptions" :key="unit.id" :value="unit.id">{{ unit.nama }}</option>
                                </select>
                                <div v-if="errors.unitKerjaId" class="alert alert-danger mt-2">
                                    <span>{{ errors.unitKerjaId[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Jabatan</label>
                                <select class="form-control" v-model="jabatanId">
                                    <option value="" disabled>Pilih Jabatan</option>
                                    <option v-for="jabatan in jabatanOptions" :key="jabatan.id" :value="jabatan.id">{{ jabatan.nama }}</option>
                                </select>
                                <div v-if="errors.jabatanId" class="alert alert-danger mt-2">
                                    <span>{{ errors.jabatanId[0] }}</span>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Tambahkan CSS sesuai kebutuhan */
</style>
