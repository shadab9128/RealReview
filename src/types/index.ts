
export interface ImageReview {
  id?: string;
  imageUrl: string;
  description: string;
  location: string;
  review: string;
  createdAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
