import moment, { unitOfTime } from 'moment-timezone';

const trimUnitStartTime = (dateString: Date) => {
    
}

export const utcToDate = (dateUtc: string) => {
    const tZoneInfo = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    return moment(dateUtc).tz(tZoneInfo).toDate();
}

export const utcStartOf = (date: string | Date, unitOfTime: unitOfTime.StartOf) => {
    return moment(date).startOf(unitOfTime).fromNow().replaceAll("minute", "min").replaceAll("second", "sec");
}

export default{
    moment,
    utcToDate,
    utcStartOf
}