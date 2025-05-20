/**
 * Service for interacting with the saved_item1 table in the Apper backend
 */

const fetchSavedItems = async (userId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Query saved items by owner
    const params = {
      where: [
        {
          fieldName: "Owner",
          operator: "ExactMatch",
          values: [userId]
        }
      ]
    };

    const response = await apperClient.fetchRecords("saved_item1", params);
    
    // Get each chirp by ID
    if (response.data && response.data.length > 0) {
      const savedItems = [];
      
      for (const item of response.data) {
        try {
          const chirpResponse = await apperClient.getRecordById("chirp1", item.chirp_id);
          if (chirpResponse.data) {
            savedItems.push({
              id: item.Id,
              savedId: item.Id,
              chirp: chirpResponse.data
            });
          }
        } catch (error) {
          console.error(`Error fetching chirp ${item.chirp_id}:`, error);
        }
      }
      
      return savedItems;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching saved items:", error);
    throw error;
  }
};

const saveItem = async (data) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Only include Updateable fields
    const params = {
      records: [{
        Name: "Saved Chirp",
        chirp_id: data.chirpId
      }]
    };

    const response = await apperClient.createRecord("saved_item1", params);
    return response.results?.[0]?.data || null;
  } catch (error) {
    console.error("Error saving item:", error);
    throw error;
  }
};

const removeSavedItem = async (savedItemId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const params = {
      RecordIds: [savedItemId]
    };

    await apperClient.deleteRecord("saved_item1", params);
    return true;
  } catch (error) {
    console.error(`Error removing saved item ${savedItemId}:`, error);
    throw error;
  }
};

export const savedItemService = {
  fetchSavedItems,
  saveItem,
  removeSavedItem
};