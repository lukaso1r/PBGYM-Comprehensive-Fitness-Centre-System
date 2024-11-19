export const currentDate = ref(new Date(new Date().setHours(23,59,59)));

export const nextWeekDate = computed(() => {
    return new Date(currentDate.value.getTime() + 7 * 24 * 60 * 60 * 1000);
});

export const weekInMilliseconds = computed(() => {
    return 7 * 24 * 60 * 60 * 1000;
});

export const dayInMilliseconds = computed(() => {
    return 24 * 60 * 60 * 1000;
});

export const nextDayDate = computed(() => {
    return new Date(currentDate.value.getTime() + 24 * 60 * 60 * 1000);
});

export const nextYearDate = computed(() => {
    return new Date(currentDate.value.getTime() + 365 * 24 * 60 * 60 * 1000);
});

export const dateToString = (date: Date | string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('pl-PL', options);
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

// data zakończenia karnetu
export const passEndDate = (durationInMonths: number) => {
    const start = currentDate.value;
    const end = new Date(start);
    end.setMonth(start.getMonth() + durationInMonths);
    return end;
};

// ile dni zostało
export const daysLeft = (end: Date) => {
    const start = currentDate.value;
    const difference = end.getTime() - start.getTime();
    return Math.ceil(difference/1000/60/60/24);
};

export const dateWithTimeString = (date: Date) => {
    return `${dateToString(date)} ${dateToTimeString(date)}`;
}

export const isDateFromPast = (date: Date) => {
    const currentDate = new Date(); // Pobierz aktualną datę i czas
    return date.getTime() < currentDate.getTime(); // Porównaj czas w milisekundach
}

