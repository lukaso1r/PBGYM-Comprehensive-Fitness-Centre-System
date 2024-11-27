<script lang="ts" setup>
import '@vuepic/vue-datepicker/dist/main.css'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { pl } from 'date-fns/locale';
import type { GroupClassWithTrainer } from '@/types';

const groupClassesStore = useGroupClassesStore();

const fullDateHourZero = new Date(new Date().setHours(0, 0, 0, 0));
const currentDate = ref(new Date());
const isClassDetailsModalOpen = ref(false);
const clickedClasses = ref<GroupClassWithTrainer>({} as GroupClassWithTrainer);

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
        
        classes.value = groupClassesStore.groupClassesUpcoming.filter(groupClass =>
        isSameDay(new Date(groupClass.date), day)).concat(groupClassesStore.groupClassesHistorical.filter(groupClass => isSameDay(new Date(groupClass.date), day)));
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

const onClickedClass = async (groupClass: GroupClassWithTrainer) => {
    clickedClasses.value = groupClass;
    toggleDetailClassModal();
};

onMounted( async () => {
    await groupClassesStore.getGroupClassesUpcoming();
    await groupClassesStore.getGroupClassesHistorical();
});

</script>


<template>
<div class="w-full lg:max-w-[79vw] lg:min-w-[35vw] flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2">
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
                >
                    <div class="date">{{ day.date.getDate() }}</div>
                    <div v-for="groupClass in day.classes.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)))" :key="groupClass.id" 

                        :class="['class-item cursor-pointer  py-2 px-2 my-1 rounded flex flex-row justify-between items-center', 
                            {'bg-blue-50 hover:bg-blue-200': new Date(groupClass.date) >= fullDateHourZero}, 
                            {'bg-yellow-50 hover:bg-yellow-200': new Date(new Date(groupClass.date).getTime() + groupClass.durationInMinutes * 60000) < new Date()},
                            {'bg-green-300 hover:bg-green-500': (new Date(groupClass.date) < new Date() && new Date(new Date(groupClass.date).getTime() + groupClass.durationInMinutes * 60000) > new Date() )}
                        ]"
                        @click.stop="onClickedClass(groupClass)"
                    >
                        <div>
                            <p class="text-sm flex flex-row gap-1" >
                                {{ groupClass.title }} 
                                <span class="text-sx text-slate-500">{{groupClass.currentMemberCount + "/" + groupClass.memberLimit }}</span>
                            </p>
                            <p class="text-xs text-slate-500">{{ groupClass.trainer.name + " " + groupClass.trainer.surname[0]}}</p>
                        </div>
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
                <span class="text-sx text-slate-500 font-normal">{{clickedClasses?.date ? dateWithTimeString(new Date(clickedClasses.date)) : ''}}</span> 
            </h3>
        </template>
        <div class="w-full flex flex-col gap-8">
            <div class="flex flex-col rounded-lg px-4 bg-white w-full items-center">
                <h3 class="[word-spacing:4px] font-medium pb-4 w-full ">Informacje o wybranych zajęciach.</h3>
                <table>
                    <tr class="pb-2">
                        <td class="font-bold pr-8">Tytuł:</td>
                        <td>{{ clickedClasses?.title }}</td>
                    </tr>
                    <tr class="pb-2">
                        <td class="font-bold pr-8">Trener:</td>
                        <td>{{ clickedClasses?.trainer.name + " " + clickedClasses?.trainer.surname }}</td>
                    </tr>
                    <tr class="pb-2">
                        <td class="font-bold pr-8">Specjalizacje trenera</td>
                        <td>{{ clickedClasses?.trainer.trainerTags.map(tag => trainerTagTranslations[tag]).join(', ') }}</td>
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
        </div>
        <template #footer>
            <div class="flex flex-row justify-end gap-5">
                <UButton label="Anuluj" @click="toggleDetailClassModal()" color="gray" icon="i-material-symbols-cancel" />
            </div>
        </template>
    </UCard>
</UModal>

</template>