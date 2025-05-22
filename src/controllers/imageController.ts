
import { ImageReview, ApiResponse } from "@/types";
import { apiService } from "@/services/apiService";
import { errorHandler } from "@/utils/errorHandler";

class ImageController {
  async uploadImage(file: File): Promise<string | null> {
    try {
      const response = await apiService.uploadImage(file);
      
      if (!response.success || !response.data) {
        errorHandler.handleError(response.error || 'Failed to upload image');
        return null;
      }
      
      return response.data;
    } catch (error) {
      errorHandler.handleError(error as Error);
      return null;
    }
  }

  async submitReview(review: ImageReview): Promise<ImageReview | null> {
    try {
      const response = await apiService.submitReview(review);
      
      if (!response.success || !response.data) {
        errorHandler.handleError(response.error || 'Failed to submit review');
        return null;
      }
      
      return response.data;
    } catch (error) {
      errorHandler.handleError(error as Error);
      return null;
    }
  }

  async getReviews(): Promise<ImageReview[]> {
    try {
      const response = await apiService.getReviews();
      
      if (!response.success || !response.data) {
        errorHandler.handleError(response.error || 'Failed to fetch reviews');
        return [];
      }
      
      return response.data;
    } catch (error) {
      errorHandler.handleError(error as Error);
      return [];
    }
  }
}

export const imageController = new ImageController();
