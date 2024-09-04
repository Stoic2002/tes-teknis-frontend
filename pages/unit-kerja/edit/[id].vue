<script setup lang="ts">
    useHead({
        title: 'Edit unit kerja',
    });


    definePageMeta({
      layout: false
    })

    const { getByIdUnitKerja, updateUnitKerja } = useUnitKerja();

    const router = useRouter();

    const { id } = useRoute().params;
    

    const jabatan = await getByIdUnitKerja(id);
    
    const nama     = ref(jabatan.value.nama);
    const kode     = ref(jabatan.value.kode);
    const errors  : any  = ref({});

    const update = async () => {
        
        const formData = {
          nama : nama.value,
          kode : kode.value,
        }

        await updateUnitKerja(id, formData).then(() => {router.push({ path: '/unit-kerja'})}).catch((error) => { errors.value = error.data });
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
                                <label class="form-label fw-bold">Unit Kerja</label>
                                <input type="text" class="form-control" v-model="nama" placeholder="nama jabatan">
                                <div v-if="errors.nama" class="alert alert-danger mt-2">
                                    <span>{{ errors.nama[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">kode</label>
                                <input type="text" class="form-control" v-model="kode" placeholder="kode">
                                <div v-if="errors.kode" class="alert alert-danger mt-2">
                                    <span>{{ errors.kode[0] }}</span>
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