import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setLanguage, setSettingsLoading, setSettingsError } from '../store/settingsSlice';
import { userProfileService } from '../services/userProfileService';
import getIcon from '../utils/iconUtils';

const SettingsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState('appearance');
  const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || 'medium');
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));
  const { language, isLoading } = useSelector((state) => state.settings);
  const [notificationSettings, setNotificationSettings] = useState({

    mentions: true,
    replies: true,
    likes: true,
    follows: true,
    directMessages: true,
    emailNotifications: false,
    pushNotifications: true
  });
  const [privacySettings, setPrivacySettings] = useState({
    privateAccount: false,
    showOnlineStatus: true,
    readReceipts: true,
    dataSharing: false,
    discoverability: true
  });
  const [accountSettings, setAccountSettings] = useState({
    twoFactorAuth: false,
    connectedApps: true,
    autoplayVideos: true,
    dataUsage: 'high',
    language: language
  });

  // Icons
  const HomeIcon = getIcon('Home');
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const MoonIcon = getIcon('Moon');
  const SunIcon = getIcon('Sun');
  const BellIcon = getIcon('Bell');
  const LockIcon = getIcon('Lock');
  const UserIcon = getIcon('User');
  const PaletteIcon = getIcon('Palette');
  const ChevronDownIcon = getIcon('ChevronDown');
  const LoaderIcon = getIcon('Loader');

  // Initialize font size from localStorage on mount
  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      setFontSize(savedFontSize);
      applyFontSize(savedFontSize);
    }
  }, []);

  // Update account settings when language changes in Redux
  useEffect(() => {
    setAccountSettings(prev => ({ ...prev, language: language }));
  }, [language]);

  const handleFontSizeChange = (e) => {
    const newSize = e.target.value;
    setFontSize(newSize);
    applyFontSize(newSize);
    localStorage.setItem('fontSize', newSize);
  };

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setDarkMode(!darkMode);
  };

  const applyFontSize = (size) => {
    // Remove any existing font size classes
    document.documentElement.classList.remove('text-small', 'text-medium', 'text-large');
    
    // Add the selected font size class
    document.documentElement.classList.add(`text-${size}`);
    
    // Apply specific CSS adjustments based on the selected size
    if (size === 'small') {
      document.documentElement.style.fontSize = '0.875rem'; // 14px
    } else if (size === 'medium') {
      document.documentElement.style.fontSize = '1rem'; // 16px
    } else if (size === 'large') {
      document.documentElement.style.fontSize = '1.125rem'; // 18px
    }
  };

  const handleNotificationChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };

  const handlePrivacyChange = (setting) => {
    setPrivacySettings({
      ...privacySettings,
      [setting]: !privacySettings[setting]
    });
  };

  const handleAccountChange = async (setting, value) => {
    const newValue = typeof value === 'boolean' ? !accountSettings[setting] : value;
    
    setAccountSettings({
      ...accountSettings,
      [setting]: newValue
    });
    
    // For language setting, update Redux and save to database
    if (setting === 'language') {
      dispatch(setSettingsLoading(true));
      try {
        // Get current user from Redux store
        const user = JSON.parse(localStorage.getItem('user'));
        await userProfileService.updateLanguagePreference(user?.emailAddress || 'unknown', newValue);
        dispatch(setLanguage(newValue));
        toast.success(`Language changed to ${newValue}`);
      } catch (error) {
        dispatch(setSettingsError(error.message));
        toast.error(`Failed to update language: ${error.message}`);
      } finally {
        dispatch(setSettingsLoading(false));
      }
    }
  };

  const menuItems = [
    { id: 'appearance', label: 'Appearance', icon: <PaletteIcon className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <BellIcon className="w-5 h-5" /> },
    { id: 'privacy', label: 'Privacy', icon: <LockIcon className="w-5 h-5" /> },
    { id: 'account', label: 'Account', icon: <UserIcon className="w-5 h-5" /> }
  ];

  const renderAppearanceSettings = () => (
    <div>
      <h2 className="text-xl font-bold mb-6">Appearance Settings</h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Dark Mode</h3>
            <p className="text-sm text-surface-600 dark:text-surface-400">Toggle between light and dark theme</p>
          </div>
          <button 
            onClick={toggleDarkMode}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-surface-300 dark:bg-surface-700"
          >
            <span className={`${darkMode ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}>
              {darkMode ? <MoonIcon className="h-4 w-4 text-surface-800" /> : <SunIcon className="h-4 w-4 text-surface-800" />}
            </span>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Font Size</h3>
            <p className="text-sm text-surface-600 dark:text-surface-400">Adjust text size across the app</p>
          </div>
          <select 
            value={fontSize}
            onChange={handleFontSizeChange}
            className="px-3 py-1.5 bg-surface-100 dark:bg-surface-800 rounded-lg"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Reduce Animations</h3>
            <p className="text-sm text-surface-600 dark:text-surface-400">Minimize motion for accessibility</p>
          </div>
          <button 
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-surface-300 dark:bg-surface-700"
          >
            <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div>
      <h2 className="text-xl font-bold mb-6">Notification Settings</h2>
      
      <div className="space-y-6">
        {Object.entries(notificationSettings).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</h3>
              <p className="text-sm text-surface-600 dark:text-surface-400">
                {`Receive notifications for ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              </p>
            </div>
            <button 
              onClick={() => handleNotificationChange(key)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${value ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-700'}`}
            >
              <span className={`${value ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div>
      <h2 className="text-xl font-bold mb-6">Privacy Settings</h2>
      
      <div className="space-y-6">
        {Object.entries(privacySettings).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</h3>
              <p className="text-sm text-surface-600 dark:text-surface-400">
                {`Control ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} settings`}
              </p>
            </div>
            <button 
              onClick={() => handlePrivacyChange(key)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${value ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-700'}`}
            >
              <span className={`${value ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAccountSettings = () => (
    <div>
      <h2 className="text-xl font-bold mb-6">Account Settings</h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Two Factor Authentication</h3>
            <p className="text-sm text-surface-600 dark:text-surface-400">Add an extra layer of security</p>
          </div>
          <button 
            onClick={() => handleAccountChange('twoFactorAuth')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${accountSettings.twoFactorAuth ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-700'}`}
          >
            <span className={`${accountSettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}></span>
          </button>
        </div> 

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Language</h3>
            <p className="text-sm text-surface-600 dark:text-surface-400">Select your preferred language</p>
          </div>
          <div className="flex items-center">
            {isLoading && 
              <LoaderIcon className="animate-spin w-4 h-4 mr-2" />
            }
            <select 
              className="px-3 py-1.5 bg-surface-100 dark:bg-surface-800 rounded-lg transition-opacity"
              value={accountSettings.language}
              disabled={isLoading}
              onChange={(e) => handleAccountChange('language', e.target.value)}
              style={{ opacity: isLoading ? 0.7 : 1 }}
            >
              <option value="English (US)">English (US)</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
          </select>
          </div>
        </div>

        <button 
          onClick={() => { navigate('/login'); window.location.reload(); }}
          className="w-full p-3 mt-4 bg-accent hover:bg-opacity-90 text-white rounded-lg">
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 p-4 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="flex items-center text-surface-700 dark:text-surface-300 hover:text-primary">
            <ChevronLeftIcon className="w-5 h-5 mr-2" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <div className="block lg:hidden mb-4">
          <select
            className="w-full p-3 bg-surface-100 dark:bg-surface-800 rounded-lg font-medium"
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value)}
          >
            {menuItems.map(item => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
          <aside className="hidden lg:block w-64 bg-surface-100 dark:bg-surface-800 rounded-xl p-4">
            {menuItems.map(item => (
              <button
                key={item.id}
                className={`flex items-center w-full p-3 mb-2 rounded-lg ${activeSection === item.id ? 'bg-primary text-white' : 'hover:bg-surface-200 dark:hover:bg-surface-700'}`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </button>
            ))}
          </aside>

          <main className="flex-1 bg-surface-100 dark:bg-surface-800 rounded-xl p-6">
            {activeSection === 'appearance' && renderAppearanceSettings()}
            {activeSection === 'notifications' && renderNotificationSettings()}
            {activeSection === 'privacy' && renderPrivacySettings()}
            {activeSection === 'account' && renderAccountSettings()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;