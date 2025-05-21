/**
 * Service for interacting with the chirp1 table in the Apper backend
 */

const fetchChirps = async (options = {}) => {
  try {
    const { limit = 10, offset = 0, category = null, username = null } = options;
    
    // Initialize ApperClient
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const queryParams = {
      pagingInfo: {
        limit,
        offset
      }
    };

    // Add category filter if provided
    if (category) {
      queryParams.where = [
        {
          fieldName: "category",
          operator: "ExactMatch",
          values: [category]
        }
      ];
    }

    // Add username filter if provided
    if (username) {
      queryParams.where = [
        ...(queryParams.where || []),
        {
          fieldName: "username",
          operator: "ExactMatch",
          values: [username]
        }
      ];
    }

    const response = await apperClient.fetchRecords("chirp1", queryParams);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching chirps:", error);
    throw error;
  }
};

const getChirpById = async (chirpId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const response = await apperClient.getRecordById("chirp1", chirpId);
    return response.data || null;
  } catch (error) {
    console.error(`Error fetching chirp with ID ${chirpId}:`, error);
    throw error;
  }
};

const createChirp = async (chirpData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({ 
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Only include Updateable fields
    const params = {
      records: [{
        Name: chirpData.name || "New Chirp",
        Tags: chirpData.tags || "",
        content: chirpData.content || chirpData.text || "",
        image: chirpData.image || "",
        username: chirpData.username || "",
        display_name: chirpData.display_name || "",
        avatar: chirpData.avatar || "",
        verified: chirpData.verified || false,
        likes: chirpData.likes || 0,
        rechirps: chirpData.rechirps || 0,
        replies: chirpData.replies || 0,
        views: chirpData.views || "0",
        is_liked: chirpData.is_liked || false,
    
    const response = await apperClient.createRecord("chirp1", params);
    
    if (!response || !response.results || response.results.length === 0) {
      throw new Error("No response data returned when creating chirp");
    } catch (error) {
    
    const result = response.results[0];
    if (!result.success) {
      throw new Error(result.message || "Failed to create chirp");
    }
    
    return result.data;
      console.error("Error creating chirp:", error);
    console.error("Error creating chirp:", error);
    throw new Error(`Failed to create chirp: ${error.message || "Unknown error"}`);
  } catch (error) {
    console.error("Error in chirp service:", error);
    throw error;
  }
};

export const chirpService = {
  fetchChirps,
  getChirpById,
  createChirp
};