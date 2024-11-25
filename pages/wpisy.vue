<script lang="ts" setup>

const blogStore = useBlogStore()
const showSeeMoreModal = ref(false)

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const clickedPost = ref({} as any)
const loading = ref(true)

onMounted( async () => {
    console.log('onMounted')
    await blogStore.getAllBlogPosts()
    loading.value = false
})

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const toggleSeeMoreModal = (post?: any) => {
    console.log('toggleSeeMoreModal')
    if(post){
        clickedPost.value = post
    }
    showSeeMoreModal.value = !showSeeMoreModal.value
}

</script>

<template>

<header-web />

<div class="container mx-auto px-4 py-8 lg:w-3/4">
    <img class="absolute top-0 right-0 -z-50" src="/public/images/home-community/community-bubble.svg" alt="" srcset="">
    
    <div id=" promo-section" class="mt-28 mx-[10%] ">
        <div id="onas" class="bg-[#f1f6ff] text-lg text-[#2878FF] font-bold px-6 py-2 w-fit mx-auto tracking-widest rounded-lg ">Blog i aktualności</div>
        <h2 class="font-bold text-4xl text-center py-5">Dowiedz się więcej</h2>
        <p class="text-xl text-center py-1 pb-10">Na bieżąco z najnowszymi trendami fitness i zdrowego stylu życia – inspiracje, porady i ciekawostki, które pomogą Ci osiągnąć Twoje cele!</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-8 items-start">
        <img src="/public/images/home-banner/blob1.svg" alt="" class="absolute left-0 top-0 -z-50">
        <div v-for="post in blogStore.allBlogPosts" :key="post.id" class="bg-white rounded-lg shadow-md overflow-hidden ">
            <div class="p-6">
                <h2 class="text-xl font-bold mb-2">{{ post.title }}</h2>
                <p class="text-gray-600 text-sm mb-4">Opublikowano dnia: {{ dateWithTimeString(new Date(post.postDate)) }}</p>
                <p class="text-gray-800">{{ post.content.length > 120 ? post.content.substring(0, 100) + '...' : post.content }}</p>
                <div class="flex flex-row justify-between items-center pt-6 gap-4">
                    <p v-if="post.lastUpdateDate" class="text-gray-500 text-xs">Aktualizacja: {{ dateWithTimeString(new Date(post.lastUpdateDate)) }}</p>
                    <UButton class="w-fit" label="Czytaj więcej" color="blue" @click="toggleSeeMoreModal(post)" />
                </div>

            </div>
        </div>
        <div v-if="loading" class="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-12 items-start">
            <div v-for="n in 5" :key="n" class="flex flex-col gap-4">
                <USkeleton class="h-9 w-5/6"/>
                <USkeleton class="h-4 w-3/5"/>
                <USkeleton class="h-20 w-full"/>
                <div class="flex flex-row justify-between items-center gap-8">
                    <USkeleton class="h-4 w-3/5"/>
                    <USkeleton class="h-4 w-1/5"/>
                </div>
            </div>
        </div>
        
    </div>
    <div class="relative ">
        <img src="/public/images/home-banner/blob4.svg" alt="" class="absolute left-0 bottom-50 -z-50">
    </div>
</div>

<UModal :model-value="showSeeMoreModal" @close="toggleSeeMoreModal()">
    <div class="p-6">
        <h2 class="text-xl font-bold mb-2">{{ clickedPost.title }}</h2>
        <p class="text-gray-600 text-sm mb-4">Opublikowano dnia: {{ dateWithTimeString(new Date(clickedPost.postDate)) }}</p>
        <p class="text-gray-800">{{ clickedPost.content }}</p>
        <div class="flex flex-row justify-between items-center pt-6 gap-4">
            <p v-if="clickedPost.lastUpdateDate" class="text-gray-500 text-xs">Aktualizacja: {{ dateWithTimeString(new Date(clickedPost.lastUpdateDate)) }}</p>
            <UButton class="w-fit" label="Zamknij" color="blue" @click="toggleSeeMoreModal()" />
        </div>
    </div>
</UModal>

<footer-web/>

</template>


<style scoped>


</style>