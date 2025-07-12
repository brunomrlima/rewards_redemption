import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getRewards } from "../api/rewards";
import Loading from "./common/Loading";
import ErrorMessage from "./common/ErrorMessage";
import type { Reward } from "../types"
import RedeemButton from "./RedeemButton";

const Rewards = () => {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["rewards"],
        queryFn: getRewards
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
                                    <RedeemButton rewardId={reward.id} />
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
