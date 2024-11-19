<script setup lang="ts">

    const router = useRouter()
    const route = useRoute()
    
    const store = useLoginStore();

    onBeforeMount(() => {
        console.log(route.path)
    })

    const logout = () => {
        console.log('logout')
        store.logOut()
    }

    const powiadomienie = () => {
        alert('powiadomienie')
    }

</script>

<template>

    <header class="w-full bg-[#203983] min-h-[12vh] pl-[20%] pr-9 flex items-center justify-between">
            <div class="col1">
                <UBreadcrumb
                    divider="/"
                    :links="[{ label: 'PBGYM', to: '/' }, { label: 'Panel Trenera', to: '/trainer'}]"
                />
            </div>
            <div class="col2">
                

                <UButton
                    class="bg-[#203983] hover:bg-[#617F9B]"
                    to="/trainer/ustawienia-konta"
                    icon="i-ic-baseline-settings"
                >
                    Ustawienia konta
                </UButton>

                <UButton
                    class="bg-[#203983] hover:bg-[#617F9B]"
                    @click="logout"
                    icon="i-ic-baseline-logout"
                >
                    Wyloguj
                </UButton>
            </div>
    </header>

</template>

<style scoped>

/*TODO: */

.fastInfoCard {
    flex-basis: 25%;
}

.fastInfoCardInnerRow {
    justify-content: space-between;
}


</style>