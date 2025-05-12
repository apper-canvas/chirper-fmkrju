import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import getIcon from '../utils/iconUtils';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "yourusername",
    displayName: "Your Name",
    bio: "Frontend Developer & UI/UX Enthusiast | Building beautiful web experiences | React, TypeScript, Tailwind CSS",
    location: "San Francisco, CA",
    website: "https://yourwebsite.com",
    joinDate: "2020-05-01T00:00:00.000Z",
    following: 287,
    followers: 452,
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  });

  // Icons
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const CalendarIcon = getIcon('Calendar');
  const LinkIcon = getIcon('Link');
  const MapPinIcon = getIcon('MapPin');
  const VerifiedIcon = getIcon('BadgeCheck');
  const HeartIcon = getIcon('Heart');
  const MessageSquareIcon = getIcon('MessageSquare');
  const RepeatIcon = getIcon('Repeat');
  const ShareIcon = getIcon('Share');
  const MoreHorizontalIcon = getIcon('MoreHorizontal');
  const ImageIcon = getIcon('Image');
  const SmileIcon = getIcon('Smile');
  const EditIcon = getIcon('Edit2');

  const handleEditProfile = () => {
    if (isEditingProfile) {
      // Save profile changes
      setIsEditingProfile(false);
    } else {
      setIsEditingProfile(true);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Sample user chirps for the profile tabs
  const userChirps = [
    {
      id: 1,
      content: "Just deployed my latest project! Check it out at https://myproject.dev #React #Tailwind",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      likes: 42,
      rechirps: 8,
      replies: 5,
      views: "1.2K",
    },
    {
      id: 2,
      content: "Exploring the new features of React 18. The concurrent rendering is a game changer! #ReactJS #WebDev",
      timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
      likes: 78,
      rechirps: 23,
      replies: 12,
      views: "3.7K",
      image: "https://images.unsplash.com/photo-1599251015915-1cb8e5e4bf6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 3,
      content: "Good design is like a refrigerator—when it works, no one notices, but when it doesn't, it sure stinks. - Irene Au",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 125,
      rechirps: 42,
      replies: 8,
      views: "5.2K",
    }
  ];

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMMM yyyy');
  };

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

  return (
    <div className="flex min-h-screen relative">
      {/* Left Sidebar (reused from Home component) */}
      <aside className="hidden sm:flex flex-col w-20 xl:w-64 p-4 sticky top-0 h-screen border-r border-surface-200 dark:border-surface-700">
        <div className="flex items-center justify-center xl:justify-start mb-6">
          <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
          </svg>
          <span className="hidden xl:block text-xl font-bold ml-2">Chirper</span>
        </div>
        
        <nav className="mt-4 flex flex-col space-y-2">
          <Link to="/" className="flex items-center justify-center xl:justify-start p-3 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors">
            <ArrowLeftIcon className="h-6 w-6" />
            <span className="hidden xl:block ml-4">Back Home</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto border-x border-surface-200 dark:border-surface-700">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700 px-4 py-3 flex items-center">
          <Link to="/" className="mr-6">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">{profileData.displayName}</h1>
            <p className="text-surface-500 text-sm">{userChirps.length} Chirps</p>
          </div>
        </header>

        {/* Profile Header */}
        <div className="relative">
          {/* Cover Image */}
          <div className="h-48 bg-surface-200 dark:bg-surface-700 overflow-hidden">
            <img 
              src={profileData.coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Image */}
          <div className="absolute -bottom-16 left-4">
            <div className="w-32 h-32 rounded-full border-4 border-white dark:border-surface-900 overflow-hidden">
              <img 
                src={profileData.profileImage} 
                alt={profileData.displayName} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="absolute top-4 right-4">
            <button 
              onClick={handleEditProfile}
              className="btn-outline font-medium rounded-full bg-white/70 dark:bg-surface-800/70 backdrop-blur-sm"
            >
              {isEditingProfile ? 'Save Profile' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-20 px-4">
          {isEditingProfile ? (
            <div className="space-y-4">
              <div>
                <label className="block text-surface-500 text-sm mb-1">Display Name</label>
                <input 
                  type="text" 
                  name="displayName" 
                  value={profileData.displayName}
                  onChange={handleProfileChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-surface-500 text-sm mb-1">Bio</label>
                <textarea 
                  name="bio" 
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  className="input-field min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-surface-500 text-sm mb-1">Location</label>
                <input 
                  type="text" 
                  name="location" 
                  value={profileData.location}
                  onChange={handleProfileChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-surface-500 text-sm mb-1">Website</label>
                <input 
                  type="text" 
                  name="website" 
                  value={profileData.website}
                  onChange={handleProfileChange}
                  className="input-field"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center">
                <h2 className="text-xl font-bold">{profileData.displayName}</h2>
                <VerifiedIcon className="w-5 h-5 text-primary ml-1" />
              </div>
              <p className="text-surface-500">@{profileData.username}</p>
              
              <p className="mt-3">{profileData.bio}</p>
              
              <div className="flex flex-wrap gap-4 mt-3 text-surface-500">
                {profileData.location && (
                  <div className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    <span>{profileData.location}</span>
                  </div>
                )}
                {profileData.website && (
                  <div className="flex items-center">
                    <LinkIcon className="w-4 h-4 mr-1" />
                    <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {profileData.website.replace(/(https?:\/\/)?(www\.)?/, '')}
                    </a>
                  </div>
                )}
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  <span>Joined {formatDate(profileData.joinDate)}</span>
                </div>
              </div>
              
              <div className="flex gap-5 mt-3">
                <div className="hover:underline">
                  <span className="font-bold">{profileData.following}</span>
                  <span className="text-surface-500"> Following</span>
                </div>
                <div className="hover:underline">
                  <span className="font-bold">{profileData.followers}</span>
                  <span className="text-surface-500"> Followers</span>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Profile Tabs */}
        <div className="mt-5 border-b border-surface-200 dark:border-surface-700">
          <div className="flex">
            <button 
              onClick={() => setActiveTab('posts')}
              className={`flex-1 py-3 font-medium relative ${activeTab === 'posts' ? 'font-bold' : 'text-surface-500'}`}
            >
              Posts
              {activeTab === 'posts' && (
                <motion.div layoutId="activeProfileTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab('replies')}
              className={`flex-1 py-3 font-medium relative ${activeTab === 'replies' ? 'font-bold' : 'text-surface-500'}`}
            >
              Replies
              {activeTab === 'replies' && (
                <motion.div layoutId="activeProfileTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab('media')}
              className={`flex-1 py-3 font-medium relative ${activeTab === 'media' ? 'font-bold' : 'text-surface-500'}`}
            >
              Media
              {activeTab === 'media' && (
                <motion.div layoutId="activeProfileTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab('likes')}
              className={`flex-1 py-3 font-medium relative ${activeTab === 'likes' ? 'font-bold' : 'text-surface-500'}`}
            >
              Likes
              {activeTab === 'likes' && (
                <motion.div layoutId="activeProfileTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
              )}
            </button>
          </div>
        </div>
        
        {/* Chirps Feed based on active tab */}
        <div className="divide-y divide-surface-200 dark:divide-surface-700">
          {userChirps.map(chirp => (
            <article key={chirp.id} className="p-4 hover:bg-surface-100 dark:hover:bg-surface-800/80 transition-colors">
              <div className="flex">
                <img 
                  src={profileData.profileImage} 
                  alt={profileData.displayName} 
                  className="w-12 h-12 rounded-full object-cover mr-3 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <h3 className="font-bold text-base hover:underline truncate mr-1">{profileData.displayName}</h3>
                      <VerifiedIcon className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-surface-500 text-sm ml-1 truncate">@{profileData.username} · {formatChirpTime(chirp.timestamp)}</span>
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
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;