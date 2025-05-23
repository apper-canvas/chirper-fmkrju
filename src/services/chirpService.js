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

const createChirp = async (chirpData = {}) => {
  try {
    // Initialize ApperClient
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // CRITICAL: Validate content field exists and is not empty
    if (!chirpData.content || chirpData.content.trim() === '') {
      throw new Error("Cannot create chirp: content field is empty or missing");
    }

    // Get user information for chirp metadata
    const user = JSON.parse(localStorage.getItem('user')) || {};
    
    // Field names must match exactly what's in the tables and fields definition
    const formattedChirpData = {
      // Essential fields with proper types
      Name: chirpData.Name || `Chirp from ${user.firstName || 'User'} - ${new Date().toISOString()}`, // Text
      Tags: chirpData.Tags || "", // Tag
      content: chirpData.content.trim(), // MultilineText - critical user content
      image: chirpData.image || "", // Text
      username: chirpData.username || user.emailAddress?.split('@')[0] || "user", // Text
      display_name: chirpData.display_name || 
                   (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 
                   user.displayName || "User"), // Text
      avatar: chirpData.avatar || user.profileImage || 
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb", // Text
      verified: false, // Boolean
      likes: 0, // Number
      rechirps: 0, // Number
      replies: 0, // Number
      views: "0", // Text - as specified in schema
      is_liked: false, // Boolean
      category: chirpData.category || "technology" // Picklist with valid value
    };
    
    // Prepare request payload with records array as expected by API
    const params = {
      records: [formattedChirpData] 
    };

    // Create the record in the database
    console.log("Sending formatted data to Apper backend:", params);

    const response = await apperClient.createRecord("chirp1", params); 

    if (!response || !response.results || response.results.length === 0) {
      throw new Error("No response data returned when creating chirp");
    }

    const result = response.results[0];
    if (!result.success) {
      throw new Error(result.message || "Failed to create chirp");
    }

    console.log("Chirp created successfully. Response:", result.data);
    return result.data;

  } catch (error) {
    console.error("Full error:", error);
    throw error;
  }

};

export const chirpService = {
  fetchChirps,
  getChirpById,
  createChirp
};