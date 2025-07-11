export const currentUser = async () => {
    const response = await fetch(`/api/v1/users/show_user`, {
        headers: { Accept: "application/json" },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }

    return response.json();
};
