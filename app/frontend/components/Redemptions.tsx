import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getRedemptions } from "../api/redemptions";
import Loading from "./common/Loading";
import ErrorMessage from "./common/ErrorMessage";
import { useUser } from "../contexts/UserContext";
import type { Redemption } from "../types"

const Redemptions: React.FC = () => {
    const { userId } = useUser();
    const {
        data: redemptions,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["redemptions", userId],
        queryFn: () => getRedemptions(userId),
    });

    if (isLoading) return <Loading />;
    if (isError) return <ErrorMessage message={(error as Error).message} />;

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Redemption History</h2>
            <div className="row">
                {redemptions?.map((r: Redemption) => (
                    <div key={r.id} className="col-md-4 mb-3">
                        <div className="card shadow">
                            <div className="card-body">
                                <h5 className="card-title">{r.reward.title}</h5>
                                <p className="card-text">{r.reward.description}</p>
                                <span className="badge bg-secondary">
                                  Redeemed for {r.reward.cost} pts
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Redemptions;
