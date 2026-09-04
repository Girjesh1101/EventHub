export function getRandomFutureData():string{

    const date = new Date();
    const randomDay = Math.floor(Math.random() * 7) + 1;
    date.setDate(date.getDate() + randomDay);
    date.setUTCHours(9, 0, 0, 0);
    return date.toISOString();
}