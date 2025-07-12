import { Redemption } from "../../types";

export const mockRedemptions: Redemption[] = [
    {
        id: 1,
        user_id: 1,
        reward_id: 1,
        reward: {
            id: 1,
            title: "Free Coffee",
            description: "Enjoy a free coffee on us.",
            cost: 100,
        },
    },
    {
        id: 2,
        user_id: 1,
        reward_id: 2,
        reward: {
            id: 2,
            title: "Movie Ticket",
            description: "Redeem for a ticket to any movie.",
            cost: 300,
        },
    },
]