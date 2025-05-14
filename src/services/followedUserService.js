import { apperService } from './apperService';

/**
 * Service for followed users operations
 */
class FollowedUserService {
  constructor() {
    this.tableName = 'followed_user';
  }
  
  /**
   * Fetch followed users
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of followed users
   */
  async getFollowedUsers(options = {}) {
    try {
      const client = apperService.getClient();
      
      const params = {
        Fields: [
          { Field: { Name: 'Id' } },
          { Field: { Name: 'username' } },
          { Field: { Name: 'display_name' } },
          { Field: { Name: 'avatar' } },
          { Field: { Name: 'is_verified' } }
        ],
        pagingInfo: {
          limit: options.limit || 20,
          offset: options.offset || 0
        }
      };
      
      const response = await client.fetchRecords(this.tableName, params);
      
      if (!response || !response.data) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching followed users:", error);
      throw error;
    }
  }
  
  /**
   * Follow a user
   * @param {Object} userData - User data to follow
   * @returns {Promise<Object>} Created follow relationship
   */
  async followUser(userData) {
    try {
      const client = apperService.getClient();
      
      const params = {
        records: [
          {
            username: userData.username,
            display_name: userData.displayName,
            avatar: userData.avatar || null,
            is_verified: userData.isVerified || false
          }
        ]
      };
      
      const response = await client.createRecord(this.tableName, params);
      
      if (!response || !response.success || !response.results || response.results.length === 0) {
        throw new Error("Failed to follow user");
      }
      
      return response.results[0].data;
    } catch (error) {
      console.error("Error following user:", error);
      throw error;
    }
  }
  
  /**
   * Unfollow a user
   * @param {number} id - Followed user record ID
   * @returns {Promise<boolean>} Success status
   */
  async unfollowUser(id) {
    try {
      const client = apperService.getClient();
      
      const params = {
        RecordIds: [id]
      };
      
      const response = await client.deleteRecord(this.tableName, params);
      
      if (!response || !response.success) {
        throw new Error("Failed to unfollow user");
      }
      
      return true;
    } catch (error) {
      console.error(`Error unfollowing user ${id}:`, error);
      throw error;
    }
  }
}

export const followedUserService = new FollowedUserService();