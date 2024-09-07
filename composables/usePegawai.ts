export const usePegawai = () => {
    const config = useRuntimeConfig();

    const createPegawai = async (formData: any) => {
        await $fetch(`${config.public.apiBase}/pegawai`, {
            headers : {
                authorization : `Bearer ${useToken().getToken}`
            }, 
            method: 'POST',
            body: formData
        });
    };

    const getAllPegawai = async (page: number = 1, pageSize: number = 6, search: string = '', unitKerja: string = '') => {
        const { data: pegawai }: any = await useAsyncData('pegawai', () => $fetch(`${config.public.apiBase}/pegawai`, {
            headers: {
                authorization: `Bearer ${useToken().getToken}`
            },
            method: 'GET',
            query: {
                page,
                pageSize,
                search,
                unitKerja
            }
        }));
    
        return pegawai.value;
    };

    const getByIdPegawai = async (id: any) => {
        const { data: pegawai } : any = await useFetch(`${config.public.apiBase}/pegawai/${id}`, {
            headers : {
                authorization : `Bearer ${useToken().getToken}`
            }, 
        });

        return pegawai;
    };

    const updatePegawai = async (id: any, formData: any) => {
        await $fetch(`${config.public.apiBase}/pegawai/${id}`, {
            headers : {
                authorization : `Bearer ${useToken().getToken}`
            }, 
            method: 'PUT',
            body: formData
        });
    };

    const deletePegawai = async (id: any) => {
        await $fetch(`${config.public.apiBase}/pegawai/${id}`, {
            headers: {
                authorization: `Bearer ${useToken().getToken}`
            },
            method: 'DELETE'
        });
    };

    return { createPegawai, getByIdPegawai, updatePegawai, getAllPegawai, deletePegawai };
};