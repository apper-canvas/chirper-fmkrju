/**
 * Central service for Apper client initialization and configuration
 */

class ApperService {
  constructor() {
    this.client = null;
    this.initialized = false;
  }

  initialize() {
    if (this.initialized) {
      return this.client;
    }
    
    const { ApperClient } = window.ApperSDK;
    this.client = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    this.initialized = true;
    return this.client;
  }

  getClient() {
    return this.initialize();
  }
}

export const apperService = new ApperService();