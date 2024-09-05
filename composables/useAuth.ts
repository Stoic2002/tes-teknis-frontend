export const useAuth = () => {

    const config = useRuntimeConfig();

    const register = async (formData: any) => {
        await $fetch(`${config.public.apiBase}/register`, {

            method: 'POST',

            body: formData
        })
    }

    const login = async (formData: any) => {
        await $fetch(`${config.public.apiBase}/login`, {
            method: 'POST',
            body: formData,
            credentials : 'include'
    })
    }

    const logout = async () => {
        await $fetch(`${config.public.apiBase}/logout`, {
            method: 'POST',
            credentials: 'include'
          });
    }

    return { register, login, logout }
}