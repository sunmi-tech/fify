export type Goal = {
    id: number;
    name: string;
    goalAmount: number;
};

export type CreateGoalInput = {
    name: string;
    goalAmount: number;
};

export type UpdateGoalInput = {
    name?: string;
    goalAmount?: number;
};