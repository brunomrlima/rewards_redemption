export const getRewards = async () => {
    const response = await fetch("/api/v1/rewards", {
        headers: { Accept: "application/json" },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch rewards");
    }

    return response.json();
};
