export const getRedemptions = async (userId: number) => {
    const response = await fetch(`/api/v1/redemptions?user_id=${userId}`, {
        headers: { "Content-Type": "application/json", Accept: "application/json" },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch redemptions");
    }

    return response.json();
};


export const createRedemption = async (rewardId: number, userId: number) => {
    const response = await fetch(`/api/v1/redemptions?user_id=${userId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json", Accept: "application/json"},
        body: JSON.stringify({
            redemption: {
                reward_id: rewardId,
            },
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.join(", ") || "Failed to redeem reward");
    }

    return response.json();
};
