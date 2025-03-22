

export type AssignedChore = {
    id: string;
    choreId: string;
    accountId: string;
    householdId?: string;
    dueDate: string;
    completed: boolean;
    description?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    pictureUrl?: string;
    points: number;
    icon: string;
};

export type Account = {
    householdId: string;
    id: string
    firstName: string;
    lastName: string;
    email: string;
    pictureUrl: string;
};

export type Chore = {
    id: string;
    description: string;
    householdId: string;
    name: string;
    points: number;
    icon: string;
};

export type User = {
    id: string;
    householdId: string;
}

export type tempElo = {
    id: string,
    elo: number
}

export type Summary = {
    totalSpent: number,
    amountOwed: number,
    roommatePointsAmount: number
}

export type Transaction = {
    owed: number,
    accountId: string,
    name: string
}