import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

function Home({ chirps, onAddChirp, onOpenCreateModal }) {
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState('/');
  
  // Mock data for trending topics
  const trendingTopics = [
    {
      tag: '#ReactJS',
      chirps: '12.5K',
    },
    {
      tag: '#TailwindCSS',
      chirps: '9.8K',
    },
    {
      tag: '#100DaysOfCode',
      chirps: '8.3K',
    },
    {
      tag: '#WebDevelopment',
      chirps: '5.2K',
    },
    {
      tag: '#FrontendDevelopment',
      chirps: '3.7K',
    },
    {
      tag: '#UXDesign',
      chirps: '2.1K',
    }
  ];

  // Mock data for who to follow
  const whoToFollow = [
    {
      id: 1,
      name: 'Sarah Johnson',
      username: '@sarahjdesign',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80',
      isVerified: true,
    },
    {
      id: 2,
      name: 'Alex Morgan',
      username: '@alexmorgandev',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80',
      isVerified: false,
    },
    {
      id: 3,
      name: 'Jamie Chen',
      username: '@jamiechen',
      avatar: 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80',
      isVerified: true,
    },
  ];
  
  // Navigation items
  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: 'Home',
      activeIcon: 'HomeFill',
    },
    {
      name: 'Explore',
      path: '/search',
      icon: 'Search',
      activeIcon: 'SearchFill',
    },
    {
      name: 'Notifications',
      path: '/notifications',
      icon: 'Bell',
      activeIcon: 'BellFill',
    },
    {
      name: 'Messages',
      path: '/chats',
      icon: 'MessageCircle',
      activeIcon: 'MessageCircleFill',
    },
    {
      name: 'Saved',
      path: '/saved',
      icon: 'Bookmark',
      activeIcon: 'BookmarkFill',
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: 'User',
      activeIcon: 'UserFill',
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: 'Settings',
      activeIcon: 'SettingsFill',
    },
  ];
  
  const getActiveNavItem = (item) => {
    if (location.pathname === item.path) {
      const IconComponent = getIcon(item.activeIcon);
      return (
        <>
          <IconComponent className="w-7 h-7" />
          <span className="ml-4 text-lg font-medium hidden xl:block">{item.name}</span>
        </>
      );
    }
    
    const IconComponent = getIcon(item.icon);
    return (
      <>
        <IconComponent className="w-7 h-7" />
        <span className="ml-4 text-lg font-medium hidden xl:block">{item.name}</span>
      </>
    );
  };
  
  // Icons
  const ChevronRightIcon = getIcon('ChevronRight');
  const VerifiedIcon = getIcon('Badge');
  const MoreHorizontalIcon = getIcon('MoreHorizontal');

  return (
    <div className="flex min-h-screen bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-50">
      {/* Left sidebar */}
      <aside className="w-20 xl:w-72 h-screen sticky top-0 border-r border-surface-200 dark:border-surface-700 px-4 py-4 flex flex-col items-center xl:items-start">
        <div className="mb-4 p-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
        </div>

        <nav className="flex-1 w-full">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.path}
                  className={`flex items-center px-4 py-3 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors ${
                    location.pathname === item.path
                      ? 'font-semibold text-primary'
                      : 'text-surface-900 dark:text-surface-50'
                  }`}
                >
                  {getActiveNavItem(item)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto w-full px-2 mb-4">
          <button 
            className="mt-6 btn-primary w-full"
            onClick={onOpenCreateModal}
          >
            <span className="hidden xl:inline">Chirp</span>
            <span className="xl:hidden">+</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 border-r border-surface-200 dark:border-surface-700 max-w-2xl">
        <header className="sticky top-0 z-10 bg-surface-50/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700 px-4 py-3">
          <h1 className="text-xl font-bold">Home</h1>
        </header>
        
        <MainFeature onAddChirp={onAddChirp} />

        {/* Chirps feed would go here */}
        <div className="pt-4">
          {chirps && chirps.map((chirp, i) => (
            <div key={i} className="chirp-item">
              <div className="flex">
                <div className="mr-3 flex-shrink-0">
                  <img 
                    src={`https://i.pravatar.cc/48?img=${i + 10}`} 
                    alt="User avatar" 
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-bold mr-1">User Name</span>
                    {i % 2 === 0 && (
                      <VerifiedIcon className="text-primary w-4 h-4" />
                    )}
                    <span className="text-surface-500 dark:text-surface-400 ml-1">@username · 2h</span>
                    <button className="ml-auto p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700">
                      <MoreHorizontalIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="mt-1 mb-2">
                    {chirp.text || `This is a sample chirp #${i + 1}. Imagine an insightful thought or update here that would engage your audience!`}
                  </p>
                  {(chirp.image || i % 3 === 0) && (
                    <div className="mt-3 mb-2 rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-700">
                      <img 
                        src={chirp.image || `https://picsum.photos/600/400?random=${i}`} 
                        alt="Post media" 
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-2 text-surface-500">
                    <button className="flex items-center hover:text-primary">
                      <span className="sr-only">Reply</span>
                      {getIcon('MessageCircle')({ className: "w-5 h-5 mr-1" })}
                      <span>{Math.floor(Math.random() * 50)}</span>
                    </button>
                    <button className="flex items-center hover:text-green-500">
                      <span className="sr-only">Rechirp</span>
                      {getIcon('Repeat')({ className: "w-5 h-5 mr-1" })}
                      <span>{Math.floor(Math.random() * 100)}</span>
                    </button>
                    <button className="flex items-center hover:text-accent">
                      <span className="sr-only">Like</span>
                      {getIcon('Heart')({ className: "w-5 h-5 mr-1" })}
                      <span>{Math.floor(Math.random() * 1000)}</span>
                    </button>
                    <button className="flex items-center hover:text-primary">
                      <span className="sr-only">Share</span>
                      {getIcon('Share')({ className: "w-5 h-5 mr-1" })}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      {/* Right sidebar */}
      <aside className="hidden lg:block w-96 h-screen sticky top-0 p-4 overflow-y-auto scrollbar-hide">
        {/* Search */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {getIcon('Search')({ className: "w-5 h-5 text-surface-400" })}
          </div>
          <input 
            type="search"
            placeholder="Search chirps"
            className="input-field pl-10 bg-surface-100 dark:bg-surface-800"
          />
        </div>
        
        {/* Trending */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold mb-4">Trending</h2>
          <div className="space-y-4">
            {trendingTopics.map((topic, index) => (
              <div 
                key={index}
                className="flex justify-between items-center hover:bg-surface-100 dark:hover:bg-surface-700 p-2 rounded-lg cursor-pointer"
              >
                <div>
                  <div className="font-bold">{topic.tag}</div>
                  <div className="text-sm text-surface-500 dark:text-surface-400">{topic.chirps} chirps</div>
                </div>
                <MoreHorizontalIcon className="w-5 h-5 text-surface-400" />
              </div>
            ))}
            <a href="/trends" className="block text-primary hover:underline p-2">
              Show more
            </a>
          </div>
        </div>
        
        {/* Who to follow */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Who to follow</h2>
          <div className="space-y-4">
            {whoToFollow.map(user => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <div className="flex items-center">
                      <span className="font-bold">{user.name}</span>
                      {user.isVerified && (
                        <VerifiedIcon className="text-primary w-4 h-4 ml-1" />
                      )}
                    </div>
                    <div className="text-surface-500 dark:text-surface-400 text-sm">
                      {user.username}
                    </div>
                  </div>
                </div>
                <button className="btn-outline py-1 px-4 text-sm">
                  Follow
                </button>
              </div>
            ))}
            <a href="/suggestions" className="block text-primary hover:underline p-2">
              Show more
            </a>
          </div>
          <MoreHorizontalIcon className="hidden xl:block w-5 h-5 ml-auto" />
        </div>
      </aside>
    </div>
  );
}

export default Home;
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