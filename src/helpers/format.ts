import { DateTime } from 'luxon';
import numeral from 'numeral';

export const formatRupiah = (value: number | string): string => {
    return numeral(value).format('0,0[.]00');
};

export const parseRupiah = (value: string): number => {
    return numeral(value).value() as number;
};

export const formatPercentage = (value: number | string): string => {
    return numeral(value).format('0,0[.]00%');
};

export const formatDate = (date: Date | string): string => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
    return new Date(date).toLocaleDateString('id-ID', options);
};

export const formatDateTime = (date: Date | string): string => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' } as const;
    return new Date(date).toLocaleDateString('id-ID', options);
};

export const formatToClientTimezone = (date: string): string => {
    const originalDate = DateTime.fromISO(date, { zone: 'utc' });
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return originalDate.setZone(timezone).setLocale('id').toFormat('dd LLLL yyyy, HH:mm');
};

export const ucfirst = (str: string): string => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
};
