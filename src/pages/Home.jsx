import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';
  const navigate = useNavigate();
  const location = useLocation();
  const [showCreateModal, setShowCreateModal] = useState(false);
const Home = () => {
    const savedChirps = localStorage.getItem('chirps');
    return savedChirps ? JSON.parse(savedChirps) : [
      {
        id: 1,
        username: "elonmusk",
        displayName: "Elon Musk",
        avatar: "https://images.unsplash.com/photo-1590086782957-93c06ef21604?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        verified: true,
        content: "Excited to announce our new rocket launch tomorrow! 🚀",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        likes: 2458,
        rechirps: 582,
        replies: 304,
        views: "1.2M",
        isLiked: false,
        isRechirped: false
      },
      {
        id: 2,
        username: "nasa",
        displayName: "NASA",
        avatar: "https://images.unsplash.com/photo-1569974585997-8246297d7b0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        verified: true,
        content: "Our telescopes have captured stunning new images of the galaxy cluster MACS J0416. These cosmic giants contain hundreds of galaxies and enormous amounts of dark matter. https://go.nasa.gov/3IKQzrF",
        image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        likes: 12653,
        rechirps: 3982,
        replies: 529,
        views: "4.7M",
        isLiked: false,
        isRechirped: false
      },
      {
        id: 3,
        username: "natgeo",
        displayName: "National Geographic",
        avatar: "https://images.unsplash.com/photo-1535390313236-547a29de6024?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        verified: true,
        content: "The endangered Amur leopard is one of the world's most elusive cats. Today, only around 100 remain in the wild.",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        likes: 7845,
        rechirps: 1253,
        replies: 243,
        views: "2.3M",
        isLiked: false,
        isRechirped: false
      }
    ];
  });
  
  const location = useLocation();
  
  const [activeTab, setActiveTab] = useState('for-you');
  
  useEffect(() => {
    localStorage.setItem('chirps', JSON.stringify(chirps));
  }, [chirps]);
  
  const addChirp = (chirpContent) => {
    const newChirp = {
      id: Date.now(),
      username: "yourusername",
      displayName: "Your Name",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      verified: false,
      content: chirpContent,
      timestamp: new Date().toISOString(),
      likes: 0,
  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };
  
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };
  
  const isActive = path => location.pathname === path;
  
      rechirps: 0,
      replies: 0,
      views: "0",
      isLiked: false,
      isRechirped: false
    };
    
    setChirps([newChirp, ...chirps]);
    toast.success("Your chirp was posted!");
              <img src="/chirper-logo.svg" alt="chirper" className="w-8 h-8" />

  const handleLike = (id) => {
    setChirps(chirps.map(chirp => {
            <Link to="/" className={`flex items-center p-3 w-full hover:bg-surface-100 dark:hover:bg-surface-800 rounded-full ${isActive('/') ? 'font-bold' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        return {
          ...chirp,
          likes: chirp.likes + (isLiked ? 1 : -1),
              <span className="hidden xl:inline ml-4">Home</span>
            </Link>
      }
            <Link to="/search" className={`flex items-center p-3 w-full hover:bg-surface-100 dark:hover:bg-surface-800 rounded-full ${isActive('/search') ? 'font-bold' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
  };

  const handleRechirp = (id) => {
              <span className="hidden xl:inline ml-4">Search</span>
            </Link>
        const isRechirped = !chirp.isRechirped;
            <Link to="/notifications" className={`flex items-center p-3 w-full hover:bg-surface-100 dark:hover:bg-surface-800 rounded-full ${isActive('/notifications') ? 'font-bold' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          rechirps: chirp.rechirps + (isRechirped ? 1 : -1),
          isRechirped
        };
              <span className="hidden xl:inline ml-4">Notifications</span>
            </Link>
    }));
            <Link to="/chats" className={`flex items-center p-3 w-full hover:bg-surface-100 dark:hover:bg-surface-800 rounded-full ${isActive('/chats') ? 'font-bold' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
  const HomeIcon = getIcon('Home');
  const SearchIcon = getIcon('Search');
              <span className="hidden xl:inline ml-4">Messages</span>
            </Link>
  const BookmarkIcon = getIcon('Bookmark');
            <Link to="/saved" className={`flex items-center p-3 w-full hover:bg-surface-100 dark:hover:bg-surface-800 rounded-full ${isActive('/saved') ? 'font-bold' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
  const HeartIcon = getIcon('Heart');
  const RepeatIcon = getIcon('Repeat');
              <span className="hidden xl:inline ml-4">Bookmarks</span>
            </Link>
            
            <Link to="/settings" className={`flex items-center p-3 w-full hover:bg-surface-100 dark:hover:bg-surface-800 rounded-full ${isActive('/settings') ? 'font-bold' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span className="hidden xl:inline ml-4">Settings</span>
            </Link>
            
            {/* Create button */}
            <button 
              onClick={handleOpenCreateModal}
              className="mt-6 btn-primary w-full">
              <span className="hidden xl:inline">Create</span>
              <span className="inline xl:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
              </span>
  const ShareIcon = getIcon('Share');
  const MoreHorizontalIcon = getIcon('MoreHorizontal');
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m`;
    } else return `${Math.floor(diffInSeconds / 3600)}h`;
                    alt="John Doe" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
    <div className="relative flex min-h-screen">
      {/* Left Sidebar */}
      <aside className="hidden sm:flex flex-col w-20 xl:w-64 p-4 sticky top-0 h-screen border-r border-surface-200 dark:border-surface-700">
        <div>
          <nav className="flex-1 px-2 mt-2">
            <button className="flex items-center justify-center xl:justify-start p-3 rounded-full text-primary bg-primary/10 font-medium">
              <HomeIcon className="h-6 w-6" />
              <span className="hidden xl:block ml-4">Home</span>
          </div>
            <Link to="/search" className="flex items-center justify-center xl:justify-start p-3 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors">
              <SearchIcon className="h-6 w-6" />
              <span className="hidden xl:block ml-4">Explore</span>
            </Link>
            <Link to="/notifications" className="flex items-center justify-center xl:justify-start p-3 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors relative">
              <BellIcon className="h-6 w-6" />
              <span className="hidden xl:block ml-4">Notifications</span>
              <span className="absolute -top-1 -right-1 xl:top-2 xl:right-auto xl:left-7 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>
            <Link to="/chats" className="flex items-center justify-center xl:justify-start p-3 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors">
              <MessageCircleIcon className="h-6 w-6" />
              <span className="hidden xl:block ml-4">Messages</span>
            </Link>
            <Link to="/saved" className="flex items-center justify-center xl:justify-start p-3 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors">
              <BookmarkIcon className="h-6 w-6" />
              <span className="hidden xl:block ml-4">Bookmarks</span>
            </Link>
            <Link to="/profile" className="flex items-center justify-center xl:justify-start p-3 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors">
              <UserIcon className="h-6 w-6" />
              <span className="hidden xl:block ml-4">Profile</span>
            </Link>
            <Link 
              to="/settings"
              className="flex items-center justify-center xl:justify-start p-3 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors"
              aria-label="Settings"
            >
              <SettingsIcon className="h-6 w-6" />
              <span className="hidden xl:block ml-4">Settings</span>
                  alt={chirp.username}
                  className="w-12 h-12 rounded-full object-cover" 
          
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hidden xl:block w-5 h-5 ml-auto">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </div>
          </button>
        
          <div className="mt-auto flex items-center p-3 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="hidden xl:block ml-3">
                  src={chirp.image}
                  alt="Chirp content" 
                  className="mt-3 rounded-xl max-h-96 w-full object-cover object-center"
          <MoreHorizontalIcon className="hidden xl:block w-5 h-5 ml-auto" />
        </div>
        </div>
      </aside>
      
      {/* Main Content */}
                   className="flex items-center space-x-1 group"
        {/* Header */}
                  <div className="p-2 rounded-full group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
          
                  <span className="text-xs">{chirp.likes}</span>
            <button 
              onClick={() => setActiveTab('for-you')} 
              className={`flex-1 py-3 relative ${activeTab === 'for-you' ? 'font-bold' : 'text-surface-500'}`}
                  className="flex items-center space-x-1 group"
              For you
                  <div className="p-2 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  layoutId="activeTab"
                  <span className="text-xs">{chirp.comments}</span>
                ></motion.div>
              )}
            </button>
                  className="flex items-center space-x-1 group"
              onClick={() => setActiveTab('following')} 
                  <div className="p-2 rounded-full group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="m8 3 4 4.5L8 12"></path>
                      <path d="M4 7.5h8"></path>
                      <path d="m16 21-4-4.5 4-4.5"></path>
                      <path d="M20 16.5h-8"></path>
                    </svg>
                  </div>
                  <span className="text-xs">{chirp.retweets}</span>
              Following
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
                  className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              )}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                    <polyline points="16 6 12 2 8 6"></polyline>
                    <line x1="12" y1="2" x2="12" y2="15"></line>
                  </svg>
          </div>
        </header>
        
        {/* Compose Feature */}
        <MainFeature onAddChirp={addChirp} />
        
        {/* Timeline */}
        <div className="divide-y divide-surface-200 dark:divide-surface-700">
          {chirps.map(chirp => (
            <article key={chirp.id} className="chirp-item relative">
              <div className="flex">
                <img 
                  src={chirp.avatar} 
                  alt={chirp.displayName} 
                  className="w-12 h-12 rounded-full object-cover mr-3 flex-shrink-0"
                />
              <h2 className="font-bold text-xl">Who to follow</h2>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
            <div className="divide-y divide-surface-200 dark:divide-surface-700">
                      {chirp.verified && (
                        <VerifiedIcon className="w-4 h-4 text-primary flex-shrink-0" />
                      )}
                      <span className="text-surface-500 text-sm ml-1 truncate">@{chirp.username} · {formatChirpTime(chirp.timestamp)}</span>
                    </div>
                    <button className="p-2 rounded-full hover:bg-primary/10 text-surface-500">
                      <MoreHorizontalIcon className="w-5 h-5" />
                        className="w-12 h-12 rounded-full object-cover"
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
              <button className="text-primary hover:underline text-sm">Show more</button>
                      <div className="p-2 rounded-full group-hover:bg-primary/10">
                        <MessageSquareIcon className="w-5 h-5" />
                      </div>
                      <span className="text-sm ml-1">{chirp.replies}</span>
                    </button>
                    
              <h2 className="font-bold text-xl">Trends for you</h2>
                      onClick={() => handleRechirp(chirp.id)} 
                      className={`flex items-center ${chirp.isRechirped ? 'text-green-500' : 'text-surface-500 hover:text-green-500'} group`}
            <div className="divide-y divide-surface-200 dark:divide-surface-700">
                      <div className={`p-2 rounded-full ${chirp.isRechirped ? 'bg-green-500/10' : 'group-hover:bg-green-500/10'}`}>
                        <RepeatIcon className="w-5 h-5" />
                      </div>
          
          {/* Create Chirp Modal */}
          <AnimatePresence>
            {showCreateModal && (
              <div id="createChirpModal" className="fixed z-50 inset-0"></div>
            )}
          </AnimatePresence>
                      <span className="text-sm ml-1">{chirp.rechirps}</span>
                    </button>
                    
                    <button 
                      onClick={() => handleLike(chirp.id)} 
                      className={`flex items-center ${chirp.isLiked ? 'text-accent' : 'text-surface-500 hover:text-accent'} group`}
                    >
                      <div className={`p-2 rounded-full ${chirp.isLiked ? 'bg-accent/10' : 'group-hover:bg-accent/10'}`}>

export { Home };
                        <HeartIcon className="w-5 h-5" fill={chirp.isLiked ? "currentColor" : "none"} />
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
          ))}
        </div>
      </main>
      
      {/* Right Sidebar */}
      <aside className="hidden lg:block w-80 p-4 sticky top-0 h-screen overflow-y-auto">
        {/* Search */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
          <input 
            type="text" 
            placeholder="Search Chirper" 
            className="input-field pl-10 bg-surface-100 dark:bg-surface-800 border-none focus:bg-white dark:focus:bg-surface-700"
          />
        </div>
        
        {/* Trends */}
        <section className="mt-4 bg-surface-100 dark:bg-surface-800 rounded-2xl overflow-hidden">
          <h2 className="text-xl font-bold p-4">Trends for you</h2>
          
          <div className="divide-y divide-surface-200 dark:divide-surface-700">
            <div className="p-4 hover:bg-surface-200 dark:hover:bg-surface-700/50 transition-colors">
              <div className="flex justify-between">
                <div className="text-surface-500 text-sm">Trending in Technology</div>
                <button className="text-surface-500 hover:text-primary hover:bg-primary/10 rounded-full p-1">
                  <MoreHorizontalIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="font-bold mt-0.5">#React</div>
              <div className="text-surface-500 text-sm mt-0.5">24.5K chirps</div>
            </div>
            
            <div className="p-4 hover:bg-surface-200 dark:hover:bg-surface-700/50 transition-colors">
              <div className="flex justify-between">
                <div className="text-surface-500 text-sm">Trending in Business</div>
                <button className="text-surface-500 hover:text-primary hover:bg-primary/10 rounded-full p-1">
                  <MoreHorizontalIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="font-bold mt-0.5">#Startup</div>
              <div className="text-surface-500 text-sm mt-0.5">18.2K chirps</div>
            </div>
            
            <div className="p-4 hover:bg-surface-200 dark:hover:bg-surface-700/50 transition-colors">
              <div className="flex justify-between">
                <div className="text-surface-500 text-sm">Trending in Art</div>
                <button className="text-surface-500 hover:text-primary hover:bg-primary/10 rounded-full p-1">
                  <MoreHorizontalIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="font-bold mt-0.5">#DigitalArt</div>
              <div className="text-surface-500 text-sm mt-0.5">12.7K chirps</div>
            </div>
            
            <div className="p-4 hover:bg-surface-200 dark:hover:bg-surface-700/50 transition-colors">
              <div className="flex justify-between">
                <div className="text-surface-500 text-sm">Trending in Music</div>
                <button className="text-surface-500 hover:text-primary hover:bg-primary/10 rounded-full p-1">
                  <MoreHorizontalIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="font-bold mt-0.5">#NewMusic</div>
              <div className="text-surface-500 text-sm mt-0.5">9.3K chirps</div>
            </div>
          </div>
          
          <button className="p-4 text-primary hover:bg-surface-200 dark:hover:bg-surface-700/50 transition-colors w-full text-left">
            Show more
          </button>
        </section>
        
        {/* Who to follow */}
        <section className="mt-4 bg-surface-100 dark:bg-surface-800 rounded-2xl overflow-hidden">
          <h2 className="text-xl font-bold p-4">Who to follow</h2>
          
          <div className="divide-y divide-surface-200 dark:divide-surface-700">
            <div className="p-4 hover:bg-surface-200 dark:hover:bg-surface-700/50 transition-colors">
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-bold text-sm">Jane Doe</span>
                    <VerifiedIcon className="w-4 h-4 text-primary ml-1" />
                  </div>
                  <div className="text-surface-500 text-sm">@janedoe</div>
                </div>
                <button className="btn-primary text-sm py-1.5">Follow</button>
              </div>
            </div>
            
            <div className="p-4 hover:bg-surface-200 dark:hover:bg-surface-700/50 transition-colors">
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-bold text-sm">Tech News</span>
                    <VerifiedIcon className="w-4 h-4 text-primary ml-1" />
                  </div>
                  <div className="text-surface-500 text-sm">@technews</div>
                </div>
                <button className="btn-primary text-sm py-1.5">Follow</button>
              </div>
            </div>
            
            <div className="p-4 hover:bg-surface-200 dark:hover:bg-surface-700/50 transition-colors">
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-bold text-sm">John Smith</span>
                  </div>
                  <div className="text-surface-500 text-sm">@johnsmith</div>
                </div>
                <button className="btn-primary text-sm py-1.5">Follow</button>
              </div>
            </div>
          </div>
          <button className="p-4 text-primary hover:bg-surface-200 dark:hover:bg-surface-700/50 transition-colors w-full text-left">
            Show more
          </button>
        </section>
        
        {/* Footer */}
        <footer className="mt-4 text-xs text-surface-500">
          <div className="flex flex-wrap gap-2">
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Cookie Policy</a>
            <a href="#" className="hover:underline">Accessibility</a>
            <a href="#" className="hover:underline">Ads Info</a>
            <a href="#" className="hover:underline">More</a>
          </div>
          <div className="mt-2">© 2023 Chirper, Inc.</div>
        </footer>
      </aside>
      
      {/* Mobile Navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-surface-700 flex justify-around py-3 px-2 z-20">
        <button className="p-2">
          <HomeIcon className="w-6 h-6 text-primary" />
        </button>
        <Link to="/search" className="p-2">
          <SearchIcon className="w-6 h-6" />
        </Link>
        <Link to="/notifications" className="p-2 relative">
          <BellIcon className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3</span>
        </Link>
        <Link to="/chats" className="p-2">
          <MessageCircleIcon className="w-6 h-6" />
        </Link>
        <Link to="/saved" className="p-2">
          <BookmarkIcon className="w-6 h-6" />
        </Link>
      </nav>
      
      {/* Mobile Compose Button */}
      <button className="sm:hidden fixed right-5 bottom-20 z-20 bg-primary text-white rounded-full p-4 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
};

export default Home;