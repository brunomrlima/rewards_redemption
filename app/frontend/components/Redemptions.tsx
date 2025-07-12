import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getRedemptions } from "../api/redemptions";
import Loading from "./common/Loading";
import ErrorMessage from "./common/ErrorMessage";
import { useUser } from "../contexts/UserContext";
import type { Redemption } from "../types"
import { RedemptionCard } from "./RedemptionCard";

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
                {redemptions?.map((redemption: Redemption) => (
                    <div key={redemption.id} className="col-md-4 mb-3">
                        <RedemptionCard redemption={redemption} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Redemptions;
