
//global token
export const useToken = () => {
    // Because your composable is called in the right place in the lifecycle,
    // useRuntimeConfig will work here
    const getToken = useCookie('__sessionId').value
    const getCsrf = typeof window !== 'undefined' ? localStorage.getItem('X') : null;
    const csrfToken = atob(getCsrf || '');

    return { getToken, csrfToken }
  }