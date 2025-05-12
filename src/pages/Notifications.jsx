import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import getIcon from '../utils/iconUtils';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'like',
      user: {
        username: 'janedoe',
        displayName: 'Jane Doe',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        verified: true
      },
      content: 'liked your chirp',
      chirpContent: 'Just started learning React and loving it so far!',
      timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: 2,
      type: 'mention',
      user: {
        username: 'technews',
        displayName: 'Tech News',
        avatar: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        verified: true
      },
      content: 'mentioned you',
      chirpContent: 'Have you seen the new features by @yourusername? Absolutely game-changing for developers!',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: 3,
      type: 'follow',
      user: {
        username: 'johnsmith',
        displayName: 'John Smith',
        avatar: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        verified: false
      },
      content: 'followed you',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      read: true
    },
    {
      id: 4,
      type: 'like',
      user: {
        username: 'elonmusk',
        displayName: 'Elon Musk',
        avatar: 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        verified: true
      },
      content: 'liked your chirp',
      chirpContent: 'The future of technology is bright!',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      read: true
    },
    {
      id: 5,
      type: 'mention',
      user: {
        username: 'nasa',
        displayName: 'NASA',
        avatar: 'https://images.unsplash.com/photo-1569974585997-8246297d7b0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        verified: true
      },
      content: 'mentioned you',
      chirpContent: 'Thanks @yourusername for your insights on our latest mission!',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      read: true
    }
  ]);

  const BellIcon = getIcon('Bell');
  const HeartIcon = getIcon('Heart');
  const AtSignIcon = getIcon('AtSign');
  const UserPlusIcon = getIcon('UserPlus');
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const VerifiedIcon = getIcon('BadgeCheck');

  const formatNotificationTime = (timestamp) => {
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

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({
        ...notification,
        read: true
      }))
    );
  };

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(notification => notification.type === activeTab);

  const getTypeIcon = (type) => {
    switch(type) {
      case 'like': return <HeartIcon className="w-5 h-5 text-accent" />;
      case 'mention': return <AtSignIcon className="w-5 h-5 text-primary" />;
      case 'follow': return <UserPlusIcon className="w-5 h-5 text-secondary" />;
      default: return <BellIcon className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 max-w-2xl w-full mx-auto border-x border-surface-200 dark:border-surface-700">
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700 px-4 py-3">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 -ml-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors">
              <ChevronLeftIcon className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold">Notifications</h1>
          </div>
          
          <div className="mt-3 flex">
            <button 
              onClick={() => setActiveTab('all')} 
              className={`flex-1 py-3 relative ${activeTab === 'all' ? 'font-bold' : 'text-surface-500'}`}
            >
              All
              {activeTab === 'all' && (
                <motion.div 
                  layoutId="activeNotificationTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
                ></motion.div>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('mention')} 
              className={`flex-1 py-3 relative ${activeTab === 'mention' ? 'font-bold' : 'text-surface-500'}`}
            >
              Mentions
              {activeTab === 'mention' && (
                <motion.div 
                  layoutId="activeNotificationTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
                ></motion.div>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('like')} 
              className={`flex-1 py-3 relative ${activeTab === 'like' ? 'font-bold' : 'text-surface-500'}`}
            >
              Likes
              {activeTab === 'like' && (
                <motion.div 
                  layoutId="activeNotificationTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
                ></motion.div>
              )}
            </button>
          </div>
        </header>

        <div className="divide-y divide-surface-200 dark:divide-surface-700">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
              <article key={notification.id} className={`p-4 flex items-start ${notification.read ? '' : 'bg-surface-100 dark:bg-surface-800/50'}`}>
                <div className="mr-3 mt-1">{getTypeIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <img src={notification.user.avatar} alt={notification.user.displayName} className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <div className="flex items-center flex-wrap gap-1">
                        <span className="font-bold">{notification.user.displayName}</span>
                        {notification.user.verified && <VerifiedIcon className="w-4 h-4 text-primary" />}
                        <span className="text-surface-500">{notification.content} · {formatNotificationTime(notification.timestamp)}</span>
                      </div>
                      {notification.chirpContent && (
                        <p className="mt-1 text-surface-600 dark:text-surface-400">{notification.chirpContent}</p>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="p-8 text-center text-surface-500">
              No notifications found in this category.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Notifications;