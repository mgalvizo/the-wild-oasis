import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '../../services/apiBookings';

export const useRecentBookings = () => {
    const [searchParams] = useSearchParams();

    const numDays = !searchParams.get('last')
        ? 7
        : Number(searchParams.get('last'));

    // subDays: Subtract the specified number of days from the given date.
    // Necessary to convert to ISOString
    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isLoading, data: bookings } = useQuery({
        queryFn: () => getBookingsAfterDate(queryDate),
        queryKey: ['bookings', `last-${numDays}`],
    });

    return { isLoading, bookings };
};
