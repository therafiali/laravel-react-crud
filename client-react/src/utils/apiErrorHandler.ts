import { AxiosError } from 'axios';

interface ValidationErrors {
  [key: string]: string[];
}

interface ErrorResponse {
  message?: string;
  errors?: ValidationErrors;
}

export const handleApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const errorData = error.response?.data as ErrorResponse;
    
    // Laravel validation errors
    if (errorData?.errors) {
      return Object.values(errorData.errors).flat().join(', ');
    }
    
    // General error message
    if (errorData?.message) {
      return errorData.message;
    }
    
    if (error.response) {
      return `Error: ${error.response.status} - ${error.response.statusText}`;
    }
    
    if (error.request) {
      return 'Network error. Please check your connection.';
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred.';
};