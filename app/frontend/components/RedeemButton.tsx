import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createRedemption } from "../api/redemptions";
import { useUser } from "../contexts/UserContext";

type Props = {
    rewardId: number;
};

const RedeemButton: React.FC<Props> = ({ rewardId }) => {
    const { userId } = useUser();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => createRedemption(rewardId, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["redemptions", userId] });
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Reward redeemed successfully!");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to redeem reward");
        },
    });

    return (
        <button
            className="btn btn-outline-primary"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
        >
            {mutation.isPending ? "Processing..." : "Redeem"}
        </button>
    );
};

export default RedeemButton;
