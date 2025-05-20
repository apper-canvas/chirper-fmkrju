/**
 * Service for interacting with the user_profile table in the Apper backend
 */

const getCurrentUserProfile = async (username) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Query user profile by username
    const params = {
      where: [
        {
          fieldName: "username",
          operator: "ExactMatch",
          values: [username]
        }
      ]
    };

    const response = await apperClient.fetchRecords("user_profile", params);
    
    // Return first match or null
    return response.data && response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

const createUserProfile = async (profileData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Only include Updateable fields
    const params = {
      records: [{
        Name: profileData.name || profileData.display_name || "User Profile",
        Tags: profileData.tags || "",
        username: profileData.username || "",
        display_name: profileData.display_name || "",
        bio: profileData.bio || "",
        location: profileData.location || "",
        website: profileData.website || "",
        join_date: profileData.join_date || new Date().toISOString().split('T')[0],
        following: profileData.following || 0,
        followers: profileData.followers || 0,
        profile_image: profileData.profile_image || "",
        cover_image: profileData.cover_image || "",
        verified: profileData.verified || false
      }]
    };

    const response = await apperClient.createRecord("user_profile", params);
    return response.results?.[0]?.data || null;
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

const updateUserProfile = async (profileId, profileData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Only include Updateable fields
    const params = {
      records: [{
        Id: profileId,
        Name: profileData.name || profileData.display_name,
        Tags: profileData.tags,
        username: profileData.username,
        display_name: profileData.display_name,
        bio: profileData.bio,
        location: profileData.location,
        website: profileData.website,
        profile_image: profileData.profile_image,
        cover_image: profileData.cover_image,
        verified: profileData.verified
      }]
    };

    const response = await apperClient.updateRecord("user_profile", params);
    return response.results?.[0]?.data || null;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const userProfileService = {
  getCurrentUserProfile,
  createUserProfile,
  updateUserProfile
};