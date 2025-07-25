export interface Post {
    id: string,
    title: string,
    body: number,
    tags: PostTag[],
    reactions: PostReactions,
    views: number,
    userId: number
}

export type PostTag = string

export interface PostReactions {
    likes: number,
    dislikes: number
}