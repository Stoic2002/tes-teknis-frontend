export const useAuth = () => {

    const config = useRuntimeConfig();

    const csrfToken = ref('');

    const register = async (formData: any) => {
        await $fetch(`${config.public.apiBase}/register`, {

            method: 'POST',

            body: formData
        })
    }

    const login = async (formData: any) => {
       const res:any = await $fetch(`${config.public.apiBase}/login`, {
            method: 'POST',
            body: formData,
            credentials : 'include'
    })  
        const csrf = res.csrfToken;
        localStorage.setItem('X', btoa(csrf));
    }

    const logout = async () => {
        await $fetch(`${config.public.apiBase}/logout`, {
            method: 'POST',
            credentials: 'include'
          });

          localStorage.removeItem('X')
    }


    return { register, login, logout, csrfToken }
}