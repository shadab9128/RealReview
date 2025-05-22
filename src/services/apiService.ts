
import { ImageReview, ApiResponse } from "@/types";
import { errorHandler } from "@/utils/errorHandler";
import { supabase } from "@/integrations/supabase/client";
import { SupabaseImageReview, InsertImageReview } from "@/types/supabase";

class ApiService {
  // Base URL would normally point to your backend server
  private baseUrl: string = '/api';
  
  // Simulate image upload
  async uploadImage(file: File): Promise<ApiResponse<string>> {
    try {
      // In a real implementation, this would be a fetch or axios request to upload the file
      console.log('Uploading file:', file.name);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Creating a local URL for the uploaded file
      const imageUrl = URL.createObjectURL(file);
      
      return {
        success: true,
        data: imageUrl
      };
    } catch (error) {
      const errorMessage = errorHandler.handleApiError(error);
      return {
        success: false,
        error: errorMessage
      };
    }
  }



  // Submit image review
  async submitReview(review: ImageReview): Promise<ApiResponse<ImageReview>> {
    try {
      console.log('Submitting review to Supabase:', review);
      
      // First, try to save to Supabase
      const supabaseReview: InsertImageReview = {
        imageurl: review.imageUrl,
        description: review.description,
        location: review.location,
        review: review.review
      };
      
      const { data: supabaseData, error } = await supabase
        .from('image_reviews')
        .insert(supabaseReview)
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error:', error);
        // Fallback to localStorage if Supabase fails
        return this.submitReviewToLocalStorage(review);
      }
      
      // Convert Supabase data to our app's format
      const savedReview: ImageReview = {
        id: supabaseData.id,
        imageUrl: supabaseData.imageurl,
        description: supabaseData.description,
        location: supabaseData.location,
        review: supabaseData.review,
        createdAt: supabaseData.createdat
      };
      
      return {
        success: true,
        data: savedReview
      };
    } catch (error) {
      console.error('Error in submitReview:', error);
      // Fallback to localStorage
      return this.submitReviewToLocalStorage(review);
    }
  }
  
  // Fallback method to store in localStorage
  private async submitReviewToLocalStorage(review: ImageReview): Promise<ApiResponse<ImageReview>> {
    try {
      console.log('Falling back to localStorage for review submission');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate a random ID and timestamp for the review
      const savedReview: ImageReview = {
        ...review,
        id: `review_${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      
      // Store in localStorage to persist between page refreshes
      const existingReviews: ImageReview[] = JSON.parse(localStorage.getItem('imageReviews') || '[]');
      const updatedReviews = [...existingReviews, savedReview];
      localStorage.setItem('imageReviews', JSON.stringify(updatedReviews));
      
      return {
        success: true,
        data: savedReview
      };
    } catch (error) {
      const errorMessage = errorHandler.handleApiError(error);
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  // Get all reviews
  async getReviews(): Promise<ApiResponse<ImageReview[]>> {
    try {
      console.log('Fetching reviews from Supabase');
      
      // Try to fetch from Supabase first
      const { data: supabaseData, error } = await supabase
        .from('image_reviews')
        .select('*')
        .order('createdat', { ascending: false });
      
      if (error) {
        console.error('Supabase error:', error);
        // Fallback to localStorage if Supabase fails
        return this.getReviewsFromLocalStorage();
      }
      
      // Convert Supabase data to our app's format
      const reviews: ImageReview[] = supabaseData.map((item: SupabaseImageReview) => ({
        id: item.id,
        imageUrl: item.imageurl,
        description: item.description,
        location: item.location,
        review: item.review,
        createdAt: item.createdat
      }));
      
      return {
        success: true,
        data: reviews
      };
    } catch (error) {
      console.error('Error in getReviews:', error);
      // Fallback to localStorage
      return this.getReviewsFromLocalStorage();
    }
  }

  
    // ...existing code...
  // async getReviews(): Promise<ApiResponse<ImageReview[]>> {
  //   try {
  //     // Retrieve from localStorage
  //     const reviews: ImageReview[] = JSON.parse(localStorage.getItem('imageReviews') || '[]');
  //     return {
  //       success: true,
  //       data: reviews
  //     };
  //   } catch (error) {
  //     const errorMessage = errorHandler.handleApiError(error);
  //     return {
  //       success: false,
  //       error: errorMessage
  //     };
  //   }
  // }
  // ...existing code...
  
  // Fallback method to retrieve from localStorage
  private async getReviewsFromLocalStorage(): Promise<ApiResponse<ImageReview[]>> {
    try {
      console.log('Falling back to localStorage for review fetching');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Retrieve from localStorage
      const reviews: ImageReview[] = JSON.parse(localStorage.getItem('imageReviews') || '[]');
      
      return {
        success: true,
        data: reviews
      };
    } catch (error) {
      const errorMessage = errorHandler.handleApiError(error);
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}

export const apiService = new ApiService();
