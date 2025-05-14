import { createContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from './store/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion'; 
import Home from './pages/Home';
import Search from './pages/Search';
import Notifications from './pages/Notifications';
import ChatPage from './pages/ChatPage';
import SavedItems from './pages/SavedItems';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Callback from './pages/Callback';
import ErrorPage from './pages/ErrorPage';
import Dashboard from './pages/Dashboard';
import getIcon from './utils/iconUtils';
import CreateChirpModal from './components/CreateChirpModal';

// Create auth context
export const AuthContext = createContext(null);

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Get authentication status with proper error handling
  const userState = useSelector((state) => state.user);
  const isAuthenticated = userState?.isAuthenticated || false;

  const [darkMode, setDarkMode] = useState(() => {  
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    return false;
  });
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [chirps, setChirps] = useState([]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Initialize ApperUI once when the app loads
  useEffect(() => {
    const { ApperClient, ApperUI } = window.ApperSDK;
    const client = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    // Initialize but don't show login yet
    ApperUI.setup(client, {
      target: '#authentication',
      clientId: import.meta.env.VITE_APPER_PROJECT_ID,
      view: 'both',
      onSuccess: function (user) {
        // CRITICAL: This exact currentPath logic must be preserved in all implementations
        // DO NOT simplify or modify this pattern as it ensures proper redirection flow
        let currentPath = window.location.pathname + window.location.search;
        let redirectPath = new URLSearchParams(window.location.search).get('redirect');
        const isAuthPage = currentPath.includes('/login') || currentPath.includes('/signup') || currentPath.includes(
                '/callback') || currentPath.includes('/error');
        if (user) {
            // User is authenticated
            if (redirectPath) {
                navigate(redirectPath);
            } else if (!isAuthPage) {
                if (!currentPath.includes('/login') && !currentPath.includes('/signup')) {
                    navigate(currentPath);
                } else {
                    navigate('/dashboard');
                }
            } else {
                navigate('/dashboard');
            }
            // Store user information in Redux
            dispatch(setUser(JSON.parse(JSON.stringify(user))));
        } else {
            // User is not authenticated
            if (!isAuthPage) {
                navigate(
                    currentPath.includes('/signup')
                     ? `/signup?redirect=${currentPath}`
                     : currentPath.includes('/login')
                     ? `/login?redirect=${currentPath}`
                     : '/login');
            } else if (redirectPath) {
                if (
                    ![
                        'error',
                        'signup',
                        'login',
                        'callback'
                    ].some((path) => currentPath.includes(path)))
                    navigate(`/login?redirect=${redirectPath}`);
                else {
                    navigate(currentPath);
                }
            } else if (isAuthPage) {
                navigate(currentPath);
            } else {
                navigate('/login');
            }
            dispatch(clearUser());
        }
      },
      onError: function(error) {
        console.error("Authentication failed:", error);
      }
    });
    
    setIsInitialized(true);
  }, [dispatch, navigate]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast.info(`${!darkMode ? 'Dark' : 'Light'} mode activated!`, {
      icon: !darkMode ? "🌙" : "☀️",
      position: "bottom-right",
      autoClose: 2000,
    });
  };
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [chirps, setChirps] = useState([]);
  
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };
  
  const handleAddChirp = (newChirp) => {
    setChirps((prevChirps) => [newChirp, ...prevChirps]);
  };

  const MoonIcon = getIcon('Moon');
  const SunIcon = getIcon('Sun');

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-50 transition-colors duration-200">
      <CreateChirpModal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} onAddChirp={handleAddChirp} />
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-surface-200 dark:bg-surface-800 shadow-neu-light dark:shadow-neu-dark hover:scale-105 transition-all duration-200"
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={darkMode ? 'dark' : 'light'}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </motion.div>
        </AnimatePresence>
      </button>
      
      <Routes>
        <Route path="/" element={<Home chirps={chirps} onAddChirp={handleAddChirp} onOpenCreateModal={handleOpenCreateModal} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/chats" element={<ChatPage />} />
        <Route path="/saved" element={<SavedItems />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        theme="colored"
        toastClassName="rounded-xl shadow-lg"
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;



  
  // Authentication methods to share via context
  const authMethods = {
    isInitialized,
    logout: async () => {
      try {
        const { ApperUI } = window.ApperSDK;
        await ApperUI.logout();
        dispatch(clearUser());
        navigate('/login');
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  // Don't render routes until initialization is complete
  if (!isInitialized) {
    return <div className="loading">Initializing application...</div>;
  }
    <AuthContext.Provider value={authMethods}>
      <div className="min-h-screen bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-50 transition-colors duration-200">
        <CreateChirpModal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} onAddChirp={handleAddChirp} />
        <button
          onClick={toggleDarkMode}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-surface-200 dark:bg-surface-800 shadow-neu-light dark:shadow-neu-dark hover:scale-105 transition-all duration-200"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={darkMode ? 'dark' : 'light'}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </motion.div>
          </AnimatePresence>
        </button>
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Login />} />
          <Route path="/" element={isAuthenticated ? <Home chirps={chirps} onAddChirp={handleAddChirp} onOpenCreateModal={handleOpenCreateModal} /> : <Login />} />
          <Route path="/search" element={isAuthenticated ? <Search /> : <Login />} />
          <Route path="/notifications" element={isAuthenticated ? <Notifications /> : <Login />} />
          <Route path="/chats" element={isAuthenticated ? <ChatPage /> : <Login />} />
          <Route path="/saved" element={isAuthenticated ? <SavedItems /> : <Login />} />
          <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Login />} />
          <Route path="/settings" element={isAuthenticated ? <SettingsPage /> : <Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          theme="colored"
          toastClassName="rounded-xl shadow-lg"
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </AuthContext.Provider>