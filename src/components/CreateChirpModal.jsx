import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { chirpService } from '../services/chirpService';
import getIcon from '../utils/iconUtils';

const CreateChirpModal = ({ isOpen, onClose, onAddChirp }) => {
  const [chirpText, setChirpText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedTab, setSelectedTab] = useState('text');
  const [previewImage, setPreviewImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const modalRef = useRef(null);
  
  const MAX_CHARS = 280;
  const remainingChars = MAX_CHARS - chirpText.length;
  const isDisabled = chirpText.length === 0 || chirpText.length > MAX_CHARS || isLoading;
  
  const emojis = ["😀", "😂", "🥰", "👍", "🔥", "💯", "🎉", "✨", "🚀", "🌟", "🎯", "🏆", "💪", "👏", "🙌", "🤔"];
  
  // Icon components
  const ImageIcon = getIcon('Image');
  const SmileIcon = getIcon('Smile');
  const CalendarIcon = getIcon('Calendar');
  const MapPinIcon = getIcon('MapPin');
  const BarChartIcon = getIcon('BarChart2');
  const XIcon = getIcon('X');
  const LoaderIcon = getIcon('Loader2');
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showEmojiPicker && emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showEmojiPicker, isOpen, onClose]);
  
  const handleTextChange = (e) => {
    setChirpText(e.target.value);
  };
  
  const handleSubmit = async () => {
    if (isDisabled) return;
    
    // Validate text content
    if (!chirpText || chirpText.trim() === '') {
      toast.error("Please enter some text for your chirp");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Prepare chirp data
      const user = JSON.parse(localStorage.getItem('user'));
      
      // Ensure we have proper user information
      const username = user?.username || user?.emailAddress?.split('@')[0] || "user";
      const displayName = user?.firstName && user?.lastName 
                        ? `${user.firstName} ${user.lastName}` 
                        : user?.displayName || "User";
      
      // Format the chirp data according to the database schema
      const chirpData = {
        Name: `Chirp from ${displayName} - ${new Date().toISOString()}`,
        Tags: "",
        content: chirpText.trim(), // This is the most important field - user's input
        image: previewImage || "",
        username: username,
        display_name: displayName,
        avatar: user?.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        verified: false,
        likes: 0,
        rechirps: 0,
        replies: 0,
        views: "0",
        is_liked: false,
        category: "technology"
      };
      
      // Log before creating to verify data is correct
      console.log("About to create chirp with content:", chirpData.content);
      
      // Create chirp in database
      const newChirp = await chirpService.createChirp(chirpData);
      
      // Verify the returned chirp has the content we expected
      console.log("Created chirp:", newChirp);
      
      if (newChirp && newChirp.content) {
        // Use the actual returned chirp data from the database to ensure consistency
        onAddChirp(newChirp);
        // Also add the chirp to the local state if needed
        console.log("Successfully added chirp with content:", newChirp.content);
        
        toast.success("Your chirp has been posted!");
        setChirpText("");
        setPreviewImage(null);
        setLocation(null);
        onClose();
      } else {
        throw new Error("Chirp created but content is missing in response");
      }
      
    } catch (error) {
      console.error("Error creating chirp:", error);
      console.error("Failed chirp content:", chirpText);
      toast.error("Failed to create chirp: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddEmoji = (emoji) => {
    setChirpText(prevText => prevText + emoji);
    setShowEmojiPicker(false);
    textareaRef.current.focus();
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.match('image.*')) {
      toast.error("Please select an image file");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
    
    // Reset the input value so the same file can be selected again
    e.target.value = '';
  };
  
  const removePreviewImage = () => {
    setPreviewImage(null);
  };
  
  const handleLocationClick = () => {
    if (location) {
      // If we already have a location, remove it
      setLocation(null);
      return;
    }
    
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success - we have the location
          const locationData = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
            display: "Current Location" // Simplified display for demo
          };
          setLocation(locationData);
          setLoadingLocation(false);
          toast.success("Location added to your chirp");
        },
        (error) => {
          setLoadingLocation(false);
          toast.error("Unable to access your location: " + error.message);
        }
      );
    } else {
      setLoadingLocation(false);
      toast.error("Geolocation is not supported by your browser");
    }
  };
  
  const handleTabChange = (tab) => {
    if (tab === 'image') {
      fileInputRef.current.click();
    } else {
      setSelectedTab(tab);
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          ></motion.div>
          
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative w-full max-w-xl bg-surface-50 dark:bg-surface-900 rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors"
                aria-label="Close modal"
              >
                <XIcon className="w-5 h-5" />
              </button>
              <div className="font-bold text-lg">Create a chirp</div>
              <div className="w-9"></div> {/* Empty div for flex spacing */}
            </div>
            
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
              <div className="p-4">
                <div className="flex">
                  <div className="mr-3">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                      alt="Your profile" 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    {/* Tabs for different post types */}
                    <div className="flex mb-2 border-b border-surface-200 dark:border-surface-700">
                      <button 
                        onClick={() => handleTabChange('text')}
                        className={`px-4 py-2 font-medium text-sm relative ${selectedTab === 'text' ? 'text-primary' : 'text-surface-500'}`}
                      >
                        Text
                        {selectedTab === 'text' && (
                          <motion.div 
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          ></motion.div>
                        )}
                      </button>
                      <button 
                        onClick={() => handleTabChange('image')}
                        className={`px-4 py-2 font-medium text-sm relative ${selectedTab === 'image' ? 'text-primary' : 'text-surface-500'}`}
                      >
                        Media
                        {selectedTab === 'image' && (
                          <motion.div 
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          ></motion.div>
                        )}
                      </button>
                      <button 
                        onClick={() => handleTabChange('poll')}
                        className={`px-4 py-2 font-medium text-sm relative ${selectedTab === 'poll' ? 'text-primary' : 'text-surface-500'}`}
                      >
                        Poll
                        {selectedTab === 'poll' && (
                          <motion.div 
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          ></motion.div>
                        )}
                      </button>
                    </div>
                    
                    {/* Hidden file input for image uploads */}
                    <input 
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="hidden"
                      accept="image/*"
                    />
                    
                    {/* Location display */}
                    {location && (
                      <div className="mb-3 text-sm flex items-center text-primary bg-primary/10 p-2 rounded-full">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        <span>{location.display}</span>
                        <button onClick={() => setLocation(null)} className="ml-2"><XIcon className="w-4 h-4" /></button>
                      </div>
                    )}
                    
                    <textarea
                      ref={textareaRef}
                      placeholder="What's happening?"
                      value={chirpText}
                      onChange={handleTextChange}
                      className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 resize-none text-lg placeholder-surface-500 min-h-[120px]"
                      maxLength={MAX_CHARS + 10}
                    ></textarea>
                    
                    {previewImage && (
                      <div className="relative mt-2 mb-3 rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-700">
                        <img 
                          src={previewImage} 
                          alt="Preview" 
                          className="w-full h-auto max-h-80 object-contain bg-surface-100 dark:bg-surface-800"
                        />
                        <button 
                          onClick={removePreviewImage}
                          className="absolute top-2 right-2 p-1.5 bg-surface-900/70 text-white rounded-full hover:bg-surface-900"
                        >
                          <XIcon className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-surface-200 dark:border-surface-700 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => fileInputRef.current.click()}
                    className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors text-primary"
                    aria-label="Add image"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  
                  <button 
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors text-primary"
                    aria-label="Add emoji"
                  >
                    <SmileIcon className="w-5 h-5" />
                  </button>
                  
                  <button 
                    className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors text-primary"
                    aria-label="Schedule post"
                  >
                    <CalendarIcon className="w-5 h-5" />
                  </button>
                  
                  <button 
                    onClick={handleLocationClick}
                    className={`p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors ${location ? 'text-primary bg-primary/10' : 'text-primary'}`}
                    aria-label={location ? "Remove location" : "Add location"}
                  >
                    {loadingLocation ? 
                      <LoaderIcon className="w-5 h-5 animate-spin" /> : 
                      <MapPinIcon className="w-5 h-5" />}
                  </button>
                </div>
                
                <button
                  onClick={handleSubmit}
                  disabled={isDisabled}
                  className={`btn-primary py-2 px-6 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : "Chirp"}
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Emoji picker, will show when emoji button is clicked */}
          {showEmojiPicker && (
            <div ref={emojiPickerRef} className="absolute bottom-20 left-8 bg-surface-50 dark:bg-surface-800 p-2 rounded-xl shadow-lg border border-surface-200 dark:border-surface-700 z-50">
              <div className="grid grid-cols-8 gap-1">
                {emojis.map((emoji, index) => (
                  <button key={index} onClick={() => handleAddEmoji(emoji)} className="p-2 hover:bg-surface-200 dark:hover:bg-surface-700 rounded">{emoji}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
};
export default CreateChirpModal;