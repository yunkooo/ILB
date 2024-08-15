export function chartDateCaculate(date: string) {
    if (date === '') return '';

    const calculatedDate = date.slice(4);
    const month = parseInt(calculatedDate.slice(0, 2), 10);
    const day = parseInt(calculatedDate.slice(2), 10);

    return `${month}월 ${day}일`;
}
