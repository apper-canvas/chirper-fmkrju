import { apperService } from './apperService';

/**
 * Service for handling chirp-related operations
 */
class ChirpService {
  constructor() {
    this.tableName = 'chirp1';
  }
  
  /**
   * Fetch chirps with optional filtering, sorting, and pagination
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of chirps
   */
  async getChirps(options = {}) {
    try {
      const client = apperService.getClient();
      
      const params = {
        Fields: [
          { Field: { Name: 'Id' } },
          { Field: { Name: 'content' } },
          { Field: { Name: 'image' } },
          { Field: { Name: 'username' } },
          { Field: { Name: 'display_name' } },
          { Field: { Name: 'avatar' } },
          { Field: { Name: 'verified' } },
          { Field: { Name: 'likes' } },
          { Field: { Name: 'rechirps' } },
          { Field: { Name: 'replies' } },
          { Field: { Name: 'views' } },
          { Field: { Name: 'is_liked' } },
          { Field: { Name: 'category' } },
          { Field: { Name: 'CreatedOn' } }
        ],
        orderBy: [
          { field: 'CreatedOn', direction: 'DESC' }
        ],
        pagingInfo: {
          limit: options.limit || 20,
          offset: options.offset || 0
        }
      };
      
      // Add category filter if provided
      if (options.category) {
        params.where = [
          {
            fieldName: 'category',
            Operator: 'ExactMatch',
            values: [options.category]
          }
        ];
      }
      
      // Add search filter if provided
      if (options.searchQuery) {
        params.where = params.where || [];
        params.where.push({
          fieldName: 'content',
          Operator: 'Contains',
          values: [options.searchQuery]
        });
      }
      
      const response = await client.fetchRecords(this.tableName, params);
      
      if (!response || !response.data) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching chirps:", error);
      throw error;
    }
  }
  
  /**
   * Fetch a single chirp by ID
   * @param {number} id - Chirp ID
   * @returns {Promise<Object>} Chirp data
   */
  async getChirpById(id) {
    try {
      const client = apperService.getClient();
      
      const response = await client.getRecordById(this.tableName, id);
      
      if (!response || !response.data) {
        throw new Error("Chirp not found");
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching chirp ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Create a new chirp
   * @param {Object} chirpData - Chirp data
   * @returns {Promise<Object>} Created chirp
   */
  async createChirp(chirpData) {
    try {
      const client = apperService.getClient();
      
      const params = {
        records: [
          {
            content: chirpData.content,
            image: chirpData.image || null,
            username: chirpData.username,
            display_name: chirpData.displayName,
            avatar: chirpData.avatar || null,
            verified: chirpData.verified || false,
            likes: 0,
            rechirps: 0,
            replies: 0,
            views: "0",
            is_liked: false,
            category: chirpData.category || 'general'
          }
        ]
      };
      
      const response = await client.createRecord(this.tableName, params);
      
      if (!response || !response.success || !response.results || response.results.length === 0) {
        throw new Error("Failed to create chirp");
      }
      
      return response.results[0].data;
    } catch (error) {
      console.error("Error creating chirp:", error);
      throw error;
    }
  }
  
  /**
   * Update chirp data
   * @param {number} id - Chirp ID
   * @param {Object} chirpData - Updated chirp data
   * @returns {Promise<Object>} Updated chirp
   */
  async updateChirp(id, chirpData) {
    try {
      const client = apperService.getClient();
      
      const params = {
        records: [
          {
            Id: id,
            ...chirpData
          }
        ]
      };
      
      const response = await client.updateRecord(this.tableName, params);
      
      if (!response || !response.success || !response.results || response.results.length === 0) {
        throw new Error("Failed to update chirp");
      }
      
      return response.results[0].data;
    } catch (error) {
      console.error(`Error updating chirp ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Delete a chirp
   * @param {number} id - Chirp ID
   * @returns {Promise<boolean>} Success status
   */
  async deleteChirp(id) {
    try {
      const client = apperService.getClient();
      
      const params = {
        RecordIds: [id]
      };
      
      const response = await client.deleteRecord(this.tableName, params);
      
      if (!response || !response.success) {
        throw new Error("Failed to delete chirp");
      }
      
      return true;
    } catch (error) {
      console.error(`Error deleting chirp ${id}:`, error);
      throw error;
    }
  }
}

export const chirpService = new ChirpService();