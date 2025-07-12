import React from "react"
import type { Redemption } from "../../types"

type Props = {
    redemption: Redemption
}

export const RedemptionCard: React.FC<Props> = ({ redemption }) => {
    const { reward } = redemption

    return (
        <div className="card shadow">
            <div className="card-body">
                <h5 className="card-title">{reward.title}</h5>
                <p className="card-text">{reward.description}</p>
                <span className="badge bg-secondary">
                    Redeemed for {reward.cost} pts
                </span>
            </div>
        </div>
    )
}
