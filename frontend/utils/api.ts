import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === 'ECONNABORTED' || error.response?.status === 504) {
      return Promise.reject(new Error('Server is waking up, please try again'));
    }
    return Promise.reject(error);
  }
);

export interface Reply {
  id: string;
  message: string;
  repliedBy: string;
  createdAt: string;
}

export interface Doubt {
  id: string;
  title: string;
  description: string;
  subject: "Maths" | "Science" | "English" | "Social Science";
  createdBy: string;
  replies: Reply[];
  resolved: boolean;
  createdAt: string;
}

export const doubtsApi = {
  getAll: () => api.get<Doubt[]>('/doubts'),
  create: (data: { title: string; description: string; subject: string; createdBy: string }) =>
    api.post<Doubt>('/doubts', data),
  addReply: (id: string, data: { message: string; repliedBy: string }) =>
    api.post<Doubt>(`/doubts/${id}/reply`, data),
  resolve: (id: string) => api.patch<Doubt>(`/doubts/${id}/resolve`),
};
