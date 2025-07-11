import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getRewards } from "../api/rewards";
import Loading from "./common/Loading";
import ErrorMessage from "./common/ErrorMessage";

type Reward = {
    id: number;
    title: string;
    description: string;
    cost: number;
};

const Rewards = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["rewards"],
        queryFn: getRewards
    });

    if (isLoading) return <Loading />;
    if (isError) return <ErrorMessage message={(error as Error).message} />;

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Available Rewards</h2>
            <div className="row">
                {data?.map((reward: Reward) => (
                    <div key={reward.id} className="col-md-4 mb-3">
                        <div className="card shadow">
                            <div className="card-body">
                                <h5 className="card-title">{reward.title}</h5>
                                <p className="card-text">{reward.description}</p>
                                <span className="badge bg-success">{reward.cost} pts</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rewards;
