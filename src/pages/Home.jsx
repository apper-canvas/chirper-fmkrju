import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils'; 
import MainFeature from '../components/MainFeature';

function Home({ chirps, onAddChirp, onOpenCreateModal }) {
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState('/');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Redux hooks
  const dispatch = useDispatch();
  const followedUsers = useSelector((state) => state.follow.followedUsers);
  const [expandedFollowList, setExpandedFollowList] = useState(false);
  const [isLoadingMoreUsers, setIsLoadingMoreUsers] = useState(false);
  
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
    {
      id: 4,
      name: 'Marcus Wright',
      username: '@mwright_dev',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80',
      isVerified: false,
    },
    {
      id: 5,
      name: 'Tanya Rodriguez',
      username: '@tanrodui',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80',
      isVerified: true,
    },
    {
      id: 6,
      name: 'Dev Williams',
      username: '@devwilliams',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80',
      isVerified: false,
    }
  ];
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
  const LoaderIcon = getIcon('Loader2');
  const Plus = getIcon('Plus');
  
  // Toggle follow status for a user
  const handleToggleFollow = (username, displayName) => {
    dispatch({
      type: 'follow/toggleFollowUser',
      payload: username
    });
    
    if (followedUsers.includes(username)) {
      toast.info(`Unfollowed ${displayName}`);
    } else {
      toast.success(`Following ${displayName}`);
    }
  };
  
  // Handle Show More/Less button click
  const handleShowMoreToggle = () => {
    if (expandedFollowList) {
      setExpandedFollowList(false);
      toast.info("Showing fewer suggestions");
    } else {
      setIsLoadingMoreUsers(true);
      // Simulate API loading delay
      setTimeout(() => {
        setExpandedFollowList(true);
        setIsLoadingMoreUsers(false);
        toast.success("More suggestions loaded");
      }, 800);
    }
  };

  return (
    <div className="flex min-h-screen bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-50">
      {/* Left sidebar */}
      <aside className="w-20 xl:w-72 h-screen sticky top-0 border-r border-surface-200 dark:border-surface-700 px-4 py-4 flex flex-col items-center xl:items-start">
        <div className="mb-4 p-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <img 
              src="/chirper-logo.svg" 
              alt="Chirper" 
              className="h-6 w-6"
              onClick={() => window.location.href = '/'}
            />
          </div>
        </div>
          <ul className="space-y-1">
            {navItems.map(item => (
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
        

        <div className="mt-auto w-full px-2 mb-4">
          <button 
              className="bg-primary text-white w-full h-12 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors duration-200" 
            onClick={onOpenCreateModal}
          >
            <span className="hidden xl:inline">Chirp</span>
            <span className="xl:hidden flex items-center justify-center">
              <Plus className="h-6 w-6" />
            </span>
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
                      <span className="ml-1">
                        <VerifiedIcon className="w-4 h-4 text-primary" />
                      </span>
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
                      <span className="w-5 h-5 mr-1">{React.createElement(getIcon('MessageCircle'), { className: "w-5 h-5 mr-1" })}</span>
                      <span>{Math.floor(Math.random() * 50)}</span>
                    </button>
                    <button className="flex items-center hover:text-green-500">
                      <span className="sr-only">Rechirp</span>
                      <span className="w-5 h-5 mr-1">{React.createElement(getIcon('Repeat'), { className: "w-5 h-5 mr-1" })}</span>
                      <span>{Math.floor(Math.random() * 100)}</span>
                    </button>
                    <button className="flex items-center hover:text-accent">
                      <span className="sr-only">Like</span>
                      <span className="w-5 h-5 mr-1">{React.createElement(getIcon('Heart'), { className: "w-5 h-5 mr-1" })}</span>
                      <span>{Math.floor(Math.random() * 1000)}</span>
                    </button>
                    <button className="flex items-center hover:text-primary">
                      <span className="sr-only">Share</span>
                      <span className="w-5 h-5 mr-1">{React.createElement(getIcon('Share'), { className: "w-5 h-5 mr-1" })}</span>
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
            <svg className="h-5 w-5 text-surface-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input 
            type="search"
            placeholder="Search chirps"
            className="input-field pl-10 bg-surface-100 dark:bg-surface-800"
          />
        </div>

        {/* Trending */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold mb-4">Trends for you</h2>
          <div className="space-y-4">
            {trendingTopics.map((topic, index) => (
              <div 
                key={index}
                className="flex justify-between items-center hover:bg-surface-100 dark:hover:bg-surface-700 p-2 rounded-lg cursor-pointer"
              >
                <div className="font-bold">{topic.tag}</div>
                <span className="text-sm text-surface-500">{topic.chirps} chirps</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Who to follow</h2>
          <div className="space-y-4">
            {whoToFollow
              .slice(0, expandedFollowList ? 6 : 3)
              .map(user => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div className="flex-1">
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
                <button
                  onClick={() => handleToggleFollow(user.username, user.name)}
                  className={`text-sm py-1.5 px-4 ${
                    followedUsers.includes(user.username)
                      ? 'btn-outline hover:bg-surface-100 dark:hover:bg-surface-700'
                      : 'btn-primary'
                  }`}
                >
                  {followedUsers.includes(user.username) ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
            <button 
              onClick={handleShowMoreToggle}
              disabled={isLoadingMoreUsers}
              className="block w-full text-primary hover:underline p-2 text-center transition-colors duration-200"
            >
              {isLoadingMoreUsers ? (
                <span className="flex items-center justify-center">
                  <LoaderIcon className="animate-spin h-4 w-4 mr-2" />
                  Loading...
                </span>
              ) : expandedFollowList ? "Show less" : "Show more"}
            </button>
          </div>
        </div>
      </aside>
      
      {/* Mobile create button */}
      <div className="fixed bottom-16 right-4 md:bottom-24 md:right-12 z-10 md:hidden">
        <button onClick={() => setIsCreateModalOpen(true)} className="bg-primary p-4 rounded-full shadow-lg hover:bg-primary-dark transition-colors flex items-center justify-center w-14 h-14">
          <Plus className="text-white h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
export default Home;