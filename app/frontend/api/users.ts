export const getUser = async (userId: number) => {
    const response = await fetch(`/api/v1/users/${userId}`, {
        headers: {
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }

    return response.json();
};
