export const useFile = () => {

    const config = useRuntimeConfig()

    const uploadFile = async (fileData: any) => {
        await $fetch(`${config.public.apiBase}/upload`, {
            method: 'PUT',
            body: fileData,
        })
    }

    const deleteFile = async (fileNameToDelete:any) => {
        await $fetch(`${config.public.apiBase}/delete`, {
            method: 'POST',
            body: {
              fileName: fileNameToDelete
            }})
    }

    return { uploadFile, deleteFile }
}