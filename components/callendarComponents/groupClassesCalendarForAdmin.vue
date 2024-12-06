<script lang="ts" setup>
import '@vuepic/vue-datepicker/dist/main.css'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { pl } from 'date-fns/locale';
import type { GroupClassWithTrainer, ActiveMemberPass } from '@/types';

const prop = defineProps<{
    groupClassesUpcoming: GroupClassWithTrainer[];
    groupClassesHistory: GroupClassWithTrainer[];
    singleClass?: GroupClassWithTrainer;
    trainerEmail?: string;
    memberEmail?: string;
    paymentOptionAvailability?: boolean;
    memberPassStatus?: ActiveMemberPass;
}>();

const router = useRouter();
const route = useRoute();

const groupClassesStore = useGroupClassesStore();
const fullDateHourZero = new Date(new Date().setHours(0, 0, 0, 0));
const currentDate = ref(new Date());
const isAddClassesModalOpen = ref(false);
const isClassDetailsModalOpen = ref(false);
const clickedClasses = ref<GroupClassWithTrainer>();
const clickedDate = ref<Date>();

const calendar = computed(() => {
    const start = startOfWeek(startOfMonth(currentDate.value), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentDate.value), { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start, end });

    const weeks = [];
    let week: { date: Date; classes: GroupClassWithTrainer[]; }[] = [];

    // biome-ignore lint/complexity/noForEach: <explanation>
    days.forEach(day => {
        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }

        const classes = ref([] as GroupClassWithTrainer[]);

        if(prop.singleClass){
            classes.value = [prop.singleClass].filter(groupClass => isSameDay(new Date(groupClass.dateStart), day))
        }else{
            console.log('singleClass', 'no single class');
            classes.value = prop.groupClassesUpcoming.filter(groupClass =>
            isSameDay(new Date(groupClass.dateStart), day)
            ).concat(
                prop.groupClassesHistory.filter(groupClass =>
                    isSameDay(new Date(groupClass.dateStart), day)
                )
            );
        }
        week.push({ date: day, classes: classes.value });
    });

    if (week.length) {
        weeks.push(week);
    }

    return weeks;
});

const prevMonth = () => {
    currentDate.value = subMonths(currentDate.value, 1);
};

const nextMonth = () => {
    currentDate.value = addMonths(currentDate.value, 1);
};

const toggleDetailClassModal = () => {
    isClassDetailsModalOpen.value = !isClassDetailsModalOpen.value;
};

const toggleAddClassModal = (date?: Date) => {
    clickedDate.value = date;
    isAddClassesModalOpen.value = !isAddClassesModalOpen.value;
};

const onClickedClass = (groupClass: GroupClassWithTrainer) => {
    clickedClasses.value = groupClass;
    groupClassesStore.getGroupClassesMembers(groupClass.id);
    toggleDetailClassModal();
};

const enrolMemberToGroupClasses = async (email: string) =>{
    console.log('insine enrdol')
    if(clickedClasses.value?.id){
        await groupClassesStore.postEnrollMemberToGroupClass(clickedClasses.value?.id, email);
        clickedClasses.value = groupClassesStore.groupClassesUpcoming.find(groupClass => groupClass.id === clickedClasses.value?.id);

    }else{
        console.log('enrolMemberToGroupClasses', 'no class id');
    }
    console.log('enrolMemberToGroupClasses', email);
}

const removeMemberFromGroupClass = async (id: number, memberEmail: string) => {
    await groupClassesStore.putRemoveMemberFromGroupClass(id, memberEmail);
    clickedClasses.value = groupClassesStore.groupClassesUpcoming.find(groupClass => groupClass.id === clickedClasses.value?.id);
}

const test = () => {
  
    console.log('test', new Date(fullDateHourZero));
};

</script>


<template>

    <div class="w-full lg:max-w-[79vw] lg:min-w-[35vw] flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" 
    :style="{ boxShadow: memberEmail ? '' : '0px 0px 24px -8px rgba(66, 68, 90, 1)' }"   
    >
        <div class="calendar-navigation flex justify-between items-center mb-4  w-full">
            <UButton label="Poprzedni miesiąc" @click="prevMonth" color="blue" />
            <h2 class="text-xl font-semibold">{{ format(currentDate, 'LLLL yyyy', { locale: pl }) }}</h2>
            <UButton label="Następny miesiąc" @click="nextMonth" color="blue" />
        </div>
    
        <table class="calendar-table w-full border-collapse">
            <thead>
                <tr>
                    <th v-for="day in ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz']" :key="day" class="border p-2">{{ day }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="week in calendar" :key="week[0].date.toISOString()">
                    <td v-for="day in week" :key="day.date.toISOString()" 
                        class="border p-2 align-top " 
                        :class="{'cursor-cell hover:bg-slate-100': new Date(day.date) >= fullDateHourZero }"
                        @click="new Date(day.date) >= fullDateHourZero ? toggleAddClassModal(new Date(day.date)) : null"
                    >
                        <div class="date">{{ day.date.getDate() }}</div>
                        <div v-for="groupClass in day.classes.sort((a, b) => Number(new Date(a.dateStart)) - Number(new Date(b.dateStart)))" :key="groupClass.id" 
                            :class="['class-item cursor-pointer  py-2 px-2 my-1 rounded', 
                                {'bg-blue-50 hover:bg-blue-200': new Date(groupClass.dateStart) >= fullDateHourZero}, 
                                {'bg-yellow-50 hover:bg-yellow-200': new Date(new Date(groupClass.dateStart).getTime() + groupClass.durationInMinutes * 60000) < new Date()},
                                {'bg-green-300 hover:bg-green-500': (new Date(groupClass.dateStart) < new Date() && new Date(new Date(groupClass.dateStart).getTime() + groupClass.durationInMinutes * 60000) > new Date() )}
                            ]"
                            @click.stop="onClickedClass(groupClass)"
                        >

                            <p class="text-sm " >
                                {{ groupClass.title }} 
                                <span class="text-sx text-slate-500">{{groupClass.currentMemberCount + "/" + groupClass.memberLimit }}</span>
                            </p>
                            <p class="text-xs text-slate-500">{{ groupClass.trainer.name + " " + groupClass.trainer.surname[0]}}</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <UModal 
        :model-value="isClassDetailsModalOpen"
        :closable="true"
        @close="toggleDetailClassModal()"
        :ui="{}"
    >
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
            <h3 class="font-bold text-lg">
                {{clickedClasses?.title ?? ""}} -  
                <span class="text-sx text-slate-500 font-normal">{{clickedClasses?.dateStart ? dateWithTimeString(new Date(clickedClasses.dateStart)) : ''}}</span> 
            </h3>
        </template>
        <div class="w-full">
            <div class="addNewGroupClasses flex flex-col rounded-lg px-4 bg-white w-full items-center">
                <h3 class="[word-spacing:4px] font-medium pb-4 w-full ">Informacje o wybranych zajęciach.</h3>
                <table>
                    <tr class="pb-2">
                        <td class="font-bold pr-8">Id:</td>
                        <td>{{ clickedClasses?.id }}</td>
                    </tr>
                    <tr class="pb-2">
                        <td class="font-bold pr-8">Tytuł:</td>
                        <td>{{ clickedClasses?.title }}</td>
                    </tr>
                    <tr class="pb-2">
                        <td class="font-bold pr-8">Trener:</td>
                        <td>{{ clickedClasses?.trainer.name + " " + clickedClasses?.trainer.surname }} tel: {{ clickedClasses?.trainer.phoneNumber }}</td>
                    </tr>
                    <tr class="pb-2">
                        <td class="font-bold pr-8">Obecna liczba uczestników:</td>
                        <td>{{ clickedClasses?.currentMemberCount }}</td>
                    </tr>
                    <tr class="pb-2">
                        <td class="font-bold pr-8">Maksymalna liczba uczestników:</td>
                        <td>{{ clickedClasses?.memberLimit }}</td>
                    </tr>
                    <tr class="pb-2">
                        <td class="font-bold pr-8">Czas trwania zajęć:</td>
                        <td>{{ clickedClasses?.durationInMinutes }} minut</td>
                    </tr>
                </table>
            </div>
            <div v-if="memberEmail && clickedClasses" class="flex flex-row items-center gap-8 px-4">
                <div v-if="!groupClassesStore.groupClassesMembers.map((member) => member.email).includes(memberEmail)" class="flex flex-row items-center gap-8 pt-10 px-4">
                    <p>Wybrany klient: <span class="font-medium">{{memberEmail}}</span></p>
                    <UButton 
                        @click.stop="enrolMemberToGroupClasses(memberEmail)" 
                        label="Zapisz klienta na zajęcia" 
                        color="blue" 
                        icon="i-material-symbols-add" 
                        :disabled="clickedClasses.currentMemberCount >= clickedClasses.memberLimit || !paymentOptionAvailability || isObjectEmpty(memberPassStatus)"
                    />
                </div>
                <div v-else class="flex flex-row items-center gap-8 pt-10 px-4">
                    <p>Wybrany klient: <span class="font-medium">{{memberEmail}}</span> <br /> jest zapisany na te zajęcia</p>
                    <UButton 
                        @click.stop="removeMemberFromGroupClass(clickedClasses.id, memberEmail)" 
                        label="Usuń klienta z zajęć" 
                        color="red" 
                        icon="i-material-symbols-delete" 
                    />
                </div>
            </div>
        </div>
        <template #footer>
            <div class="flex flex-row justify-end gap-5">
                
                <UButton
                        v-if="clickedClasses && !route.fullPath.includes('zarzadzanie/zajecia/') " 
                        label="Przejdź do panelu zajęć" 
                        color="blue" icon="i-material-symbols-edit"
                        @click="router.push(`/admin-panel/zarzadzanie/zajecia/${ 
                            isDateFromPast(new Date(new Date(clickedClasses.dateStart).getTime() + clickedClasses.durationInMinutes * 60000)) 
                              ? 'past' 
                              : 'future' 
                          }/${clickedClasses.id}`)"
                    />
                <UButton label="Anuluj" @click="toggleDetailClassModal()" color="gray" icon="i-material-symbols-cancel" />
            </div>
        </template>
    </UCard>
    </UModal>

    <WorkerComponentsGroupClassesAddGroupClasses v-if="!memberEmail" v-model:isAddClassesModalOpen="isAddClassesModalOpen" v-model:clickedDate="clickedDate" :trainerEmail="trainerEmail" />
</template>