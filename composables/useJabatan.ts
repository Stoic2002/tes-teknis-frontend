
export const useJabatan = () => {
  const config = useRuntimeConfig();

  const getAllJabatan = async () => {
    const {data : jabatan} : any = await useAsyncData('jabatan', () => $fetch(`${config.public.apiBase}/jabatan`, {
        headers: {
          authorization: 'Bearer ' + useToken().getToken,
        },
        credentials: 'include'
      }));
    return jabatan;
  };

  const getByIdJabatan = async (id: any) => {
    const { data: jabatan } : any = await useFetch(`${config.public.apiBase}/jabatan/${id}`, {
        headers : {
            authorization : `Bearer ${useToken().getToken}`
        } ,
        credentials: 'include'
    });

    return jabatan;
  }

  const createJabatan = async (formData: any) => {
    await $fetch(`${config.public.apiBase}/jabatan`, {

        headers : {
          authorization : `Bearer ${useToken().getToken}`,
          'x-csrf-token': useToken().csrfToken || ''
      }, 

          method: 'POST',

          body: formData,
          credentials: 'include'
      })
  }

  const deleteJabatan = async (id: string) => {
    await $fetch(`${config.public.apiBase}/jabatan/${id}`, {
      headers: {
        authorization: 'Bearer ' + useToken().getToken,
        'x-csrf-token': useToken().csrfToken || ''
      },
      method: 'DELETE',
      credentials: 'include'
    });

  };

  return {
    getAllJabatan,
    deleteJabatan,
    createJabatan,
    getByIdJabatan
  };
}

interface Jabatan {
  id: string;
  nama: string;
  eselon: string;
  golongan: string;
}