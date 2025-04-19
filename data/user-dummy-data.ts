export type TUser = {
    id: string;
    username: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export const userData: TUser[] = [
    {
        id: "USR001",
        username: "admin",
        password: "admin123",
        role: "admin",
        createdAt: "2024-01-01T08:00:00.000Z",
        updatedAt: "2024-01-01T08:00:00.000Z"
    },
    {
        id: "USR002",
        username: "staff1",
        password: "staff123",
        role: "staff",
        createdAt: "2024-01-02T09:30:00.000Z",
        updatedAt: "2024-01-02T09:30:00.000Z"
    },
    {
        id: "USR003",
        username: "trainer1",
        password: "trainer123",
        role: "trainer",
        createdAt: "2024-01-03T10:15:00.000Z",
        updatedAt: "2024-01-03T10:15:00.000Z"
    },
    {
        id: "USR004",
        username: "member1",
        password: "member123",
        role: "member",
        createdAt: "2024-01-04T11:45:00.000Z",
        updatedAt: "2024-01-04T11:45:00.000Z"
    },
    {
        id: "USR005",
        username: "member2",
        password: "member456",
        role: "member",
        createdAt: "2024-01-05T13:20:00.000Z",
        updatedAt: "2024-01-05T13:20:00.000Z"
    }
];
