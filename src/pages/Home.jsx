import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

const Home = () => {
  const [chirps, setChirps] = useState(() => {
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
  
  const HomeIcon = getIcon('Home');
  const SearchIcon = getIcon('Search');
  const BellIcon = getIcon('Bell');
  const MessageCircleIcon = getIcon('MessageCircle');
  const BookmarkIcon = getIcon('Bookmark');
  const UserIcon = getIcon('User');
  const SettingsIcon = getIcon('Settings');
  const HeartIcon = getIcon('Heart');
  const RepeatIcon = getIcon('Repeat');
  const MessageSquareIcon = getIcon('MessageSquare');
  const ShareIcon = getIcon('Share');
  const VerifiedIcon = getIcon('BadgeCheck');
  const MoreHorizontalIcon = getIcon('MoreHorizontal');
  const TrendingUpIcon = getIcon('TrendingUp');
  const GlobeIcon = getIcon('Globe');
  
  const formatChirpTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m`;
            <nav className="flex-1 px-2 mt-2">
      return `${Math.floor(diffInSeconds / 3600)}h`;
    } else {
    }
  };
              <Link to="/search" className="flex items-center p-3 mb-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800" aria-label="Search">
  return (
    <div className="relative flex min-h-screen">
      {/* Left Sidebar */}
      <aside className="hidden sm:flex flex-col w-20 xl:w-64 p-4 sticky top-0 h-screen border-r border-surface-200 dark:border-surface-700">
        <div>
          <nav className="flex-1 px-2 mt-2">
            <button className="flex items-center justify-center xl:justify-start p-3 rounded-full text-primary bg-primary/10 font-medium">
              <HomeIcon className="h-6 w-6" />
              <span className="hidden xl:block ml-4">Home</span>
            </button>
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
            <button className="flex items-center justify-center xl:justify-start p-3 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors">
              <SettingsIcon className="h-6 w-6" />
              <span className="hidden xl:block ml-4">Settings</span>
            </button>
          </nav>
        </div>
          <button className="mt-6 btn-primary w-full">
          <span className="hidden xl:inline">Chirp</span>
          <span className="xl:hidden">+</span>
        </button>
        
        <div className="mt-auto flex items-center p-3 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="hidden xl:block ml-3">
            <p className="font-medium text-sm">Your Name</p>
            <p className="text-surface-500 text-xs">@yourusername</p>
          </div>
          <MoreHorizontalIcon className="hidden xl:block w-5 h-5 ml-auto" />
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto border-x border-surface-200 dark:border-surface-700">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700 px-4 py-3">
          <h1 className="text-xl font-bold">Home</h1>
          
          <div className="mt-3 flex">
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
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <h3 className="font-bold text-base hover:underline truncate mr-1">{chirp.displayName}</h3>
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
                        <MessageSquareIcon className="w-5 h-5" />
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