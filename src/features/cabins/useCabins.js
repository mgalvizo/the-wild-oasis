// Fetches the data
import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export const useCabins = () => {
    const {
        isLoading,
        data: cabins,
        error,
    } = useQuery({
        // Unique data identifier
        queryKey: ['cabins'],
        // The function responsible for querying, needs to return a promise
        queryFn: getCabins,
    });

    return { isLoading, error, cabins };
};
