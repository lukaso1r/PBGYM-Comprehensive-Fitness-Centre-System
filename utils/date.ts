export const currentDate = ref(new Date(new Date().setHours(23,59,59)));

export const nextWeekDate = computed(() => {
    return new Date(currentDate.value.getTime() + 7 * 24 * 60 * 60 * 1000);
});

export const weekInMilliseconds = computed(() => {
    return 7 * 24 * 60 * 60 * 1000;
});