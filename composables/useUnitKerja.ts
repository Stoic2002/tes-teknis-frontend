export const useUnitKerja = () => {
    const config = useRuntimeConfig();

    const createUnitKerja = async (formData: any) => {
        await $fetch(`${config.public.apiBase}/unit-kerja`, {
    
            headers : {
              authorization : `Bearer ${useToken().getToken}`,
              'x-csrf-token': useToken().csrfToken || ''
          }, 
    
              method: 'POST',
    
              body: formData,
              credentials: 'include'
          })
      }

    
    const getAllUnitKerja = async () => {
        const { data: unitkerja } : any = await useAsyncData('unitKerja', () => $fetch(`${config.public.apiBase}/unit-kerja`, {
            headers : {
                authorization : `Bearer ${useToken().getToken}`
            }, 
            credentials:'include'
            
        }));

        return unitkerja
    }

    
    const getByIdUnitKerja = async (id: any) => {
        const { data: jabatan } : any = await useFetch(`${config.public.apiBase}/unit-kerja/${id}`, {
            headers : {
                authorization : `Bearer ${useToken().getToken}`
            }, 

            credentials: 'include'
    
        });

        return jabatan
    }

    const updateUnitKerja = async (id: any, formData: any) => {
        await $fetch(`${config.public.apiBase}/unit-kerja/${id}`, {

            headers : {
            authorization : `Bearer ${useToken().getToken}`,
            'x-csrf-token': useToken().csrfToken || ''
            }, 

            method: 'PUT',

            body: formData,

            credentials : 'include'
        })
    }

    const deleteUnitKerja = async (id : any) => {
        await $fetch(`${config.public.apiBase}/unit-kerja/${id}`, {

            headers : {
                authorization : `Bearer ${useToken().getToken}`,
                'x-csrf-token' : useToken().csrfToken
            }, 
    
            method: 'DELETE',

            credentials: 'include'
            });
    }

    return { createUnitKerja, getByIdUnitKerja, updateUnitKerja, getAllUnitKerja, deleteUnitKerja }
} 