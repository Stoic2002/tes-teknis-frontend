export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token').value;
    if (to.meta.requiresAuth && !token) {
      return navigateTo('/login');
    }
  });