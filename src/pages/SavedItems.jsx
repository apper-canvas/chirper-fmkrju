import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchSavedItems, removeSavedItem } from '../store/savedItemsSlice';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import { format } from 'date-fns';

const SavedItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { savedItems, isLoading, error } = useSelector(state => state.savedItems);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Icons
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const VerifiedIcon = getIcon('BadgeCheck');
  const FilterIcon = getIcon('Filter');
  const BookmarkIcon = getIcon('Bookmark');
  const SearchIcon = getIcon('Search');
  const LoaderIcon = getIcon('Loader2');

  useEffect(() => {
    dispatch(fetchSavedItems());
  }, [dispatch]);

  // Remove item from saved
  const handleRemoveItem = (id) => {
    dispatch(removeSavedItem(id))
      .unwrap()
      .then(() => {
        toast.success('Item removed from bookmarks');
      })
      .catch(() => {
        toast.error('Failed to remove item');
      });
  };

  // Format time (reusing from Home component)
  const formatChirpTime = (timestamp) => {
    const date = new Date(timestamp);
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
  };
  
  // Filter saved items based on activeFilter and searchQuery
  const filteredItems = savedItems
    .filter(item => {
      if (!item.chirp) return false;
      
      // Filter by category
      if (activeFilter !== 'all' && item.chirp.category !== activeFilter) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery && !item.chirp.content.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !item.chirp.display_name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });

  if (isLoading && savedItems.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-surface-50 dark:bg-surface-900">
        <LoaderIcon className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-50">
      <div className="max-w-2xl mx-auto border-x border-surface-200 dark:border-surface-700 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800"
              >
              <ArrowLeftIcon className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold">Bookmarks</h1>
              </div>
            </div>
          </div>
          
          {/* Search and filter */}
          <div className="mt-4 flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bookmarks" 
                className="w-full pl-10 pr-4 py-2 bg-surface-100 dark:bg-surface-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="p-2 rounded-full bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700">
              <FilterIcon className="w-5 h-5" />
            </button>
          </div>
          
          {/* Filter tabs */}
          <div className="mt-3 flex overflow-x-auto pb-1 gap-1 -mx-1 px-1 no-scrollbar">
            {['all', 'technology', 'science', 'nature', 'business', 'politics'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${
                  activeFilter === filter
                    ? 'bg-primary text-white font-medium'
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </header>
        
        {/* Saved items */}
        <div className="divide-y divide-surface-200 dark:divide-surface-700">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center px-6">
              <BookmarkIcon className="w-12 h-12 mx-auto mb-3 text-surface-400" />
              <h3 className="text-xl font-bold mb-2">Save posts for later</h3>
              <p className="text-surface-500 max-w-sm mx-auto">
                {searchQuery ? 
                  "No bookmarks match your search. Try a different term." : 
                  "When you find something you want to save, bookmark it to easily find it again in the future."}
              </p>
            </div>
          ) : (
            filteredItems.map(item => (
              <article key={item.id} className="p-4 hover:bg-surface-100 dark:hover:bg-surface-800/50 transition-colors">
                <div className="flex">
                  <img 
                    src={item.avatar} 
                    alt={item.displayName} 
                    className="w-12 h-12 rounded-full object-cover mr-3 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <h3 className="font-bold text-base hover:underline truncate mr-1">{item.displayName}</h3>
                        {item.verified && (
                          <VerifiedIcon className="w-4 h-4 text-primary flex-shrink-0" />
                        )}
                        <span className="text-surface-500 text-sm ml-1 truncate">@{item.username} · {formatChirpTime(item.timestamp)}</span>
                      </div>
                      <div className="flex">
                        <button 
                          onClick={() => removeFromSaved(item.id)}
                          className="p-2 rounded-full hover:bg-primary/10 text-primary"
                          aria-label="Remove from bookmarks"
                        > 
                          <BookmarkIcon className="w-5 h-5" fill="currentColor" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-500">
                          <MoreHorizontalIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="mt-1 mb-2 text-[15px] text-balance">{item.content}</p>
                    
                    {item.image && (
                      <div className="mt-2 mb-3 rounded-2xl overflow-hidden">
                        <img 
                          src={item.image} 
                          alt="Chirp media" 
                          className="w-full h-auto max-h-96 object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedItems;