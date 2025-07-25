import {PostTag} from '@src/entities/post';

export interface PostTagsProps {
    tags: PostTag[];
}

export interface PostsAlertProps {
    refetch: () => void;
}