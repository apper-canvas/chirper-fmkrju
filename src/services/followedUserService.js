/**
 * Service for interacting with the followed_user table in the Apper backend
 */

const fetchFollowedUsers = async (userId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Query followed users by owner
    const params = {
      where: [
        {
          fieldName: "Owner",
          operator: "ExactMatch",
          values: [userId]
        }
      ]
    };

    const response = await apperClient.fetchRecords("followed_user", params);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching followed users:", error);
    throw error;
  }
};

const checkIfFollowing = async (userId, username) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Query followed users by owner and username
    const params = {
      where: [
        {
          fieldName: "Owner",
          operator: "ExactMatch",
          values: [userId]
        },
        {
          fieldName: "username",
          operator: "ExactMatch",
          values: [username]
        }
      ]
    };

    const response = await apperClient.fetchRecords("followed_user", params);
    return response.data && response.data.length > 0;
  } catch (error) {
    console.error("Error checking follow status:", error);
    throw error;
  }
};

const followUser = async (userData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Only include Updateable fields
    const params = {
      records: [{
        Name: userData.display_name || userData.username,
        username: userData.username,
        display_name: userData.display_name || "",
        avatar: userData.avatar || "",
        is_verified: userData.is_verified || false
      }]
    };

    const response = await apperClient.createRecord("followed_user", params);
    return response.results?.[0]?.data || null;
  } catch (error) {
    console.error("Error following user:", error);
    throw error;
  }
};

const unfollowUser = async (followId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const params = {
      RecordIds: [followId]
    };

    await apperClient.deleteRecord("followed_user", params);
    return true;
  } catch (error) {
    console.error(`Error unfollowing user with ID ${followId}:`, error);
    throw error;
  }
};

export const followedUserService = {
  fetchFollowedUsers,
  checkIfFollowing,
  followUser,
  unfollowUser
};