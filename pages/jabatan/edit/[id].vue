<script setup lang="ts">
import auth from '~/middleware/auth';


    //meta title
    useHead({
        title: 'Edit Data jabatan',
    });


    definePageMeta({
      layout: false,
      middleware: 'auth'
    })

    const { getByIdJabatan, createJabatan } = useJabatan();

    //init router
    const router = useRouter();

    //init route
    const { id } = useRoute().params;


    const jabatan = await getByIdJabatan(id);
    
    const nama     = ref(jabatan.value.nama);
    const eselon     = ref(jabatan.value.eselon);
    const golongan   = ref(jabatan.value.golongan);
    const errors  : any  = ref({});

    const update = async () => {
        
        const formData = {
          nama : nama.value,
          eselon : eselon.value,
          golongan : golongan.value
        }

        await createJabatan(formData).then(() => {router.push({path:'/jabatan'})}).catch((error) => {errors.value = error.data})
    }

</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <form @submit.prevent="update()">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Nama Jabatan</label>
                                <input type="text" class="form-control" v-model="nama" placeholder="nama jabatan">
                                <div v-if="errors.nama" class="alert alert-danger mt-2">
                                    <span>{{ errors.nama[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Eselon</label>
                                <input type="text" class="form-control" v-model="eselon" placeholder="eselon">
                                <div v-if="errors.eselon" class="alert alert-danger mt-2">
                                    <span>{{ errors.eselon[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Golongan</label>
                                <input type="text" class="form-control" v-model="golongan" placeholder="golongan">
                                <div v-if="errors.golongan" class="alert alert-danger mt-2">
                                    <span>{{ errors.golongan[0] }}</span>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>