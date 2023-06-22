import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export const useBookings = () => {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    // Filter
    const filterValue = searchParams.get('status');
    const filter =
        !filterValue || filterValue === 'all'
            ? null
            : { field: 'status', value: filterValue };

    // Sort
    const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
    const [field, direction] = sortByRaw.split('-');
    const sortBy = { field, direction };

    // Pagination
    const page = !searchParams.get('page')
        ? 1
        : Number(searchParams.get('page'));

    // Query
    const {
        isLoading,
        data: { data: bookings, count } = {},
        error,
    } = useQuery({
        // Whenever a value of the queryKey property array changes the data will be re-fetched
        queryKey: ['bookings', filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    // Pre-fetching
    // Prefetching enhances user experience since it avoids the showing of loading spinners while waiting for the info.
    // Is fetching data that we know might become necessary before we actually need that data to render it on the user interface
    // In the context of pagination means that we fetch the next page before it is actually displayed
    const pageCount = Math.ceil(count / PAGE_SIZE);

    // Will prefetch the next page of what we are currently in, e.g. we are in page 4 it will prefetch page 5
    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        });
    }

    // Will prefetch the previous page of what we are currently in, e.g. we are in page 4 it will prefetch page 3
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        });
    }

    return { isLoading, error, bookings, count };
};
