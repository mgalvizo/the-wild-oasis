import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBooking } from '../../services/apiBookings';

export const useBooking = () => {
    const { bookingId } = useParams();

    const {
        isLoading,
        data: booking,
        error,
    } = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: () => getBooking(bookingId),
        // Won't retry multiple fetches if an error occurs
        retry: false,
    });

    return { isLoading, error, booking };
};
