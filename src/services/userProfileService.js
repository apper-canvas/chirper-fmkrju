import { apperService } from './apperService';

/**
 * Service for user profile operations
 */
class UserProfileService {
  constructor() {
    this.tableName = 'user_profile';
  }
  
  /**
   * Fetch user profiles with optional filtering and pagination
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of user profiles
   */
  async getUserProfiles(options = {}) {
    try {
      const client = apperService.getClient();
      
      const params = {
        Fields: [
          { Field: { Name: 'Id' } },
          { Field: { Name: 'username' } },
          { Field: { Name: 'display_name' } },
          { Field: { Name: 'bio' } },
          { Field: { Name: 'location' } },
          { Field: { Name: 'website' } },
          { Field: { Name: 'join_date' } },
          { Field: { Name: 'following' } },
          { Field: { Name: 'followers' } },
          { Field: { Name: 'profile_image' } },
          { Field: { Name: 'cover_image' } },
          { Field: { Name: 'verified' } }
        ],
        pagingInfo: {
          limit: options.limit || 20,
          offset: options.offset || 0
        }
      };
      
      // Add search filter if provided
      if (options.searchQuery) {
        params.where = [
          {
            fieldName: 'display_name',
            Operator: 'Contains',
            values: [options.searchQuery]
          }
        ];
      }
      
      const response = await client.fetchRecords(this.tableName, params);
      
      if (!response || !response.data) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching user profiles:", error);
      throw error;
    }
  }
  
  /**
   * Fetch a user profile by ID
   * @param {number} id - User profile ID
   * @returns {Promise<Object>} User profile data
   */
  async getUserProfileById(id) {
    try {
      const client = apperService.getClient();
      
      const response = await client.getRecordById(this.tableName, id);
      
      if (!response || !response.data) {
        throw new Error("User profile not found");
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching user profile ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Create a new user profile
   * @param {Object} profileData - User profile data
   * @returns {Promise<Object>} Created user profile
   */
  async createUserProfile(profileData) {
    try {
      const client = apperService.getClient();
      
      const params = {
        records: [
          {
            username: profileData.username,
            display_name: profileData.displayName,
            bio: profileData.bio || null,
            location: profileData.location || null,
            website: profileData.website || null,
            join_date: profileData.joinDate || new Date().toISOString(),
            following: profileData.following || 0,
            followers: profileData.followers || 0,
            profile_image: profileData.profileImage || null,
            cover_image: profileData.coverImage || null,
            verified: profileData.verified || false
          }
        ]
      };
      
      const response = await client.createRecord(this.tableName, params);
      
      if (!response || !response.success || !response.results || response.results.length === 0) {
        throw new Error("Failed to create user profile");
      }
      
      return response.results[0].data;
    } catch (error) {
      console.error("Error creating user profile:", error);
      throw error;
    }
  }
  
  /**
   * Update a user profile
   * @param {number} id - User profile ID
   * @param {Object} profileData - Updated profile data
   * @returns {Promise<Object>} Updated user profile
   */
  async updateUserProfile(id, profileData) {
    try {
      const client = apperService.getClient();
      
      const params = {
        records: [
          {
            Id: id,
            ...profileData
          }
        ]
      };
      
      const response = await client.updateRecord(this.tableName, params);
      
      if (!response || !response.success || !response.results || response.results.length === 0) {
        throw new Error("Failed to update user profile");
      }
      
      return response.results[0].data;
    } catch (error) {
      console.error(`Error updating user profile ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Get user profile by username
   * @param {string} username - Username to search for
   * @returns {Promise<Object>} User profile
   */
  async getUserProfileByUsername(username) {
    try {
      const client = apperService.getClient();
      
      const params = {
        Fields: [
          { Field: { Name: 'Id' } },
          { Field: { Name: 'username' } },
          { Field: { Name: 'display_name' } },
          { Field: { Name: 'bio' } },
          { Field: { Name: 'location' } },
          { Field: { Name: 'website' } },
          { Field: { Name: 'join_date' } },
          { Field: { Name: 'following' } },
          { Field: { Name: 'followers' } },
          { Field: { Name: 'profile_image' } },
          { Field: { Name: 'cover_image' } },
          { Field: { Name: 'verified' } }
        ],
        where: [
          {
            fieldName: 'username',
            Operator: 'ExactMatch',
            values: [username]
          }
        ]
      };
      
      const response = await client.fetchRecords(this.tableName, params);
      
      if (!response || !response.data || response.data.length === 0) {
        throw new Error("User profile not found");
      }
      
      return response.data[0];
    } catch (error) {
      console.error(`Error fetching user profile by username ${username}:`, error);
      throw error;
    }
  }

  /**
   * Update user language preference
   * @param {number} userId - User ID
   * @param {string} language - Selected language
   * @returns {Promise<Object>} Result of the operation
   */ 
  async updateLanguagePreference(userIdentifier, language) {
    try {
      const client = apperService.getClient();
      
      try {
        // First try to get the user profile
        const userProfile = await this.getUserProfileByUsername(userIdentifier);
        
        if (userProfile && userProfile.Id) {
          // Profile exists, update it
          const params = {
            records: [{
              Id: userProfile.Id,
              Name: `User Profile - ${language}` // Store language in Name field
            }]
          };
          
          return await client.updateRecord(this.tableName, params);
        } else {
          throw new Error("Profile not found, will create new");
        }
      } catch (error) {
        // If user profile doesn't exist, create a new one
        console.log("Creating new user profile with language preference", error);
        
        const params = {
          records: [{
            username: userIdentifier,
            display_name: userIdentifier.split('@')[0] || 'User',
            Name: `User Profile - ${language}`,
            join_date: new Date().toISOString(),
            following: 0,
            followers: 0,
            verified: false
          }]
        };
        
        return await client.createRecord(this.tableName, params);
      }

    } catch (error) {
      console.error(`Error updating language preference for user ${userIdentifier}:`, error);
      throw error;
    }
  }

export const userProfileService = new UserProfileService();