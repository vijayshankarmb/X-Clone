export declare const createPost: ({ content, authorId }: {
    content: string;
    authorId: number;
}) => Promise<{
    author: {
        name: string | null;
        avatarUrl: string | null;
        userName: string;
        id: number;
    };
} & {
    createdAt: Date;
    updatedAt: Date;
    id: number;
    authorId: number;
    content: string;
}>;
export declare const getAllPosts: () => Promise<({
    author: {
        name: string | null;
        avatarUrl: string | null;
        userName: string;
        id: number;
    };
} & {
    createdAt: Date;
    updatedAt: Date;
    id: number;
    authorId: number;
    content: string;
})[]>;
export declare const getPostById: (postId: number) => Promise<({
    author: {
        name: string | null;
        avatarUrl: string | null;
        userName: string;
        id: number;
    };
} & {
    createdAt: Date;
    updatedAt: Date;
    id: number;
    authorId: number;
    content: string;
}) | null>;
export declare const updatePost: (postId: number, authorId: number, newContent: string) => Promise<{
    author: {
        name: string | null;
        avatarUrl: string | null;
        userName: string;
        id: number;
    };
} & {
    createdAt: Date;
    updatedAt: Date;
    id: number;
    authorId: number;
    content: string;
}>;
export declare const deletePost: (postId: number, authorId: number) => Promise<{
    author: {
        name: string | null;
        avatarUrl: string | null;
        userName: string;
        id: number;
    };
} & {
    createdAt: Date;
    updatedAt: Date;
    id: number;
    authorId: number;
    content: string;
}>;
