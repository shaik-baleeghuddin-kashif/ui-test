import { parseISO, format } from 'date-fns';

export const BrowserTime = (isoString: string) => {
    const date = parseISO(isoString);
    return format(date, 'h:mm a - MMM d, yyyy');
}