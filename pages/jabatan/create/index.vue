<script setup lang="ts">
    useHead({
        title: 'Create Data jabatan',
    });


    definePageMeta({
      layout: false
    })

    const config = useRuntimeConfig();  

    const router = useRouter();

    const getToken = useCookie('token').value;

    const nama     = ref('');
    const eselon     = ref('');
    const golongan   = ref('');
    const errors  : any  = ref({});

    const createJabatan = async () => {

        const formData = {
          nama : nama.value,
          eselon : eselon.value,
          golongan : golongan.value
        }
        await $fetch(`${config.public.apiBase}/jabatan`, {

          headers : {
            authorization : `Bearer ${getToken}`
        }, 

            method: 'POST',

            body: formData
        })
        .then(() => {
            router.push({ path: "/jabatan" });
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
                        <form @submit.prevent="createJabatan()">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Jabatan</label>
                                <input type="text" class="form-control" v-model="nama" placeholder="Masukkan nama jabatan">
                                <div v-if="errors.nama" class="alert alert-danger mt-2">
                                    <span>{{ errors.nama[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Eselon</label>
                                <input type="text" class="form-control" v-model="eselon" placeholder="Masukkan eselon">
                                <div v-if="errors.eselon" class="alert alert-danger mt-2">
                                    <span>{{ errors.eselon[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Golongan</label>
                                <input class="form-control" v-model="golongan" placeholder="Masukkan golongan">
                                <div v-if="errors.golongan" class="alert alert-danger mt-2">
                                    <span>{{ errors.golongan[0] }}</span>
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