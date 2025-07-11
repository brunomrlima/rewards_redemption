export const createRedemption = async (rewardId: number, userId: number) => {
    const response = await fetch("/api/v1/redemptions", {
        method: "POST",
        headers: {"Content-Type": "application/json", Accept: "application/json"},
        body: JSON.stringify({
            reward_redemption: {
                reward_id: rewardId,
                user_id: userId,
            },
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.join(", ") || "Failed to redeem reward");
    }

    return response.json();
};
