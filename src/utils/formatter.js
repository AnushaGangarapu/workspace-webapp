import { format, parseISO } from 'date-fns';

export const formatDateTime = (dateString) => {
  try {
    const date = parseISO(dateString);
    return format(date, 'dd MMM yyyy, hh:mm a');
  } catch {
    return dateString;
  }
};

export const formatDate = (dateString) => {
  try {
    const date = parseISO(dateString);
    return format(date, 'dd MMM yyyy');
  } catch {
    return dateString;
  }
};

export const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const getLocalISOString = (date) => {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16);
};