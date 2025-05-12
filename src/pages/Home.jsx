import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const getSavedChirps = () => {
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
  };
  
  const [chirps, setChirps] = useState(getSavedChirps);
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
      rechirps: 0,
      replies: 0,
      views: "0",
      isLiked: false,
      isRechirped: false
    };
    
    setChirps([newChirp, ...chirps]);
    toast.success("Your chirp was posted!");
  };

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };
  
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };
  
  const isActive = path => location.pathname === path;

  const handleLike = (id) => {
    setChirps(chirps.map(chirp => {
      if (chirp.id === id) {
        const isLiked = !chirp.isLiked;
        return {
          ...chirp,
          likes: chirp.likes + (isLiked ? 1 : -1),
          isLiked
        };
      }
      return chirp;
    }));
  };

  const handleRechirp = (id) => {
    setChirps(chirps.map(chirp => {
      if (chirp.id === id) {
        const isRechirped = !chirp.isRechirped;
        return {
          ...chirp,
          rechirps: chirp.rechirps + (isRechirped ? 1 : -1),
          isRechirped
        };
      }
      return chirp;
    }));
  };

  const formatChirpTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m`;
    } else {
      return `${Math.floor(diffInSeconds / 3600)}h`;
    }
  };
  
  // Import all the necessary icons
  const HomeIcon = getIcon('Home');
  const SearchIcon = getIcon('Search');
  const BellIcon = getIcon('Bell');
  const MessageCircleIcon = getIcon('MessageCircle');
  const BookmarkIcon = getIcon('Bookmark');
  const UserIcon = getIcon('User');
  const SettingsIcon = getIcon('Settings');
  const HeartIcon = getIcon('Heart');
  const RepeatIcon = getIcon('Repeat');
  const ShareIcon = getIcon('Share');
  const MoreHorizontalIcon = getIcon('MoreHorizontal');
  const VerifiedIcon = getIcon('BadgeCheck');
  
  return (
    <div className="relative flex min-h-screen">
      {/* Left Sidebar */}
      <aside className="hidden sm:flex flex-col w-20 xl:w-64 p-4 sticky top-0 h-screen border-r border-surface-200 dark:border-surface-700">
        <div>
          <img src="/chirper-logo.svg" alt="chirper" className="w-8 h-8" />
          
          <nav className="flex-1 px-2 mt-2">
            <Link to="/" className="flex items-center justify-center xl:justify-start p-3 rounded-full text-primary bg-primary/10 font-medium">
              <HomeIcon className="h-6 w-6" />
              <span className="hidden xl:block ml-4">Home</span>
            </Link>
            
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
            </button>
          </nav>
        </div>
        
        <div className="mt-auto flex items-center p-3 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="hidden xl:block ml-3">
            <div className="font-bold text-sm">Your Name</div>
            <div className="text-surface-500 text-sm">@yourusername</div>
          </div>
          <MoreHorizontalIcon className="hidden xl:block w-5 h-5 ml-auto" />
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 border-r border-surface-200 dark:border-surface-700">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700">
          <div className="flex justify-between px-4 py-3">
            <h1 className="text-xl font-bold">Home</h1>
          </div>
          
          <div className="flex border-b border-surface-200 dark:border-surface-700">
            <button 
              onClick={() => setActiveTab('for-you')} 
              className={`flex-1 py-3 relative ${activeTab === 'for-you' ? 'font-bold' : 'text-surface-500'}`}
            >
              For you
              {activeTab === 'for-you' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
                ></motion.div>
              )}
            </button>
            
            <button 
              onClick={() => setActiveTab('following')} 
              className={`flex-1 py-3 relative ${activeTab === 'following' ? 'font-bold' : 'text-surface-500'}`}
            >
              Following
              {activeTab === 'following' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
                ></motion.div>
              )}
            </button>
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
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <span className="font-bold mr-1">{chirp.displayName}</span>
                      {chirp.verified && (
                        <VerifiedIcon className="w-4 h-4 text-primary flex-shrink-0" />
                      )}
                      <span className="text-surface-500 text-sm ml-1 truncate">@{chirp.username} · {formatChirpTime(chirp.timestamp)}</span>
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
                        <MessageCircleIcon className="w-5 h-5" />
                      </div>
                      <span className="text-sm ml-1">{chirp.replies}</span>
                    </button>
                    
                    <button 
                      onClick={() => handleRechirp(chirp.id)} 
                      className={`flex items-center ${chirp.isRechirped ? 'text-green-500' : 'text-surface-500 hover:text-green-500'} group`}
                    >
                      <div className={`p-2 rounded-full ${chirp.isRechirped ? 'bg-green-500/10' : 'group-hover:bg-green-500/10'}`}>
                        <RepeatIcon className="w-5 h-5" />
                      </div>
                      <span className="text-sm ml-1">{chirp.rechirps}</span>
                    </button>
                    
                    <button 
                      onClick={() => handleLike(chirp.id)} 
                      className={`flex items-center ${chirp.isLiked ? 'text-accent' : 'text-surface-500 hover:text-accent'} group`}
                    >
                      <div className={`p-2 rounded-full ${chirp.isLiked ? 'bg-accent/10' : 'group-hover:bg-accent/10'}`}>
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
    </div>
  );
};

export default Home;