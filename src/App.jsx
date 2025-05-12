import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import getIcon from './utils/iconUtils';
import CreateChirpModal from './components/CreateChirpModal';

function App() {
  const [darkMode, setDarkMode] = useState(() => {  
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="rounded-xl shadow-lg"
      />
    </div>
  );
}

export default App;