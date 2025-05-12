import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('latest');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Icon components
  const SearchIcon = getIcon('Search');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const VerifiedIcon = getIcon('BadgeCheck');
  const MoreHorizontalIcon = getIcon('MoreHorizontal');
  const ImageIcon = getIcon('Image');
  const UserIcon = getIcon('User');
  const CalendarIcon = getIcon('Calendar');
  const MessageSquareIcon = getIcon('MessageSquare');
  const RepeatIcon = getIcon('Repeat');
  const HeartIcon = getIcon('Heart');
  const ShareIcon = getIcon('Share');

  // Sample search results data
  const mockResults = {
    latest: [
      {
        id: 101,
        username: "reactjs",
        displayName: "React",
        avatar: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        verified: true,
        content: "Just released React 18 with new concurrency features! Check out the docs for more information #ReactJS #WebDev",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        likes: 3242,
        rechirps: 982,
        replies: 154,
        views: "892K"
      },
      {
        id: 102,
        username: "tailwindcss",
        displayName: "Tailwind CSS",
        avatar: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        verified: true,
        content: "Tailwind CSS v3.3 is out! New color palette, improved dark mode support, and better performance #TailwindCSS #CSS",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        likes: 2189,
        rechirps: 745,
        replies: 87,
        views: "456K",
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
      }
    ],
    people: [
      {
        id: 201,
        username: "developerdave",
        displayName: "Developer Dave",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        verified: false,
        bio: "Full stack developer | React, Node, TypeScript | Web development tips and tricks",
        followers: "12.4K"
      },
      {
        id: 202,
        username: "webdesignpro",
        displayName: "Web Design Pro",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        verified: true,
        bio: "UI/UX designer | Creating beautiful web experiences | Design tips & resources",
        followers: "45.8K"
      }
    ],
    media: [
      {
        id: 301,
        username: "uidesigner",
        displayName: "UI Designer",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        verified: true,
        content: "New design system for our latest project. What do you think? #Design #UI",
        timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
        image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        likes: 1256,
        rechirps: 348,
        replies: 42,
        views: "231K"
      }
    ]
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call for search results
    setTimeout(() => {
      setSearchResults(mockResults[activeFilter]);
      setIsSearching(false);
    }, 800);
  };

  // Format timestamp to readable format
  const formatTime = (timestamp) => {
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
      return date.toLocaleDateString();
    }
  };

  useEffect(() => {
    // Reset search results when filter changes
    if (searchQuery.trim()) {
      setIsSearching(true);
      setTimeout(() => {
        setSearchResults(mockResults[activeFilter] || []);
        setIsSearching(false);
      }, 800);
    }
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-50">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700 px-4 py-3">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800">
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <form onSubmit={handleSearch} className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
            <input 
              type="text" 
              placeholder="Search Chirper" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 py-2 w-full bg-surface-100 dark:bg-surface-800 border-none focus:bg-white dark:focus:bg-surface-700"
            />
          </form>
        </div>
        
        <div className="mt-3 flex">
          <button 
            onClick={() => setActiveFilter('latest')} 
            className={`flex-1 py-3 relative ${activeFilter === 'latest' ? 'font-bold' : 'text-surface-500'}`}
          >
            Latest
            {activeFilter === 'latest' && (
              <motion.div 
                layoutId="activeSearchTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
              ></motion.div>
            )}
          </button>
          <button 
            onClick={() => setActiveFilter('people')} 
            className={`flex-1 py-3 relative ${activeFilter === 'people' ? 'font-bold' : 'text-surface-500'}`}
          >
            People
            {activeFilter === 'people' && (
              <motion.div 
                layoutId="activeSearchTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
              ></motion.div>
            )}
          </button>
          <button 
            onClick={() => setActiveFilter('media')} 
            className={`flex-1 py-3 relative ${activeFilter === 'media' ? 'font-bold' : 'text-surface-500'}`}
          >
            Media
            {activeFilter === 'media' && (
              <motion.div 
                layoutId="activeSearchTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
              ></motion.div>
            )}
          </button>
        </div>
      </header>

      <div className="divide-y divide-surface-200 dark:divide-surface-700">
        {isSearching ? (
          <div className="p-6 text-center text-surface-500">
            <div className="inline-block animate-spin mr-2">
              <SearchIcon className="w-5 h-5" />
            </div>
            Searching...
          </div>
        ) : searchQuery && searchResults.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-xl font-bold mb-2">No results found</p>
            <p className="text-surface-500">Try searching for something else</p>
          </div>
        ) : searchQuery && searchResults.length > 0 ? (
          <>
            {activeFilter === 'people' ? (
              // People results
              searchResults.map(person => (
                <div key={person.id} className="p-4 hover:bg-surface-100 dark:hover:bg-surface-800/80 transition-colors">
                  <div className="flex items-start">
                    <img 
                      src={person.avatar} 
                      alt={person.displayName} 
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-bold hover:underline">{person.displayName}</h3>
                        {person.verified && (
                          <VerifiedIcon className="w-4 h-4 text-primary ml-1" />
                        )}
                      </div>
                      <div className="text-surface-500">@{person.username}</div>
                      <p className="mt-1">{person.bio}</p>
                      <div className="text-surface-500 text-sm mt-1">{person.followers} followers</div>
                    </div>
                    <button className="btn-primary text-sm py-1.5">Follow</button>
                  </div>
                </div>
              ))
            ) : (
              // Latest and Media results (chirps with or without images)
              searchResults.map(chirp => (
                <article key={chirp.id} className="chirp-item relative">
                  <div className="flex">
                    <img 
                      src={chirp.avatar} 
                      alt={chirp.displayName} 
                      className="w-12 h-12 rounded-full object-cover mr-3 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <h3 className="font-bold text-base hover:underline truncate mr-1">{chirp.displayName}</h3>
                          {chirp.verified && (
                            <VerifiedIcon className="w-4 h-4 text-primary flex-shrink-0" />
                          )}
                          <span className="text-surface-500 text-sm ml-1 truncate">@{chirp.username} · {formatTime(chirp.timestamp)}</span>
                        </div>
                        <button className="p-2 rounded-full hover:bg-primary/10 text-surface-500">
                          <MoreHorizontalIcon className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <p className="mt-1 mb-2 text-[15px] text-balance">{chirp.content}</p>
                      
                      {chirp.image && (
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
                          <span className="text-sm ml-1">{chirp.replies}</span>
                        </button>
                        
                        <button className="flex items-center text-surface-500 hover:text-green-500 group">
                          <div className="p-2 rounded-full group-hover:bg-green-500/10">
                            <RepeatIcon className="w-5 h-5" />
                          </div>
                          <span className="text-sm ml-1">{chirp.rechirps}</span>
                        </button>
                        
                        <button className="flex items-center text-surface-500 hover:text-accent group">
                          <div className="p-2 rounded-full group-hover:bg-accent/10">
                            <HeartIcon className="w-5 h-5" />
                          </div>
                          <span className="text-sm ml-1">{chirp.likes}</span>
                        </button>
                        
                        <button className="flex items-center text-surface-500 hover:text-primary group">
                          <div className="p-2 rounded-full group-hover:bg-primary/10">
                            <ShareIcon className="w-5 h-5" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </>
        ) : (
          <div className="p-6 text-center text-surface-500">
            <SearchIcon className="w-10 h-10 mx-auto mb-4 opacity-50" />
            <p className="text-xl font-bold mb-2">Search Chirper</p>
            <p className="text-surface-500">Try searching for people, topics, or keywords</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;