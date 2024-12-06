<script lang="ts" setup>

import type { LoggedMemberData,  } from '~/types'

const loggedMemberStore = useLoggedMemberStore()

const loggedMemberData = useCookie<LoggedMemberData>('loggedMemberData');

onMounted( async () => {
    await loggedMemberStore.getGroupClassesMonthlyByEmail(loggedMemberData.value.email)
    await loggedMemberStore.getMemberDailyGymMinutesByEmail(loggedMemberData.value.email)
    await loggedMemberStore.getMemberMonthlyGymEntriesByEmail(loggedMemberData.value.email)
})


</script>


<template>

<header-user-profile></header-user-profile>

<div class="flex bg-[#F5F7F8]">
    <user-profile-navbar class="basis-1/5 max-w-[350px]"></user-profile-navbar>
    <main class=" min-h-svh basis-4/5 -mt-4 grid grid-cols-2 justify-start gap-8 pb-10 items-start">
        <MemberStatsMemberMonthlyGymEntriesByEmail  />
        <MemberStatsGroupClassesMonthlyByEmail :email="loggedMemberData.email" />
        <MemberStatsMemberDailyGymMinutesByEmail :email="loggedMemberData.email" />                   
    </main>

    
</div>
</template>

<style scoped>

</style>