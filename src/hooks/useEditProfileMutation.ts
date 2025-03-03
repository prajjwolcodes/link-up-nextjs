import { UserProps } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function useEditProfileMutation() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: { bio: string, displayName: string }) => {
            return await axios.post("/api/users/edituser", data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
            toast.success("Saved successfully");


        },
        onError: (error) => {
            if (error instanceof Error) {
                console.log("Error: ", error.stack);
            }
        },
        onSettled: () => {
        }

    });

    return mutation;
}