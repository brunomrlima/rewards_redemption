import React from "react"
import RedeemButton from "./RedeemButton"
import type { Reward } from "../../types"

type Props = {
    reward: Reward
}

export const RewardCard: React.FC<Props> = ({ reward }) => {
    return (
        <div className="card h-100 shadow border-0">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{reward.title}</h5>
                <p className="card-text text-muted">{reward.description}</p>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="badge rounded-pill badge-soft-green">
                        {reward.cost} pts
                    </span>
                    <RedeemButton rewardId={reward.id} />
                </div>
            </div>
        </div>
    )
}
