import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchChirps as fetchChirpsAction } from '../store/chirpsSlice';
import { AuthContext } from '../App';
import ChirpList from '../components/ChirpList';
import getIcon from '../utils/iconUtils';
import { chirpService } from '../services/chirpService';

const Dashboard = React.useCallback(() => {
  const dispatch = useDispatch();
  const { logout } = useContext(AuthContext);
  const user = useSelector(state => state.user.user);
  const { chirps, isLoading, error } = useSelector(state => state.chirps);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const LogoutIcon = getIcon('LogOut');

  // Fetch chirps when component mounts
  useEffect(() => {    
    const loadChirps = async () => {
      try {
        const chirpsData = await chirpService.fetchChirps({ limit: 10 });
        dispatch(fetchChirpsAction(chirpsData));
      } catch (error) {
        console.error("Error loading chirps:", error);
        // We could show a toast here if needed
      }
    };
    
    loadChirps();
  }, [dispatch]);

  // Handle loading more chirps
  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    
    try {
      const moreChirps = await chirpService.fetchChirps({
        limit: 10,
        offset: chirps.length
      });
      
      if (moreChirps && moreChirps.length > 0) {
        dispatch(fetchChirpsAction([...chirps, ...moreChirps]));
      } else {
        toast.info("No more chirps to load");
      }
    } catch (error) {
      console.error("Error loading more chirps:", error);
      toast.error("Failed to load more chirps");
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button 
          onClick={logout}
          className="btn-outline flex items-center gap-2"
        >
          <LogoutIcon size={18} />
          <span>Logout</span>
        </button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Recent Chirps</h2>
            <ChirpList chirps={chirps} isLoading={isLoading} error={error} />
            
            {chirps.length > 0 && (
              <div className="mt-4 text-center">
                <button 
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="btn-outline"
                >
                  {isLoadingMore ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="card sticky top-4">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={user?.picture || "https://via.placeholder.com/50"} 
                alt="Profile" 
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{user?.firstName} {user?.lastName}</h3>
                <p className="text-sm text-surface-500">{user?.emailAddress}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Link to="/" className="block p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded">
                Home
              </Link>
              <Link to="/profile" className="block p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded">
                Profile
              </Link>
              <Link to="/saved" className="block p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded">
                Saved Items
              </Link>
              <Link to="/settings" className="block p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded">
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
