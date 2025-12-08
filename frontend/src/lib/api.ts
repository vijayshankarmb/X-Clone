const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  user?: T;
  post?: T;
  posts?: T[];
}

export const api = {
  // Auth endpoints
  async signup(data: { username: string; email: string; password: string; name?: string; avatarUrl?: string }) {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      body: JSON.stringify(data),
    });
    const result: ApiResponse<any> = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Signup failed');
    }
    return result;
  },

  async login(data: { email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      body: JSON.stringify(data),
    });
    const result: ApiResponse<any> = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Login failed');
    }
    return result;
  },

  async logout() {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    const result: ApiResponse<any> = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Logout failed');
    }
    return result;
  },

  async getCurrentUser() {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      credentials: 'include',
    });
    const result: ApiResponse<any> = await response.json();
    if (!response.ok) {
      // If 401, it just means not logged in, but the context expects success/failure
      // Depending on how backend handles it. If 401 throws error, AuthContext catches it.
      // We can just return result if standard structure
      if (response.status === 401) {
        return { success: false, message: 'Not authenticated' };
      }
      throw new Error(result.message || 'Failed to fetch current user');
    }
    return result;
  },

  // Post endpoints
  async getAllPosts() {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'GET',
      credentials: 'include',
    });
    const result: ApiResponse<any> = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch posts');
    }
    return result;
  },

  async getPostById(postId: number) {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: 'GET',
      credentials: 'include',
    });
    const result: ApiResponse<any> = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch post');
    }
    return result;
  },

  async createPost(content: string) {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ content }),
    });
    const result: ApiResponse<any> = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to create post');
    }
    return result;
  },

  async updatePost(postId: number, content: string) {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ content }),
    });
    const result: ApiResponse<any> = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to update post');
    }
    return result;
  },

  async deletePost(postId: number) {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const result: ApiResponse<any> = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to delete post');
    }
    return result;
  },
};

