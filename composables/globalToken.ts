
//global token
export const useToken = () => {
    // Because your composable is called in the right place in the lifecycle,
    // useRuntimeConfig will work here
    const getToken = useCookie('token').value
  
    // ...

    return { getToken }
  }