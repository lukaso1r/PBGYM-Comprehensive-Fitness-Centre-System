<script setup lang="ts">

const items = [
  {
    label: 'Kokpit',
    icon: 'i-ic-sharp-home',
    defaultOpen: true,
    slot: 'kokpit',
    color: 'blue',
    class: 'py-4 hover:bg-sky-100',
  },
  {
    label: 'Aktualności',
    icon: 'i-ic-round-layers',
    defaultOpen: false,
    slot: 'aktualnosci',
    color: 'orange',
    class: 'py-4 hover:bg-sky-100',
    visible: checkPermission(['BLOG']),
  },
  {
    label: 'Zarządzanie',
    icon: 'i-icon-park-outline-switch-button',
    defaultOpen: false,
    slot: 'zarzadzanie',
    color: 'sky',
    class: 'py-4 hover:bg-sky-100',
    visible: checkPermission(['ADMIN', 'MEMBER_MANAGEMENT', 'TRAINER_MANAGEMENT', 'GROUP_CLASS_MANAGEMENT']),
  },
  {
    label: 'Sprzedaż',
    icon: 'i-ic-sharp-local-grocery-store',
    defaultOpen: false,
    slot: 'sprzedaz',
    color: 'emerald',
    class: 'py-4 hover:bg-sky-100',
    visible: checkPermission(['PASS_MANAGEMENT']),
  },
  {
    label: 'Statystyki',
    icon: 'i-material-symbols-query-stats',
    defaultOpen: false,
    slot: 'stats',
    color: 'rose',
    class: 'py-4 hover:bg-sky-100',
    visible: checkPermission(['STATISTICS']),
  },
];

const settings = [
    {
        label: 'Dziennik zdarzeń',
        icon: 'i-ic-baseline-format-align-left',
        defaultOpen: false,
        slot: 'sysLogs',
        color:'gray',
        variant: 'ghost',
        content: 'Lorem ipsum dolor sit amet',
        class: 'py-4 hover:bg-purple-100 ',
        visible: checkPermission(['ADMIN']),
        
    }
]

</script>

<template>

    <nav class=" ">
        <div class="bg-white px-4 py-4 rounded-2xl flex flex-col gap-y-3 ">
            <NuxtLink to="/"><img class="max-w-[80%] my-0 mx-auto " src="/images/logo-blue.svg"/></NuxtLink>
            <hr/>
            <div class="navigationContainer flex flex-col gap-y-0">
                <!-- TODO: change text color to black -->
                <UAccordion :items="items.filter(item => item.visible !== false)" size="sm" variant="ghost">
                    <template #kokpit>
                      <NuxtLink to="/admin-panel">
                        <p class="hover:text-blue-500 pl-9">Start</p>
                      </NuxtLink>
                    </template>
                  
                    <template #zarzadzanie>
                      <NuxtLink to="/admin-panel/zarzadzanie/pracownicy" v-if="checkPermission(['ADMIN'])">
                        <p class="hover:text-blue-500 pl-9">Pracownicy</p>
                      </NuxtLink>
                      <NuxtLink to="/admin-panel/zarzadzanie/klienci" v-if="checkPermission(['MEMBER_MANAGEMENT'])">
                        <p class="hover:text-blue-500 pl-9">Klienci</p>
                      </NuxtLink>
                      <NuxtLink to="/admin-panel/zarzadzanie/trenerzy" v-if="checkPermission(['TRAINER_MANAGEMENT'])">
                        <p class="hover:text-blue-500 pl-9">Trenerzy</p>
                      </NuxtLink>
                      <NuxtLink to="/admin-panel/zarzadzanie/zajecia" v-if="checkPermission(['GROUP_CLASS_MANAGEMENT'])">
                        <p class="hover:text-blue-500 pl-9">Zajęcia</p>
                      </NuxtLink>
                    </template>
                  
                    <template #stats>
                      <NuxtLink to="/admin-panel/statystyki" v-if="checkPermission(['STATISTICS'])">
                        <p class="hover:text-blue-500 pl-9">Statystyki</p>
                      </NuxtLink>
                    </template>
                  
                    <template #sprzedaz>
                      <NuxtLink to="/admin-panel/sprzedaz/oferta" v-if="checkPermission(['PASS_MANAGEMENT'])">
                        <p class="hover:text-blue-500 pl-9">Aktualne oferty</p>
                      </NuxtLink>
                      <NuxtLink to="/admin-panel/sprzedaz/oferta/addNewPass" v-if="checkPermission(['PASS_MANAGEMENT'])">
                        <p class="hover:text-blue-500 pl-9">Dodaj nową ofertę</p>
                      </NuxtLink>
                    </template>
                  
                    <template #aktualnosci>
                      <NuxtLink to="/admin-panel/blog" v-if="checkPermission(['BLOG'])">
                        <p class="hover:text-blue-500 pl-9">Aktualności</p>
                      </NuxtLink>
                    </template>
                </UAccordion>
                
                <hr/>
                
                <p class="pt-4 pl-2 text-slate-600">Serwis</p>
                <UAccordion :items="settings.filter(item => item.visible !== false)" color="primary"
                    variant="soft"
                    size="sm"
                    class="my-2"
                    >
                    <template #sysLogs>
                        <div>
                            <NuxtLink to="/admin-panel/adminLogs" v-if="checkPermission(['ADMIN'])">
                                <p class="hover:text-blue-500 pl-9">Dziennik zdarzeń</p>
                            </NuxtLink>
                        </div>
                    </template>
                </UAccordion>  
            </div>
        </div>
    </nav>

</template>

<style scoped>
    /*TODO: Due to delays, some of the code was written in plain CSS rather than using correct Tailwind practices.  It gonna be changed later*/
</style>