
<script setup lang="ts">
    useHead({
        title: 'Data jabatan',
    });

    // definePageMeta({
    //     middleware: ['auth']
    // })

    const config = useRuntimeConfig();


    

    interface Jabatan {
        id: string;
        nama: string;
        eselon: string;
        golongan: string;
    }

    const { data: jabatan } = await useFetch<Jabatan[]>(`${config.public.apiBase}/jabatan`,{
        headers : {
            authorization : 'Bearer ' + getToken
        } 
    });

    const deleteJabatan = async (id: String) => {

        await $fetch(`${config.public.apiBase}/jabatan/${id}`, {
        headers : {
            authorization : `Bearer ${getToken}`
        },

        method: 'DELETE'
        });

        refreshNuxtData()
    }

   

</script>

<template>
    <ClientOnly>
        <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-12">
                <NuxtLink to="/jabatan/create" class="btn btn-md btn-success rounded shadow border-0 mb-3">Tambah Data Jabatan</NuxtLink>
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <table class="table table-bordered">
                            <thead class="bg-dark text-white">
                                <tr>
                                    <th scope="col">Nama</th>
                                    <th scope="col">Eselon</th>
                                    <th scope="col">Golongan</th>
                                    <th scope="col" style="width:15%">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="data in jabatan">
                                    <td>{{ data.nama }}</td>
                                    <td>{{ data.eselon }}</td>
                                    <td>{{ data.golongan }}</td>
                                    <td class="text-center">
                                        <NuxtLink :to="`/jabatan/edit/${data.id}`" class="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</NuxtLink>
                                        <button @click="deleteJabatan(data.id)" class="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </ClientOnly>
</template>