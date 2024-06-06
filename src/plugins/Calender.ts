import { useState } from "react";

export function useCalender(daysInMonth: number) {
    function getStartDate(): number {
        const today = new Date().getDate();
        const result = today/7;
        return Math.floor(result) * 7 + 1;
    }

    const [startDate, setStartDate] = useState(getStartDate());

    const goToNextWeek = () => {
        if (startDate + 7 <= daysInMonth) {
            setStartDate(startDate + 7);
        }
    };

    const goToPreviousWeek = () => {
        if (startDate - 7 >= 1) {
            setStartDate(startDate - 7);
        }
    };

    return { startDate, goToNextWeek, goToPreviousWeek };
};

export const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
};

export const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month - 1, 1).getDay();
};

export const getWeeksInMonth = (month: number, year: number) => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDayOfMonth = getFirstDayOfMonth(month, year);
    const weeks = Math.ceil((daysInMonth + firstDayOfMonth) / 7);
    return weeks;
};