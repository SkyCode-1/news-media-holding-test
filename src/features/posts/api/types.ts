import {Post} from '@src/entities/post';

export interface PostsResponse {
    posts: Post[];
    skip: number
    total: number
}

export interface GetPostsArgs {
    skip: number;
}