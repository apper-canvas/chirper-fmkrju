import React from 'react';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { saveItem as saveItemAction } from '../store/savedItemsSlice';
import getIcon from '../utils/iconUtils';
import { savedItemService } from '../services/savedItemService';

const ChirpList = ({ chirps, isLoading, error }) => {
  const dispatch = useDispatch();
  
  // Icons
  const HeartIcon = getIcon('Heart');
  const RepeatIcon = getIcon('Repeat');
  const MessageSquareIcon = getIcon('MessageSquare');
  const BookmarkIcon = getIcon('Bookmark');
  const VerifiedIcon = getIcon('BadgeCheck');
  const MoreHorizontalIcon = getIcon('MoreHorizontal');
  const LoaderIcon = getIcon('Loader2');
  
  const formatChirpTime = (timestamp) => {
    try {
      // Return empty string if timestamp is undefined or null
      if (!timestamp) return '';
      
      // Try to parse the timestamp into a Date object
      const date = new Date(timestamp);
      
      // Check if date is valid before proceeding
      if (isNaN(date.getTime())) return '';
      
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);
    
      if (diffInSeconds < 60) {
        return `${diffInSeconds}s`;
      } else if (diffInSeconds < 3600) {
        return `${Math.floor(diffInSeconds / 60)}m`;
      } else if (diffInSeconds < 86400) {
        return `${Math.floor(diffInSeconds / 3600)}h`;
      } else {
        return format(date, 'MMM d');
      }
    } catch (e) {
      console.error("Error formatting chirp time:", e);
      return '';
    }
  };
  
  const handleSaveChirp = async (chirp) => {
    try {
      // First try to save using the service
      // Make sure we have a valid ID to save
      const chirpId = chirp?.Id;
      
      if (!chirpId) {
        throw new Error("Cannot save chirp: missing ID");
      }
      
      await savedItemService.saveItem({ chirpId });
      
      // If successful, update Redux state
      dispatch(saveItemAction({ chirpId }));
      
      // Show success message
      toast.success('Chirp saved to bookmarks');
    } catch (err) {
      // Show error message
      console.error("Error saving chirp:", err);
      try {
        toast.error('Failed to save chirp');
      } catch (toastError) {
        console.error("Error showing toast:", toastError);
      }
    }
  };
  
  if (isLoading && (!chirps || chirps.length === 0)) {
    return (
      <div className="flex justify-center items-center p-6">
        <LoaderIcon className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error && (!chirps || chirps.length === 0)) {
    return (
      <div className="text-center p-6 text-red-500">
        <p>Error loading chirps: {error}</p>
      </div>
    );
  }
  
  if (!chirps || chirps.length === 0) {
    return (
      <div className="text-center p-6 text-surface-500">
        <p>No chirps to display</p>
      </div>
    );
  }
  
  return (
    <div className="divide-y divide-surface-200 dark:divide-surface-700">
      {chirps.map((chirp, index) => (
        <article key={chirp?.Id || index} className="p-4 hover:bg-surface-100 dark:hover:bg-surface-800/50 transition-colors">
          <div className="flex">
            <img 
              src={chirp?.avatar || `https://i.pravatar.cc/48?img=${index + 1}`} 
              alt={chirp?.display_name || 'User avatar'} 
              className="w-12 h-12 rounded-full object-cover mr-3 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <h3 className="font-bold text-base hover:underline truncate mr-1">{chirp?.display_name || 'Anonymous'}</h3>
                  {chirp?.verified && (
                    <VerifiedIcon className="w-4 h-4 text-primary flex-shrink-0" />
                  )}
                  <span className="text-surface-500 text-sm ml-1 truncate">@{chirp?.username || 'user'} · {formatChirpTime(chirp?.CreatedOn)}</span>
                </div>
                <div className="flex">
                  <button 
                    onClick={() => handleSaveChirp(chirp)}
                    className="p-2 rounded-full hover:bg-primary/10 text-surface-500"
                    aria-label="Save chirp"
                  >
                    <BookmarkIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-500">
                    <MoreHorizontalIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <p className="mt-1 mb-2 text-[15px] text-balance">{chirp?.content || ''}</p>
              
              {chirp?.image && (
                <div className="mt-2 mb-3 rounded-2xl overflow-hidden">
                  <img 
                    src={chirp.image} 
                    alt="Chirp media" 
                    className="w-full h-auto max-h-96 object-cover"
                  />
                </div>
              )}
              
              <div className="flex justify-between mt-3 max-w-md">
                <button className="flex items-center text-surface-500 hover:text-primary group">
                  <div className="p-2 rounded-full group-hover:bg-primary/10">
                    <MessageSquareIcon className="w-5 h-5" />
                  </div>
                  <span className="text-sm ml-1">{chirp?.replies || 0}</span>
                </button>
                
                <button className="flex items-center text-surface-500 hover:text-green-500 group">
                  <div className="p-2 rounded-full group-hover:bg-green-500/10">
                    <RepeatIcon className="w-5 h-5" />
                  </div>
                  <span className="text-sm ml-1">{chirp?.rechirps || 0}</span>
                </button>
                
                <button className="flex items-center text-surface-500 hover:text-accent group">
                  <div className="p-2 rounded-full group-hover:bg-accent/10">
                    <HeartIcon className="w-5 h-5" fill={chirp?.is_liked ? "currentColor" : "none"} />
                  </div>
                  <span className="text-sm ml-1">{chirp?.likes || 0}</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};
export default ChirpList;