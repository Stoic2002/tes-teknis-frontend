<script setup lang="ts">
    useHead({
        title: 'Create unit kerja',
    });


    definePageMeta({
      layout: false
    })

    const config = useRuntimeConfig();  

    const router = useRouter();


    const nama     = ref('');
    const kode     = ref('');
    const errors  : any  = ref({});

    const createUnitKerja = async () => {
        
        const formData = {
          nama : nama.value,
          kode : kode.value,
        }

        await $fetch(`${config.public.apiBase}/unit-kerja`, {

            headers : {
            authorization : `Bearer ${getToken}`
            }, 

            method: 'POST',

            body: formData
        })
        .then(() => {
            router.push({ path: "/unit-kerja" });
        })
        .catch((error) => {

            errors.value = error.data
        });
    }


</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <form @submit.prevent="createUnitKerja()">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Unit Kerja</label>
                                <input type="text" class="form-control" v-model="nama" placeholder="Masukkan nama jabatan">
                                <div v-if="errors.nama" class="alert alert-danger mt-2">
                                    <span>{{ errors.nama[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Kode</label>
                                <input type="text" class="form-control" v-model="kode" placeholder="Masukkan kode">
                                <div v-if="errors.kode" class="alert alert-danger mt-2">
                                    <span>{{ errors.kode[0] }}</span>
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