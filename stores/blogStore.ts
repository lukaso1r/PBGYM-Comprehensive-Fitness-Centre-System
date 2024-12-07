import type { BlogPost, DefaultLoginData } from '~/types'


export const useBlogStore = defineStore('blogStore', () => {

    const allBlogPosts = ref<BlogPost[]>([])
    const editableBlogPost = ref<BlogPost>({} as BlogPost)

    const toast = useToast()
    const config = useRuntimeConfig()
    const backendUrl = config.public.backendUrl
    
    const getAllBlogPosts = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any
        try {
            response = await $fetch<BlogPost[]>('https://pbgym.onrender.com/blog/all',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response) {
                allBlogPosts.value = response
            }
        } catch (error) {
            console.log(error)
        }
    }

    const postNewBlogPost = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any
        try {
            response = await $fetch<BlogPost>('https://pbgym.onrender.com/blog',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(editableBlogPost.value),
            })
            if (response) {
                await getAllBlogPosts()
                toast.add({title: 'Sukces', description: 'Pomyślnie dodano nowy post'})
                editableBlogPost.value = {} as BlogPost
                return true
            }
        } catch (error) {
            console.log(error)
            toast.add({title: 'Błąd', description: 'Nie udało się dodać nowego posta'})
            return false
        }
    }

    const putUpateBlogPost = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any
        try {
            response = await $fetch<BlogPost>('https://pbgym.onrender.com/blog',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(editableBlogPost.value),
            })
            if (response) {
                await getAllBlogPosts()
                toast.add({title: 'Sukces', description: 'Pomyślnie zaktualizowano post'})
                editableBlogPost.value = {} as BlogPost
            }
        } catch (error) {
            console.log(error)
            toast.add({title: 'Błąd', description: 'Nie udało się zaktualizować posta'})
        }
    }

    const deleteBlogPost = async (blogPostId: number) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any
        try {
            response = await $fetch<BlogPost>(`https://pbgym.onrender.com/blog/${blogPostId}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            })
            if (response) {
                await getAllBlogPosts()
                toast.add({title: 'Sukces', description: 'Pomyślnie usunięto post'})
            }
        } catch (error) {
            console.log(error)
            toast.add({title: 'Błąd', description: 'Nie udało się usunąć posta'})
        }
    }


    return {
        allBlogPosts,
        editableBlogPost,

        getAllBlogPosts,
        postNewBlogPost,
        putUpateBlogPost,
        deleteBlogPost
    }

});