/**
 * Service for common ApperClient operations
 */

// Initialize Apper client with environment variables
const initializeApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Get the current authenticated user from localStorage
const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    return null;
  }
};

export const apperService = {
  initializeApperClient,
  getCurrentUser
};