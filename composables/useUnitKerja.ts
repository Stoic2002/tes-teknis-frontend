export const useUnitKerja = () => {
    const config = useRuntimeConfig();

    const createUnitKerja = async (formData: any) => {
        await $fetch(`${config.public.apiBase}/unit-kerja`, {
    
            headers : {
              authorization : `Bearer ${useToken().getToken}`
          }, 
    
              method: 'POST',
    
              body: formData
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
    
        });

        return jabatan
    }

    const updateUnitKerja = async (id: any, formData: any) => {
        await $fetch(`${config.public.apiBase}/unit-kerja/${id}`, {

            headers : {
            authorization : `Bearer ${useToken().getToken}`
            }, 

            method: 'PUT',

            body: formData
        })
    }

    const deleteUnitKerja = async (id : any) => {
        await $fetch(`${config.public.apiBase}/unit-kerja/${id}`, {

            headers : {
                authorization : `Bearer ${useToken().getToken}`
            }, 
    
            method: 'DELETE'
            });
    }

    return { createUnitKerja, getByIdUnitKerja, updateUnitKerja, getAllUnitKerja, deleteUnitKerja }
} 