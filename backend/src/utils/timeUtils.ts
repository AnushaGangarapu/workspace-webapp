import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import { TIMEZONE, PEAK_HOURS } from '../config/constants';

export const parseToUTC = (dateString: string): Date => {
  return zonedTimeToUtc(dateString, TIMEZONE);
};

export const toIST = (date: Date): Date => {
  return utcToZonedTime(date, TIMEZONE);
};

export const isPeakHour = (date: Date): boolean => {
  const istDate = toIST(date);
  const hour = istDate.getHours();
  const day = istDate.getDay();
  
  // Check if weekday (Monday = 1, Friday = 5)
  const isWeekday = day >= 1 && day <= 5;
  if (!isWeekday) return false;
  
  // Check if in peak hours
  return PEAK_HOURS.some(period => hour >= period.start && hour < period.end);
};

export const getHoursDifference = (date1: Date, date2: Date): number => {
  return Math.abs(date2.getTime() - date1.getTime()) / (1000 * 60 * 60);
};
