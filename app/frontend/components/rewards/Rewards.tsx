import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getRewards } from "../../api/rewards";
import { RewardCard } from "./RewardCard";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import type { Reward } from "../../types"

const Rewards = () => {

    const { data: rewards, isLoading, isError, error } = useQuery({
        queryKey: ["rewards"],
        queryFn: getRewards
    });

    if (isLoading) return <Loading />;
    if (isError) return <ErrorMessage message={(error as Error).message} />;

    return (
        <div className="container mt-5">
            <h2 className="mb-4 fw-semibold text-center">Redeem Your Rewards</h2>
            <div className="row">
                {rewards?.map((reward: Reward) => (
                    <div key={reward.id} className="col-md-4 mb-4">
                        <RewardCard reward={reward} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rewards;
