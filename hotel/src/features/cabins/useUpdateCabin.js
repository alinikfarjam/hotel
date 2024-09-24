import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
    const queryClient = useQueryClient();

    const { isLoading: editLoading, mutate: editCabin } = useMutation({
        mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
        onSuccess: () => {
            toast.success("Cabin was successfully updated");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { editCabin, editLoading }
}