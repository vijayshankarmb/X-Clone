export declare const createUser: ({ username, email, password, name, avatarUrl }: {
    username: string;
    email: string;
    password: string;
    name?: string;
    avatarUrl?: string;
}) => Promise<{
    id: number;
    email: string;
    userName: string;
    name: string | null;
    avatarUrl: string | null;
    token: string;
}>;
export declare const loginUser: ({ email, password }: {
    email: string;
    password: string;
}) => Promise<{
    id: number;
    email: string;
    userName: string;
    name: string | null;
    avatarUrl: string | null;
    token: string;
}>;
