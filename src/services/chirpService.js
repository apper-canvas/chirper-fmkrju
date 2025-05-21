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
    // Use the common apperService to initialize the client
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Log critical content field for debugging
    console.log("Creating chirp with content:", chirpData.content);
    
    // CRITICAL: Validate content field exists and is not empty
    if (!chirpData.content || chirpData.content.trim() === '') {
      throw new Error("Cannot create chirp: content field is empty or missing");
    }

    // CRITICAL: Make sure user input is prioritized and never replaced with defaults
    // unless the field is actually empty
    // Field names must match exactly what's in the tables and fields definition
    const formattedChirpData = {
      // Required Updateable fields from schema
      Name: chirpData.Name || "New Chirp", // Text
      Tags: chirpData.Tags || "", // Tag
      content: chirpData.content, // MultilineText - NEVER default this field if provided
      image: chirpData.image || "", // Text
      username: chirpData.username || "", // Text
      display_name: chirpData.display_name || "", // Text
      avatar: chirpData.avatar || "", // Text
      verified: !!chirpData.verified, // Boolean - ensure true/false
      likes: Number(chirpData.likes || 0), // Number - ensure numeric
      rechirps: Number(chirpData.rechirps || 0), // Number - ensure numeric
      replies: Number(chirpData.replies || 0), // Number - ensure numeric
      views: String(chirpData.views || "0"), // Text
      is_liked: !!chirpData.is_liked, // Boolean - ensure true/false
      category: chirpData.category || "technology" // Picklist
    };
    
    // Extra validation for critical user content field - log for debugging
    console.log("User content before submission:", chirpData.content);
    
    // Filter out any undefined values that could cause API errors
    Object.keys(formattedChirpData).forEach(key => {
      if (formattedChirpData[key] === undefined) {
        delete formattedChirpData[key];
      }
    });

    // Log the final formatted data after any transformations
    console.log("Final formatted chirp data:", {
      ...formattedChirpData,
      // Explicitly log content to ensure it survived formatting
      content: formattedChirpData.content
    });

    // Prepare request payload with records array as expected by API
    const params = {
      records: [formattedChirpData] 
    };

    // Create the record in the database
    console.log("Sending formatted data to Apper backend:", params);
    console.log("Table name:", "chirp1");

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