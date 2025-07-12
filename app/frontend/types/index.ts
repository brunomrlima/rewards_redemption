export type Reward = {
    id: number;
    title: string;
    description: string;
    cost: number;
};

export type Redemption = {
    id: number;
    user_id: number;
    reward_id: number;
    reward: Reward;
};

export type User = {
    userId: number;
    name: string
    points: number
};