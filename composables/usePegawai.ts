export const usePegawai = () => {
    const config = useRuntimeConfig();

    const createPegawai = async (formData: any) => {
        await $fetch(`${config.public.apiBase}/pegawai`, {
            headers : {
                authorization : `Bearer ${useToken().getToken}`,
                'x-csrf-token': useToken().csrfToken || ''
            }, 
            method: 'POST',
            body: formData,
            credentials: 'include'
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
            },
            credentials: 'include'
        }));
    
        return pegawai.value;
    };

    const getByIdPegawai = async (id: any) => {
        const { data: pegawai } : any = await useFetch(`${config.public.apiBase}/pegawai/${id}`, {
            headers : {
                authorization : `Bearer ${useToken().getToken}`
            }, 
            credentials: 'include'
        });

        return pegawai;
    };

    const updatePegawai = async (id: any, formData: any) => {
        await $fetch(`${config.public.apiBase}/pegawai/${id}`, {
            headers : {
                authorization : `Bearer ${useToken().getToken}`,
                'x-csrf-token': useToken().csrfToken || ''
            }, 
            method: 'PUT',
            body: formData,
            credentials: 'include'
        });
    };

    const deletePegawai = async (id: any) => {
        await $fetch(`${config.public.apiBase}/pegawai/${id}`, {
            headers: {
                authorization: `Bearer ${useToken().getToken}`,
                'x-csrf-token': useToken().csrfToken || ''
            },
            method: 'DELETE',
            credentials: 'include'
        });
    };

    return { createPegawai, getByIdPegawai, updatePegawai, getAllPegawai, deletePegawai };
};