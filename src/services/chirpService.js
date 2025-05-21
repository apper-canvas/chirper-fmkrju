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
    // Initialize ApperClient with proper configuration
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Log before formatting for debugging
    console.log("Creating chirp with raw data:", chirpData);

    // Ensure proper formatting for boolean and numeric fields
    const formattedChirpData = {
      Name: chirpData.name || "New Chirp",
      Tags: chirpData.tags || "",
      content: chirpData.content || "",
      image: chirpData.image || "",
      username: chirpData.username || "",
      display_name: chirpData.display_name || "",
      avatar: chirpData.avatar || "",
      verified: Boolean(chirpData.verified),
      likes: parseInt(chirpData.likes || 0),
      rechirps: parseInt(chirpData.rechirps || 0),
      replies: parseInt(chirpData.replies || 0),
      views: String(chirpData.views || "0"),
      is_liked: Boolean(chirpData.is_liked),
      category: chirpData.category || "technology"
    };

    // Prepare request payload with records array as expected by API
    const params = {
      records: [formattedChirpData]
    };

    // Create the record in the database
    console.log("Sending formatted data to Apper backend:", JSON.stringify(params));

    const response = await apperClient.createRecord("chirp1", params);

    if (!response || !response.results || response.results.length === 0) {
      throw new Error("No response data returned when creating chirp");
    }

    const result = response.results[0];
    if (!result.success) {
      throw new Error(result.message || "Failed to create chirp");
    }

    console.log("Chirp created successfully. Response:", JSON.stringify(result.data));
    return result.data;

  } catch (error) {
    console.error("Error creating chirp in service:", error.message);
    console.error("Full error:", error);
    throw error;
  }

};

export const chirpService = {
  fetchChirps,
  getChirpById,
  createChirp
};