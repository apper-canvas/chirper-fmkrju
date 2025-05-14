import { apperService } from './apperService';

/**
 * Service for saved items operations
 */
class SavedItemService {
  constructor() {
    this.tableName = 'saved_item1';
  }
  
  /**
   * Fetch saved items with optional filtering and pagination
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of saved items
   */
  async getSavedItems(options = {}) {
    try {
      const client = apperService.getClient();
      
      // Basic params for the query
      const params = {
        Fields: [
          { Field: { Name: 'Id' } },
          { Field: { Name: 'chirp_id' } },
          { Field: { Name: 'Owner' } },
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
      
      // Execute the request
      const response = await client.fetchRecords(this.tableName, params);
      
      if (!response || !response.data) {
        return [];
      }
      
      // If we have saved items, fetch the associated chirps for each
      if (response.data.length > 0) {
        const chirpIds = response.data.map(item => item.chirp_id);
        const chirpParams = {
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
            { Field: { Name: 'category' } }
          ],
          where: [
            {
              fieldName: 'Id',
              Operator: 'In',
              values: chirpIds
            }
          ]
        };
        
        const chirpsResponse = await client.fetchRecords('chirp1', chirpParams);
        
        if (chirpsResponse && chirpsResponse.data) {
          // Map saved items to include full chirp data
          return response.data.map(savedItem => {
            const chirp = chirpsResponse.data.find(c => c.Id === savedItem.chirp_id);
            return {
              ...savedItem,
              chirp: chirp || null
            };
          });
        }
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching saved items:", error);
      throw error;
    }
  }
  
  /**
   * Save a chirp
   * @param {Object} itemData - Contains chirp_id to save
   * @returns {Promise<Object>} Saved item
   */
  async saveItem(itemData) {
    try {
      const client = apperService.getClient();
      
      const params = {
        records: [
          {
            chirp_id: itemData.chirpId,
            Name: `Saved chirp ${itemData.chirpId}`
          }
        ]
      };
      
      const response = await client.createRecord(this.tableName, params);
      
      if (!response || !response.success || !response.results || response.results.length === 0) {
        throw new Error("Failed to save item");
      }
      
      return response.results[0].data;
    } catch (error) {
      console.error("Error saving item:", error);
      throw error;
    }
  }
  
  /**
   * Remove a saved item
   * @param {number} id - Saved item ID
   * @returns {Promise<boolean>} Success status
   */
  async removeSavedItem(id) {
    try {
      const client = apperService.getClient();
      
      const params = {
        RecordIds: [id]
      };
      
      const response = await client.deleteRecord(this.tableName, params);
      
      if (!response || !response.success) {
        throw new Error("Failed to remove saved item");
      }
      
      return true;
    } catch (error) {
      console.error(`Error removing saved item ${id}:`, error);
      throw error;
    }
  }
}

export const savedItemService = new SavedItemService();