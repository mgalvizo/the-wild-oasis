import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: ({ user }) => {
            toast.success('User account successfully updated');
            // Manually set some data into the React Query Cache
            queryClient.setQueryData(['user'], user);
        },
        onError: error => toast.error(error.message),
    });

    return { updateUser, isUpdating };
};
