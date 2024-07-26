export const formatCreatedAt = (createdAt) => {
    const now = new Date(createdAt);
    const GMTNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const KoreaTimeDiff = 9 * 60 * 60 * 1000;
    const KoreaNow = new Date(GMTNow + KoreaTimeDiff) ;

    const year = KoreaNow.getFullYear();
    const month = KoreaNow.getMonth();
    const date = KoreaNow.getDate();
    const hours = KoreaNow.getHours();
    const minutes = KoreaNow.getMinutes();
    const seconds = KoreaNow.getSeconds();

    return `${year}.${month}.${date} ${hours}:${minutes}:${seconds}`
}
