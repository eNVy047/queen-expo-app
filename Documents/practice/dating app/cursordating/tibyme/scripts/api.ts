import axios, {
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';
import { Post, Comment, CreatePostPayload, UpdatePostPayload, Reel, ReelComment, CreateReelPayload, UpdateReelPayload } from '@/types/type';
import * as SecureStore from 'expo-secure-store';
import { ProfileFormData } from '@/context/ProfileFormContext';
// Base URL
const API_BASE_URL = 'http://192.168.1.2:8080/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
      try {
        const token = await SecureStore.getItemAsync('authToken');
        if (token) {
          // ✅ SAFELY add header directly
          config.headers.set('Authorization', `Bearer ${token}`);
        }
      } catch (error) {
        console.error('Error getting auth token:', error);
      }
  
      return config;
    },
    (error) => Promise.reject(error)
  );
  

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync('authToken');
      await SecureStore.deleteItemAsync('userData');
    }
    return Promise.reject(error);
  }
);

// --- Type Definitions ---

export interface RegisterData {
  email?: string;
  phone?: string;
  password: string;
}

export interface LoginCredentials {
  email?: string;
  phone?: string;
  password?: string;
}

export interface ProfileUpdate {
  avatar?: string; // URI
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
}
// types/auth.d.ts (or wherever you keep your types)
export interface VerifyPhonePayload {
  phone: string;
  otp: string;
}

export interface Preferences {
  gender?: string;
  ageRange?: [number, number];
  distance?: number;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

// --- Auth APIs ---
export const authAPI = {
  // ✅ Already present...
  register: (userData: RegisterData) => 
    api.post('/auth/register', userData),
  
  login: (credentials: LoginCredentials) => 
    api.post('/auth/login-phone', credentials),
  
  verifyEmail: (token: string) => 
    api.post('/auth/verify-email', { token }),

  verifyPhone: (payload: VerifyPhonePayload) => 
    api.post('/auth/verify-phone-otp', payload),
  
  resendPhoneOTP: (phone: string) => 
    api.post('/auth/resend-phone-otp', { phone }),  // do
  
  requestPasswordReset: (email: string) => 
    api.post('/auth/request-password-reset', { email }),
  
  resetPassword: (payload: ResetPasswordPayload) => 
    api.post('/auth/reset-password', payload),

  addProfile: (payload: FormData) =>
    api.post('/auth/add-profile', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
  }),

  addUserDetails: (payload: ProfileFormData) =>
    api.post('/auth/add-user-details', payload),

  getCurrentUser: () => 
    api.get('/auth/get-current-user'),

  logout: () => 
    api.post('/auth/logout'),

  // 🆕 New Methods to Add:

  loginWithEmail: (payload: { email: string }) =>
    api.post('/auth/login-email', payload),

  refreshToken: () =>
    api.post('/auth/refresh-token'),


  verifyLoginOTP: (payload: { phone: string; otp: string }) =>
    api.post('/auth/verify-login-otp', payload),

  changePassword: (payload: { currentPassword: string; newPassword: string }) =>
    api.post('/auth/change-password', payload),

  sendVerifyEmail: () =>
    api.post('/auth/send-verify-email'),

  updateProfile: (payload: Partial<ProfileFormData>) =>
    api.patch('/auth/update-profile', payload),

  deactivateAccount: () =>
    api.post('/auth/deactivate'),

  reactivateAccount: () =>
    api.post('/auth/reactivate'),

  deleteAccount: () =>
    api.post('/auth/delete-account'),

  getUserStats: () =>
    api.get('/auth/get-stats'),

  updateAvatar: (payload: FormData) =>
    api.patch('/auth/update-avatar', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
  }),

  addCard: (payload: FormData) =>
    api.post('/auth/add-card', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
  }),

  updateCard: (payload: FormData) =>
    api.patch('/auth/update-card', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
  }),
};

// --- Profile APIs ---

export const profileAPI = {
  getPotentialMatches: (params?: Record<string, any>) =>
    api.get('/profile/matches', { params }),
  searchUsers: (params?: Record<string, any>) =>
    api.get('/profile/search', { params }),
  getUserById: (userId: string) => api.get(`/profile/${userId}`),
  updateLocation: (locationData: { lat: number; lng: number }) =>
    api.put('/profile/location', locationData),
};

// ------ post api -- - -- --- 
export const getPostsByUser = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const postAPI = {
  /**
   * Create a new post
   */
  createPost: (formData: FormData): Promise<{ data: Post }> =>
    api.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  /**
   * Get all posts (with pagination support)
   */
  getAllPosts: (page: number = 1, limit: number = 10): Promise<{ data: Post[] }> =>
    api.get('/posts', { params: { page, limit } }),

  /**
   * Get a single post by ID
   */
  getPostById: (postId: string): Promise<{ data: Post }> =>
    api.get(`/posts/${postId}`),

  /**
   * Get all posts by a specific user (with pagination)
   */
  getPostsByUser: (userId: string, page: number = 1, limit: number = 10): Promise<{ data: Post[] }> =>
    api.get(`/posts/user/${userId}`, { params: { page, limit } }),

  /**
   * Toggle like on a post
   */
  toggleLike: (postId: string): Promise<{ data: { likes: string[] } }> =>
    api.put(`/posts/${postId}/like`),

  /**
   * Add a comment to a post
   */
  addComment: (postId: string, comment: { text: string }): Promise<{ data: Comment }> =>
    api.post(`/posts/${postId}/comments`, comment),

  /**
   * Get all comments for a post
   */
  getComments: (postId: string, page: number = 1, limit: number = 10): Promise<{ data: Comment[] }> =>
    api.get(`/posts/${postId}/comments`, { params: { page, limit } }),

  /**
   * Delete a comment from a post
   */
  deleteComment: (postId: string, commentId: string): Promise<{ data: { message: string } }> =>
    api.delete(`/posts/${postId}/comments/${commentId}`),

  /**
   * Update a post (caption only)
   */
  updatePost: (postId: string, payload: UpdatePostPayload): Promise<{ data: Post }> =>
    api.put(`/posts/${postId}`, payload),

  /**
   * Delete a post
   */
  deletePost: (postId: string): Promise<{ data: { message: string } }> =>
    api.delete(`/posts/${postId}`),

  /**
   * Search posts by caption or tags
   */
  searchPosts: (query: string, page: number = 1, limit: number = 10): Promise<{ data: Post[] }> =>
    api.get('/posts/search', { params: { q: query, page, limit } }),

  /**
   * Get trending posts
   */
  getTrendingPosts: (limit: number = 10): Promise<{ data: Post[] }> =>
    api.get('/posts/trending', { params: { limit } }),
};

// Helper function to create FormData for post creation
export const createPostFormData = (payload: CreatePostPayload): FormData => {
  const formData = new FormData();
  formData.append('image', payload.image);
  if (payload.caption) {
    formData.append('caption', payload.caption);
  }
  return formData;
};
  

// ------reels api --- - - - 
export const getReelsByUser = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reels?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const reelAPI = {
  /**
   * Create a new reel
   */
  createReel: (formData: FormData): Promise<{ data: Reel }> =>
    api.post('/reels', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  /**
   * Get all reels (with pagination support)
   */
  getAllReels: (page: number = 1, limit: number = 10): Promise<{ data: Reel[] }> =>
    api.get('/reels', { params: { page, limit } }),

  /**
   * Get a single reel by ID
   */
  getReelById: (reelId: string): Promise<{ data: Reel }> =>
    api.get(`/reels/${reelId}`),

  /**
   * Get all reels by a specific user (with pagination)
   */
  getReelsByUser: (userId: string, page: number = 1, limit: number = 10): Promise<{ data: Reel[] }> =>
    api.get(`/reels/user/${userId}`, { params: { page, limit } }),

  /**
   * Toggle like on a reel
   */
  toggleLike: (reelId: string): Promise<{ data: { likes: string[] } }> =>
    api.put(`/reels/${reelId}/like`),

  /**
   * Add a comment to a reel
   */
  addComment: (reelId: string, comment: { text: string }): Promise<{ data: ReelComment }> =>
    api.post(`/reels/${reelId}/comments`, comment),

  /**
   * Get all comments for a reel
   */
  getComments: (reelId: string, page: number = 1, limit: number = 10): Promise<{ data: ReelComment[] }> =>
    api.get(`/reels/${reelId}/comments`, { params: { page, limit } }),

  /**
   * Delete a comment from a reel
   */
  deleteComment: (reelId: string, commentId: string): Promise<{ data: { message: string } }> =>
    api.delete(`/reels/${reelId}/comments/${commentId}`),

  /**
   * Update a reel (caption only)
   */
  updateReel: (reelId: string, payload: UpdateReelPayload): Promise<{ data: Reel }> =>
    api.put(`/reels/${reelId}`, payload),

  /**
   * Delete a reel
   */
  deleteReel: (reelId: string): Promise<{ data: { message: string } }> =>
    api.delete(`/reels/${reelId}`),

  /**
   * Search reels by caption
   */
  searchReels: (query: string, page: number = 1, limit: number = 10): Promise<{ data: Reel[] }> =>
    api.get('/reels/search', { params: { q: query, page, limit } }),

  /**
   * Get trending reels
   */
  getTrendingReels: (limit: number = 10): Promise<{ data: Reel[] }> =>
    api.get('/reels/trending', { params: { limit } }),

  /**
   * Increment reel view count
   */
  incrementViewCount: (reelId: string): Promise<{ data: { views: number } }> =>
    api.patch(`/reels/${reelId}/views`),
};

// Helper function to create FormData for reel creation
export const createReelFormData = (payload: CreateReelPayload): FormData => {
  const formData = new FormData();
  formData.append('video', payload.video);
  formData.append('duration', payload.duration.toString());
  
  if (payload.thumbnail) {
    formData.append('thumbnail', payload.thumbnail);
  }
  if (payload.caption) {
    formData.append('caption', payload.caption);
  }
  return formData;
};


export default api;
