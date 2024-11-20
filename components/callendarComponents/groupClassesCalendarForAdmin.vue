<script lang="ts" setup>
import '@vuepic/vue-datepicker/dist/main.css'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { pl } from 'date-fns/locale';
import type { GroupClassWithTrainer } from '@/types';

const prop = defineProps<{
    groupClasses: GroupClassWithTrainer[];
}>();

const router = useRouter();

const groupClassesStore = useGroupClassesStore();
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

        const classes = prop.groupClasses.filter(groupClass =>
            isSameDay(new Date(groupClass.date), day)
        );

        week.push({ date: day, classes });
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
    toggleDetailClassModal();
};





</script>


<template>

    <div class="w-full max-w-[78vw] flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
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
                        :class="{'cursor-cell hover:bg-slate-100': new Date(day.date) > currentDate }"
                        @click="new Date(day.date) > currentDate ? toggleAddClassModal(new Date(day.date)) : null"
                    >
                        <div class="date">{{ day.date.getDate() }}</div>
                        <div v-for="groupClass in day.classes" :key="groupClass.id" 
                            class="class-item cursor-pointer bg-blue-50 py-2 px-2 my-1 rounded hover:bg-blue-200"
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
                <span class="text-sx text-slate-500 font-normal">{{clickedClasses?.date ? dateWithTimeString(new Date(clickedClasses.date)) : ''}}</span> 
            </h3>
        </template>
        <div class="w-full">
            <div class="addNewGroupClasses flex flex-col rounded-lg px-4 bg-white w-full">
                <h3 class="[word-spacing:4px] font-medium pb-4">Informacje o wybranych zajęciach.</h3>
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
        </div>
        <template #footer>
            <div class="flex flex-row justify-end gap-5">
                <UButton
                        v-if="clickedClasses" 
                        label="Przejdź do panelu oferty" 
                        color="blue" icon="i-material-symbols-edit"
                        @click="router.push(`/admin-panel/zarzadzanie/zajecia/${ 
                            isDateFromPast(new Date(new Date(clickedClasses.date).getTime() + clickedClasses.durationInMinutes * 60000)) 
                              ? 'past' 
                              : 'future' 
                          }/${clickedClasses.id}`)"
                    />
                <UButton label="Anuluj" @click="toggleDetailClassModal()" color="gray" icon="i-material-symbols-cancel" />
            </div>
        </template>
    </UCard>
    </UModal>

    <WorkerComponentsGroupClassesAddGroupClasses v-model:isAddClassesModalOpen="isAddClassesModalOpen" v-model:clickedDate="clickedDate"/>

</template>