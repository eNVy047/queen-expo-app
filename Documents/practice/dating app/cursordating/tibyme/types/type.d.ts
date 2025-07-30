export interface Post {
  id: string;
  userId: string;
  imageUrl: string;
  caption?: string;
  likes: string[]; // array of user IDs who liked the post
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
}

export interface CreatePostPayload {
  image: File;
  caption?: string;
}

export interface UpdatePostPayload {
  caption?: string;
}

export interface Reel {
  id: string;
  userId: string;
  videoUrl: string;
  thumbnailUrl: string;
  caption?: string;
  likes: string[]; // array of user IDs who liked the reel
  comments: ReelComment[];
  views: number;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReelComment {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
}

export interface CreateReelPayload {
  video: File;
  thumbnail?: File;
  caption?: string;
  duration: number;
}

export interface UpdateReelPayload {
  caption?: string;
}

// eslint-disable-next-line import/prefer-default-export
export interface Profile {
  id: number;
  name: string;
  age: number;
  place: string;
  image: string;
}
