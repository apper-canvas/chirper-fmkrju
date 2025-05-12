import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import getIcon from '../utils/iconUtils';

const ChatPage = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      user: {
        name: "Jane Doe",
        username: "janedoe",
        avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        verified: true,
        isOnline: true
      },
      lastMessage: {
        content: "Hey, how's your new project going?",
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        isRead: true,
        sentByMe: false
      },
      unreadCount: 0
    },
    {
      id: 2,
      user: {
        name: "John Smith",
        username: "johnsmith",
        avatar: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        verified: false,
        isOnline: false
      },
      lastMessage: {
        content: "Thanks for the feedback on my design!",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        sentByMe: true
      },
      unreadCount: 0
    },
    {
      id: 3,
      user: {
        name: "Tech News",
        username: "technews",
        avatar: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        verified: true,
        isOnline: true
      },
      lastMessage: {
        content: "Have you seen the latest announcement about React 19?",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        sentByMe: false
      },
      unreadCount: 3
    },
    {
      id: 4,
      user: {
        name: "Sarah Johnson",
        username: "sarahj",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        verified: false,
        isOnline: true
      },
      lastMessage: {
        content: "Let's meet for coffee this weekend!",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        sentByMe: false
      },
      unreadCount: 0
    }
  ]);

  const [activeConversation, setActiveConversation] = useState(1);
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hey there! How's it going?",
      timestamp: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
      sentByMe: true
    },
    {
      id: 2,
      content: "Hi! I'm doing great, thanks for asking. How about you?",
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      sentByMe: false
    },
    {
      id: 3,
      content: "I'm good too. Just working on this new project.",
      timestamp: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
      sentByMe: true
    },
    {
      id: 4,
      content: "That sounds exciting! What's the project about?",
      timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
      sentByMe: false
    },
    {
      id: 5,
      content: "It's a social media app with some cool new features.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      sentByMe: true
    },
    {
      id: 6,
      content: "Hey, how's your new project going?",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      sentByMe: false
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Icons
  const HomeIcon = getIcon('Home');
  const SearchIcon = getIcon('Search');
  const BellIcon = getIcon('Bell');
  const MessageCircleIcon = getIcon('MessageCircle');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const MoreVerticalIcon = getIcon('MoreVertical');
  const SmileIcon = getIcon('Smile');
  const ImageIcon = getIcon('Image');
  const MicIcon = getIcon('Mic');
  const SendIcon = getIcon('Send');
  const InfoIcon = getIcon('Info');
  const PinIcon = getIcon('Pin');
  const BellOffIcon = getIcon('BellOff');
  const UserPlusIcon = getIcon('UserPlus');
  const PaperclipIcon = getIcon('Paperclip');
  const VerifiedIcon = getIcon('BadgeCheck');

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: Date.now(),
      content: newMessage,
      timestamp: new Date().toISOString(),
      sentByMe: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');

    // Update last message in conversation
    setConversations(conversations.map(conv => 
      conv.id === activeConversation 
        ? { 
            ...conv, 
            lastMessage: { 
              content: newMessage,
              timestamp: new Date().toISOString(),
              isRead: true,
              sentByMe: true
            } 
          } 
        : conv
    ));
  };

  const formatMessageTime = (timestamp) => {
    return format(new Date(timestamp), 'h:mm a');
  };

  const formatConversationTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return format(date, 'h:mm a');
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return format(date, 'EEEE');
    } else {
      return format(date, 'MM/dd/yyyy');
    }
  };

  const handleSelectConversation = (id) => {
    setActiveConversation(id);
    
    // Mark messages as read
    setConversations(conversations.map(conv => 
      conv.id === id 
        ? { ...conv, unreadCount: 0 } 
        : conv
    ));
  };

  const activeUser = conversations.find(conv => conv.id === activeConversation)?.user;

  return (
    <div className="flex min-h-screen bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-50">
      {/* Main Container */}
      <div className="flex w-full max-w-6xl mx-auto">
        {/* Sidebar - Conversations */}
        <div className="w-full sm:w-80 md:w-96 border-r border-surface-200 dark:border-surface-700">
          <div className="p-4 border-b border-surface-200 dark:border-surface-700 sticky top-0 bg-surface-50 dark:bg-surface-900 z-10">
            <h1 className="text-xl font-bold">Messages</h1>
            <div className="mt-4 relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
              <input 
                type="text" 
                placeholder="Search for people and groups" 
                className="input-field pl-10 bg-surface-100 dark:bg-surface-800 border-none focus:bg-white dark:focus:bg-surface-700"
              />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-117px)]">
            {conversations.map(conversation => (
              <div 
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation.id)}
                className={`flex items-center p-4 cursor-pointer border-b border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors ${activeConversation === conversation.id ? 'bg-surface-100 dark:bg-surface-800' : ''}`}
              >
                <div className="relative">
                  <img 
                    src={conversation.user.avatar} 
                    alt={conversation.user.name} 
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  {conversation.user.isOnline && (
                    <span className="absolute bottom-0 right-2 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-surface-800 rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <h3 className="font-semibold truncate">{conversation.user.name}</h3>
                      {conversation.user.verified && (
                        <VerifiedIcon className="w-4 h-4 text-primary ml-1 flex-shrink-0" />
                      )}
                    </div>
                    <span className="text-xs text-surface-500">{formatConversationTime(conversation.lastMessage.timestamp)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-surface-500 truncate">
                      {conversation.lastMessage.sentByMe ? 'You: ' : ''}{conversation.lastMessage.content}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <span className="ml-2 bg-primary text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="hidden sm:flex flex-col flex-1 bg-white dark:bg-surface-800 relative">
          {activeUser ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex items-center sticky top-0 bg-white dark:bg-surface-800 z-10">
                <Link to="/" className="md:hidden p-2 mr-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700">
                  <ArrowLeftIcon className="w-5 h-5" />
                </Link>
                <img 
                  src={activeUser.avatar} 
                  alt={activeUser.name} 
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <h2 className="font-bold">{activeUser.name}</h2>
                    {activeUser.verified && (
                      <VerifiedIcon className="w-4 h-4 text-primary ml-1" />
                    )}
                  </div>
                  <p className="text-sm text-surface-500">
                    {activeUser.isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700">
                    <InfoIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700">
                    <MoreVerticalIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: 'calc(100vh - 132px)' }}>
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sentByMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[75%] ${message.sentByMe ? 'bg-primary text-white' : 'bg-surface-100 dark:bg-surface-700'} rounded-2xl p-3 px-4`}>
                      <p className="text-[15px]">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.sentByMe ? 'text-primary-light' : 'text-surface-500'}`}>
                        {formatMessageTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-surface-200 dark:border-surface-700 sticky bottom-0 bg-white dark:bg-surface-800">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <button type="button" className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700">
                    <PaperclipIcon className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                    className="flex-1 input-field bg-surface-100 dark:bg-surface-700 border-none"
                  />
                  <button type="button" className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700">
                    <SmileIcon className="w-5 h-5" />
                  </button>
                  <button type="button" className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700">
                    <MicIcon className="w-5 h-5" />
                  </button>
                  <button 
                    type="submit" 
                    disabled={!newMessage.trim()}
                    className={`p-2 rounded-full ${newMessage.trim() ? 'bg-primary text-white' : 'bg-surface-200 dark:bg-surface-700 text-surface-500'}`}
                  >
                    <SendIcon className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-6">
                <MessageCircleIcon className="w-16 h-16 mx-auto text-surface-300 dark:text-surface-600" />
                <h2 className="text-xl font-bold mt-4">Your Messages</h2>
                <p className="mt-2 text-surface-500 max-w-sm">
                  Select a conversation to start chatting or start a new conversation.
                </p>
                <button className="mt-6 btn-primary">
                  New Message
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Empty State */}
        <div className="sm:hidden flex flex-col items-center justify-center h-screen w-full p-6 text-center">
          <MessageCircleIcon className="w-16 h-16 text-surface-300 dark:text-surface-600" />
          <h2 className="text-xl font-bold mt-4">Your Messages</h2>
          <p className="mt-2 text-surface-500">
            Send private messages to a friend or group
          </p>
          <button className="mt-6 btn-primary">
            New Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;