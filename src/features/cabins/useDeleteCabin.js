// Deleting a cabin which is foreign key is assigned to abooking would NOT be possible with this logic.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

export const useDeleteCabin = () => {
    // Get hold of the query client (needed for cache invalidation)
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
        // The function that performs the mutation, same as writing: mutationFn: id => deleteCabinApi(id)
        mutationFn: deleteCabinApi,
        // Invalidate the cache so the deletion is reflected in the UI
        onSuccess: () => {
            toast.success('Cabin successfully deleted');
            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            });
        },
        onError: error => toast.error(error.message),
    });

    return { isDeleting, deleteCabin };
};
