import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import { createChirp } from '../store/chirpsSlice';

const MainFeature = ({ onAddChirp }) => {
  const [chirpText, setChirpText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedTab, setSelectedTab] = useState('text');
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  // Redux
  const dispatch = useDispatch();
  const { isLoading: isReduxLoading, error: chirpError } = useSelector(state => state.chirps);
  
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
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);
  
  // Effect to handle errors from Redux
  useEffect(() => {
    if (chirpError) {
      toast.error("Failed to create chirp: " + chirpError);
      // Set local loading state to false if it's still true
      if (isLoading) setIsLoading(false);
    }
  }, [chirpError]);
  
  const handleTextChange = (e) => {
    setChirpText(e.target.value);
  };
  
  const handleSubmit = async () => {
    if (isDisabled) return;
    
    setIsLoading(true);
    
    try {
      // Prepare chirp data
      const user = JSON.parse(localStorage.getItem('user'));
      const chirpData = {
        Name: "New Chirp", // Matching exact field name in the database schema
        content: chirpText.trim(),
        image: previewImage,
        username: user?.username || "user",
        display_name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "User Name",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        likes: 0,
        rechirps: 0,
        replies: 0, 
        views: "0",
        is_liked: false,
        category: "technology"
      };
      
      console.log("Dispatching createChirp with data:", chirpData);
      
      // Use Redux to create the chirp
      const resultAction = await dispatch(createChirp(chirpData));
      
      // Check if the action was fulfilled or rejected
      if (createChirp.fulfilled.match(resultAction)) {
        // Success - get the created chirp from the response
        const newChirp = resultAction.payload;
        
        // Update local state and notify success
        console.log("Chirp created successfully:", newChirp);
        onAddChirp(newChirp);
        toast.success("Your chirp has been posted!");
        
        // Reset form
        setChirpText('');
        setPreviewImage(null);
      } else {
        // Handle errors from the thunk
        const errorMsg = resultAction.payload || "Failed to create chirp";
        toast.error("Failed to create chirp: " + errorMsg);
      }
      
      toast.error("Error creating chirp: " + (error.message || "Unknown error"));
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
    
    setIsUploading(true);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
    
    // Reset the input value so the same file can be selected again
    e.target.value = '';
  };
  
  const removePreviewImage = () => {
    setPreviewImage(null);
  };
  
  const handleTabChange = (tab) => {
    if (tab === 'image') {
      fileInputRef.current.click();
    } else {
      setSelectedTab(tab);
    }
  };
  
  return (
    <div className="p-4 border-b border-surface-200 dark:border-surface-700">
      <div className="flex">
        <div className="mr-3">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
            alt="Your profile" 
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          {/* Tabs for different post types - hidden on mobile */}
          <div className="hidden md:flex mb-2 border-b border-surface-200 dark:border-surface-700">
            <button 
              onClick={() => handleTabChange('text')}
              className={`px-4 py-2 font-medium text-sm relative ${selectedTab === 'text' ? 'text-primary' : 'text-surface-500'}`}
            >
              Text
              {selectedTab === 'text' && (
                <motion.div 
                  layoutId="activeComposeTab"
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
                  layoutId="activeComposeTab"
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
                  layoutId="activeComposeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                ></motion.div>
              )}
            </button>
          </div>
          
          <div className={`${isFocused ? 'border-primary' : 'border-transparent'} transition-colors duration-200`}>
            <textarea
              ref={textareaRef}
              placeholder="What's happening?"
              value={chirpText}
              onChange={handleTextChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 resize-none text-lg placeholder-surface-500 min-h-[80px]"
              maxLength={MAX_CHARS + 10} // Allow typing a bit more but disable submit
            ></textarea>
            
            {/* Image preview */}
            <AnimatePresence>
              {previewImage && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative mt-2 mb-3 rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-700"
                >
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
                </motion.div>
              )}
            </AnimatePresence>
            
            {selectedTab === 'poll' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 mb-4 border border-surface-200 dark:border-surface-700 rounded-xl p-3"
              >
                <div className="text-sm font-medium mb-2 text-surface-600 dark:text-surface-300">Poll options</div>
                <div className="space-y-2">
                  <input 
                    type="text" 
                    placeholder="Option 1" 
                    className="w-full px-3 py-2 bg-surface-100 dark:bg-surface-800 rounded-lg border-none focus:ring-2 focus:ring-primary"
                  />
                  <input 
                    type="text" 
                    placeholder="Option 2" 
                    className="w-full px-3 py-2 bg-surface-100 dark:bg-surface-800 rounded-lg border-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button className="text-primary text-sm mt-2">+ Add option</button>
                
                <div className="mt-3 flex items-center">
                  <span className="text-sm text-surface-600 dark:text-surface-300 mr-2">Poll length:</span>
                  <select className="bg-surface-100 dark:bg-surface-800 rounded-lg border-none text-sm p-1 focus:ring-2 focus:ring-primary">
                    <option>1 day</option>
                    <option>3 days</option>
                    <option>1 week</option>
                    <option>Custom</option>
                  </select>
                </div>
              </motion.div>
            )}

            <div className="relative mt-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              
              <div className="flex items-center justify-between border-t border-surface-200 dark:border-surface-700 pt-3">
                <div className="flex">
                  <button 
                    onClick={() => fileInputRef.current.click()}
                    className="p-2 text-primary rounded-full hover:bg-primary/10 transition-colors"
                    aria-label="Add image"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  
                  <div className="relative">
                    <button 
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-2 text-primary rounded-full hover:bg-primary/10 transition-colors"
                      aria-label="Add emoji"
                    >
                      <SmileIcon className="w-5 h-5" />
                    </button>
                    
                    <AnimatePresence>
                      {showEmojiPicker && (
                        <motion.div
                          ref={emojiPickerRef}
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute bottom-12 left-0 z-10 bg-white dark:bg-surface-800 shadow-lg rounded-xl p-2 w-64 border border-surface-200 dark:border-surface-700"
                        >
                          <div className="grid grid-cols-8 gap-1">
                            {emojis.map(emoji => (
                              <button
                                key={emoji}
                                onClick={() => handleAddEmoji(emoji)}
                                className="w-8 h-8 flex items-center justify-center text-lg hover:bg-surface-100 dark:hover:bg-surface-700 rounded transition-colors"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <button className="p-2 text-primary rounded-full hover:bg-primary/10 transition-colors">
                    <CalendarIcon className="w-5 h-5" />
                  </button>
                  
                  <button className="p-2 text-primary rounded-full hover:bg-primary/10 transition-colors">
                    <MapPinIcon className="w-5 h-5" />
                  </button>
                  
                  <button className="p-2 text-primary rounded-full hover:bg-primary/10 transition-colors md:block hidden">
                    <BarChartIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center">
                  {chirpText.length > 0 && (
                    <div className={`mr-2 text-sm font-medium rounded-full size-[26px] flex items-center justify-center
                      ${remainingChars <= 0 ? 'text-accent' : 
                        remainingChars <= 20 ? 'text-yellow-500' : 
                          'text-surface-500'}`}
                    >
                      {remainingChars}
                    </div>
                  )}
                  
                  <button
                    onClick={handleSubmit}
                    disabled={isDisabled}
                    className={`btn-primary py-1.5 px-4 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <LoaderIcon className="w-5 h-5 animate-spin" aria-label="Loading" />
                    ) : (
                      "Chirp"
                    )}
                  </button>
                </div>
              </div>
              
              {isFocused && (
                <div className="text-sm text-surface-500 mt-3 mx-1">
                  <button className="text-primary hover:underline">
                    Everyone can reply
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainFeature;