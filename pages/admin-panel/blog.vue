<script lang="ts" setup>
import type { BlogPost } from '~/types';


const showModalStatus = ref(false)
const blogStore = useBlogStore()

const modalOption = ref('')
const selectedRow = ref<BlogPost>({} as BlogPost)
const posts = ref<BlogPost[]>([])

const actionModal = (option: string, row?: BlogPost ) => {
    console.log('Selected Row:', row);
    toggleActionBlogModal()
    modalOption.value = option;
    if(row){
        selectedRow.value = row;
        if(option === 'edit'){
            blogStore.editableBlogPost = selectedRow.value
        }
    }
};

const toggleActionBlogModal = () => {
    showModalStatus.value = !showModalStatus.value
    if(showModalStatus.value === false){
        blogStore.editableBlogPost = {} as BlogPost
    }
}

const onSubmitAddNewBlogPost = async () => {
    console.log('onSubmitAddNewBlogPost')
    if(await blogStore.postNewBlogPost()){
        toggleActionBlogModal()
    }
}

const deleteBlogPost = async (id: number) => {
    console.log('deleteBlogPost')
    blogStore.deleteBlogPost(id)
    toggleActionBlogModal()
}

onMounted( async () => {
    console.log('onMounted')
    await blogStore.getAllBlogPosts()
    posts.value = blogStore.allBlogPosts 
})

const columns = [
    {
        label: 'Tytuł',
        key: 'title',
        sortable: true,
        searchable: true,
    },
    {
        label: 'Treść',
        key: 'content',
        sortable: true,
        searchable: true,
    },
    {
        label: 'Data utworzenia',
        key: 'postDate',
        sortable: true,
        searchable: true,
    },
    {
        label: 'Akcje',
        key: 'actions',
        sortable: false,
        searchable: false,
    },
]

const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return posts.value
  }

  return posts.value.filter((post) => {
    return Object.values(post).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

</script>


<template>
<workerComponents-header-worker></workerComponents-header-worker>
<div class="flex flex-row bg-[#F5F7F8] items-start pb-10">
    <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>
  

    <main v-if="checkPermission(['BLOG'])" class="min-h-screen content-start basis-4/5 mt-4 flex flex-row flex-wrap items-start justify-start gap-8">
        
        <div class="members-panel-title w-max lg:max-w-[79vw] flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold">Panel zarządzania blogiem</h1>
            <p class="text-slate-500">Możesz z tego miejsca przeglądać i zarządzać zajęciami.</p>
            <UButton class="w-fit" label="Dodaj wpis" @click="actionModal('add')" color="blue" icon="i-material-symbols-add" />
        </div>

          
        <div class="w-full lg:max-w-[79vw] bg-white rounded-lg p-4" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
                <UInput v-model="q" placeholder="Wyszukaj wpis..." />
            </div>  
            <UTable class="w-full" :columns="columns" :rows="filteredRows">
                    
                <template #postDate-data="{ row }">
                    <p>{{ dateWithTimeString(new Date(row.postDate)) }}</p>
                </template>
                <template #actions-data="{ row }">
                    <div class="flex flex-row gap-2">
                        <UButton label="Edytuj" color="blue" icon="i-material-symbols-edit" @click="actionModal('edit', row)" />
                        <UButton label="Usuń" color="red" icon="i-material-symbols-delete" @click="actionModal('delete', row)" />
                    </div>
                </template>
                <template #title-data="{ row }">
                    <p>{{ row.title.slice(0,30)}}...</p>
                </template>
                <template #content-data="{ row }">
                    <p>{{ row.content.slice(0,50)}}...</p>
                </template>
                <template #empty-state>
                    <div class="flex flex-col items-center justify-center py-6 gap-3">
                        <span class="italic text-sm">Brak wpisów</span>
                    </div>
                </template>
                
            </UTable>
        </div>
        
    </main>
    
    <div v-else>
        <p class="text-red-500">Brak uprawnień do przeglądania tej strony</p>
    </div>
</div>

<UModal 
    :model-value="showModalStatus"
    :closable="true"
    @close="toggleActionBlogModal()"
    :ui="{}"
>
    <UCard v-if="modalOption==='add'" :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
            <h3 class="font-bold text-lg">Formularz dodania nowego wpisu</h3>
        </template>
        <div class="w-full">
            <div class="addNewGroupClasses flex flex-col rounded-lg px-4 bg-white w-full">
                <h3 class="[word-spacing:4px] font-medium pb-4">Użyj poniższego formularza aby dodać nowy wpis na blogu.</h3>
                <UForm class="grid grid-cols-2 gap-4 justify-start" :state="blogStore.editableBlogPost"  @submit="onSubmitAddNewBlogPost()">
                    <UFormGroup class="col-span-2" label="Tytuł wpisu" name="title" required>
                        <UInput v-model="blogStore.editableBlogPost.title" type="string" placeholder="Tytuł wpisu" :value="blogStore.editableBlogPost.title"  />
                    </UFormGroup>
                    <UFormGroup class="col-span-2" label="Treść wpisu" name="content" required>
                        <UTextarea v-model="blogStore.editableBlogPost.content" type="string" placeholder="Treść Wpisu" :value="blogStore.editableBlogPost.content" resize  />
                    </UFormGroup>

                    <UButton type="submit" label="Zapisz wpis" color="blue" class="flex flex-row justify-center w-fit" />
                </UForm>
            </div>
        </div>
        <template #footer>
            <div class="flex flex-row justify-end gap-5">
                <UButton label="Anuluj" @click="toggleActionBlogModal()" color="gray" icon="i-material-symbols-cancel" />
            </div>
        </template> 
    </UCard>

    <UCard v-if="modalOption==='edit'"  :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
            <h3 class="font-bold text-lg">Formularz edycji wpisu</h3>
        </template>
        <div class="w-full">
            <div class="addNewGroupClasses flex flex-col rounded-lg px-4 bg-white w-full">
                <h3 class="[word-spacing:4px] font-medium pb-4">Użyj poniższego formularza aby edytować istniejący wpis na blogu.</h3>
                <UForm class="grid grid-cols-2 gap-4 justify-start" :state="blogStore.editableBlogPost"  @submit="onSubmitAddNewBlogPost()">
                    <UFormGroup class="col-span-2" label="Nowy tytuł wpisu" name="title" required>
                        <UInput v-model="blogStore.editableBlogPost.title" type="string" placeholder="Tytuł wpisu" :value="blogStore.editableBlogPost.title"  />
                    </UFormGroup>
                    <UFormGroup class="col-span-2" label="Nowa treść wpisu" name="content" required>
                        <UTextarea v-model="blogStore.editableBlogPost.content" type="string" :rows="15" placeholder="Treść Wpisu" :value="blogStore.editableBlogPost.content" resize />
                    </UFormGroup>

                    <UButton type="submit" label="Zapisz edycję wpisu" color="blue" class="flex flex-row justify-center w-fit" />
                </UForm>
            </div>
        </div>
        <template #footer>
            <div class="flex flex-row justify-end gap-5">
                <UButton label="Anuluj" @click="toggleActionBlogModal()" color="gray" icon="i-material-symbols-cancel" />
            </div>
        </template> 
    </UCard>

    <UCard v-if="modalOption==='delete'"  :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
            <h3 class="font-bold text-lg">Formularz usuwania wpisu</h3>
        </template>
        <div class="w-full">
            <div class="addNewGroupClasses flex flex-col rounded-lg px-4 bg-white w-full">
                <h3 class="[word-spacing:4px] font-medium pb-4">Czy potwierdzasz usunięcie istniejącego wpisu?</h3>
                <div class="flex flex-row justify-end items-center gap-10" v-if="selectedRow.id">
                    <div>
                        <p class=""><span class="text-slate-500">Tytuł:</span> {{selectedRow.title}}</p>
                        <p class=""><span class="text-slate-500">Data utworzenia:</span> {{dateWithTimeString(new Date(selectedRow.postDate))}}</p>
                        <p class="pt-2"><span class="text-slate-500">Treść:</span> {{selectedRow.content}}</p>
                    </div>
                    <UButton label="Tak" @click="deleteBlogPost(selectedRow.id)" color="red" icon="i-material-symbols-delete" />
                </div> 
                <div v-else>
                    <p class="text-red-500">Błąd wczytywania danych</p>
                </div> 
            </div>
        </div>
        <template #footer>
            <div class="flex flex-row justify-end gap-5">
                <UButton label="Anuluj" @click="toggleActionBlogModal()" color="gray" icon="i-material-symbols-cancel" />
            </div>
        </template> 
    </UCard>
</UModal>




</template>