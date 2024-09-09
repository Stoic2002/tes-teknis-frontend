export default defineNuxtRouteMiddleware((to, from) => {
    const token = useToken().getToken;
    if (!token) {
      return navigateTo('/login');
    }
  });