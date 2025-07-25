import { Post, PostTag } from '@src/entities/post';

export interface PostProps {
  post: Post;
}
export interface PostTagsProps {
  tags: PostTag[];
}
