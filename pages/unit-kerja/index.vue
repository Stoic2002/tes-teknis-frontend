
<script setup lang="ts">

// definePageMeta({
//   middleware: ['auth']
// })

    useHead({
        title: 'Data unit kerja',
    });

    const config = useRuntimeConfig();

    const getToken = useCookie('token').value;                


    const { data: unitkerja } : any = await useAsyncData('unitKerja', () => $fetch(`${config.public.apiBase}/unit-kerja`, {
        headers : {
            authorization : `Bearer ${getToken}`
        }, 
        credentials:'include'
        
    }));
    

    const deleteUnitKerja = async (id: String) => {

        await $fetch(`${config.public.apiBase}/unit-kerja/${id}`, {

        headers : {
            authorization : `Bearer ${getToken}`
        }, 

        method: 'DELETE'
        });

        refreshNuxtData()
    }

</script>

<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-12">
                <NuxtLink to="/unit-kerja/create" class="btn btn-md btn-success rounded shadow border-0 mb-3">Tambah Data Unit Kerja</NuxtLink>
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <table class="table table-bordered">
                            <thead class="bg-dark text-white">
                                <tr>
                                    <th scope="col">Nama</th>
                                    <th scope="col">Kode</th>
                                    <th scope="col" style="width:15%">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, index) in unitkerja" :key="index">
                                    <td>{{ data.nama }}</td>
                                    <td>{{ data.kode }}</td>
                                    <td class="text-center">
                                        <NuxtLink :to="`/unit-kerja/edit/${data.id}`" class="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</NuxtLink>
                                        <button @click="deleteUnitKerja(data.id)" class="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>