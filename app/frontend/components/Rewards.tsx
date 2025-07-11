import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRewards } from "../api/rewards";
import { createRedemption } from "../api/redemptions";
import Loading from "./common/Loading";
import ErrorMessage from "./common/ErrorMessage";
import toast from "react-hot-toast";
import { useUser } from "../contexts/UserContext";
import type { Reward } from "../types"

const Rewards = () => {
    const { userId } = useUser();
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["rewards"],
        queryFn: getRewards
    });

    const mutation = useMutation({
        mutationFn: (rewardId: number) => createRedemption(rewardId, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["redemptions", userId],
            });
            toast.success("Reward redeemed successfully!");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to redeem reward");
        },
    });

    if (isLoading) return <Loading />;
    if (isError) return <ErrorMessage message={(error as Error).message} />;

    return (
        <div className="container mt-5">
            <h2 className="mb-4 fw-semibold text-center">Redeem Your Rewards</h2>
            <div className="row">
                {data?.map((reward: Reward) => (
                    <div key={reward.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow border-0">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title fw-bold">{reward.title}</h5>
                                <p className="card-text text-muted">{reward.description}</p>
                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                    <span className="badge rounded-pill badge-soft-green">{reward.cost} pts</span>
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={() => mutation.mutate(reward.id)}
                                        disabled={mutation.isPending}
                                    >
                                        {mutation.isPending ? "Processing..." : "Redeem"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rewards;
