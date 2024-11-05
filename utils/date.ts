export const currentDate = ref(new Date(new Date().setHours(23,59,59)));

export const nextWeekDate = computed(() => {
    return new Date(currentDate.value.getTime() + 7 * 24 * 60 * 60 * 1000);
});

export const weekInMilliseconds = computed(() => {
    return 7 * 24 * 60 * 60 * 1000;
});

export const dateToString = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('pl-PL', options);
};

export const dateToTimeString = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
    return date.toLocaleTimeString('pl-PL', options);
};

export const entryDuration = (dateStart: string, dateExit: string) => {
    const start = new Date(dateStart);
    const exit = new Date(dateExit);
    const duration = exit.getTime() - start.getTime();
    return Math.ceil(duration/1000/60);
};