<script setup lang="ts">

    const router = useRouter()
    const route = useRoute()
    
    const store = useLoginStore();

    onBeforeMount(() => {
        console.log(route.path)
    })

    const logoutt = () => {
        console.log('logout')
        store.logOut()
    }

</script>

<template>

    <header class="w-full bg-[#203983] min-h-[12vh] pl-[20%] pr-9 flex items-center justify-between">
        <div class="col1">
            <!-- TODO: Display Breadcrumbs dynamicly  -->
            <UBreadcrumb
                divider="/"
                :links="[{ label: 'PBGYM', to: '/' }, { label: 'Panel Użytkownika', to: '/twoj-profil'}]"
            />
        </div>
        <div class="col2">
            <UButton
                class="bg-[#203983] hover:bg-[#617F9B]"
                to="/twoj-profil/ustawienia-konta"
                icon="i-ic-baseline-settings"
            >
                Ustawienia konta
            </UButton>

            <UButton
                class="bg-[#203983] hover:bg-[#617F9B]"
                @click="logoutt"
                icon="i-ic-baseline-logout"
            >
                Wyloguj
            </UButton>
            
        </div>
    </header>

</template>

<style scoped>

</style>