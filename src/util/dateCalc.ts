import { differenceInCalendarDays, parse } from 'date-fns';

// 생일로 부터 몇일째 되는지 계산하는 함수
export function getDayNumbers(date: string) {
    if (date) {
        const inputDate = parse(date, 'yyyyMMdd', new Date());

        const currentDate = new Date();

        const daysDifference = differenceInCalendarDays(currentDate, inputDate);

        return daysDifference;
    }
}

// 몇일째 되는 일수를 30으로 나눠서 개월수를 계산하는 함수
export function getStepNumber(date: string) {
    const days = getDayNumbers(date);
    if (days !== undefined) {
        const step = Math.floor(days / 30);
        return step;
    }
}
