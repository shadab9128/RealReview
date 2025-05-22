
import { toast } from "sonner";

class ErrorHandler {
  handleError(error: Error | string): void {
    const errorMessage = typeof error === 'string' ? error : error.message;
    console.error('Error occurred:', errorMessage);
    toast.error(errorMessage || 'An unexpected error occurred');
  }

  handleApiError(error: any): string {
    // Handle different types of API errors
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      return error.response.data.message || `Server error: ${error.response.status}`;
    } else if (error.request) {
      // Request was made but no response received
      return 'No response received from server. Please check your connection.';
    } else {
      // Something else happened while setting up the request
      return error.message || 'An unexpected error occurred';
    }
  }
}

export const errorHandler = new ErrorHandler();
