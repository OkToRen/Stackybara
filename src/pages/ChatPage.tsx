import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MessageCircle,
  Send,
  ArrowLeft,
  Store,
  User,
  MoreVertical,
  Search,
  Phone,
  Video,
  Clock,
  CheckCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const mockConversations = [
  {
    id: '1',
    type: 'seller'as const,
    name: 'Tech Store Pro',
    avatar: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop',
    lastMessage: 'Your order has been shipped!',
    timestamp: '2 min ago',
    unreadCount: 2,
    isOnline: true,
    orderId: 'ORD-2024-001',
  },
  {
    id: '2',
    type: 'buyer'as const,
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    lastMessage: 'Is this item still available?',
    timestamp: '1 hour ago',
    unreadCount: 0,
    isOnline: false,
    orderId: 'ORD-2024-015',
  },
  {
    id: '3',
    type: 'seller'as const,
    name: 'Fashion Hub',
    avatar: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
    lastMessage: 'Thank you for your purchase!',
    timestamp: '3 hours ago',
    unreadCount: 0,
    isOnline: true,
    orderId: 'ORD-2024-008',
  },
];

const mockMessages = [
  {
    id: '1',
    senderId: 'seller-1',
    senderName: 'Tech Store Pro',
    message: 'Hello! Thank you for your order. How can I help you today?',
    timestamp: '10:30 AM',
    isSender: false,
    status: 'delivered' as const,
  },
  {
    id: '2',
    senderId: 'user-1',
    senderName: 'You',
    message: 'Hi! I wanted to ask about the delivery time for my wireless headphones.',
    timestamp: '10:32 AM',
    isSender: true,
    status: 'delivered' as const,
  },
  {
    id: '3',
    senderId: 'seller-1',
    senderName: 'Tech Store Pro',
    message: 'Your order will be shipped within 24 hours and should arrive in 3-5 business days.',
    timestamp: '10:35 AM',
    isSender: false,
    status: 'delivered' as const,
  },
  {
    id: '4',
    senderId: 'user-1',
    senderName: 'You',
    message: 'Perfect! Also, do you have the black color variant available?',
    timestamp: '10:37 AM',
    isSender: true,
    status: 'delivered' as const,
  },
  {
    id: '5',
    senderId: 'seller-1',
    senderName: 'Tech Store Pro',
    message: 'Yes, we have black color in stock. Would you like to add another pair to your order?',
    timestamp: '10:40 AM',
    isSender: false,
    status: 'delivered' as const,
  },
  {
    id: '6',
    senderId: 'seller-1',
    senderName: 'Tech Store Pro',
    message: 'Your order has been shipped! Tracking number: TRK123456789',
    timestamp: '2 min ago',
    isSender: false,
    status: 'delivered' as const,
  },
];

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  isSender: boolean;
  status: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: string;
  type: 'seller' | 'buyer';
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  orderId?: string;
}

export default function ChatPage() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [selectedChat, setSelectedChat] = useState<string | null>(chatId || null);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentConversation = conversations.find(conv => conv.id === selectedChat);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (chatId && !selectedChat) {
      setSelectedChat(chatId);
    }
  }, [chatId, selectedChat]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'user-1',
      senderName: 'You',
      message: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSender: true,
      status: 'sent',
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Update conversation last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedChat 
          ? { ...conv, lastMessage: newMessage.trim(), timestamp: 'now' }
          : conv
      )
    );

    // TODO: Call backend to send message
    // await backend.sendMessage(receiverPrincipal, newMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewProfile = () => {
    if (currentConversation?.type === 'seller') {
    //   navigate(`/store/${currentConversation.id}`);
    } else {
      // Navigate to buyer profile if applicable
    //   navigate(`/profile/${currentConversation?.id}`);
    }
  };

  const handleViewOrder = () => {
    if (currentConversation?.orderId) {
    //   navigate(`/order/${currentConversation.orderId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
          {/* Conversations Sidebar */}
          <div className={`lg:col-span-1 ${selectedChat ? 'hidden lg:block' : 'block'}`}>
            <Card className="h-full border-amber-200 flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-amber-900 flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2 text-teal-500" />
                    Chats
                  </h2>
                  <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                    {conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)} unread
                  </Badge>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-400" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-amber-300 focus:border-teal-400"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-0">
                {filteredConversations.length === 0 ? (
                  <div className="p-6 text-center">
                    <MessageCircle className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                    <p className="text-amber-700 mb-4">No conversations yet</p>
                    <Button
                      onClick={() => navigate('/products')}
                      className="bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      Browse Products
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => setSelectedChat(conversation.id)}
                        className={`p-4 cursor-pointer transition-colors hover:bg-amber-50 border-b border-amber-100 ${
                          selectedChat === conversation.id ? 'bg-teal-50 border-l-4 border-l-teal-500' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={conversation.avatar} alt={conversation.name} />
                              <AvatarFallback>
                                {conversation.type === 'seller' ? (
                                  <Store className="h-6 w-6 text-teal-500" />
                                ) : (
                                  <User className="h-6 w-6 text-amber-500" />
                                )}
                              </AvatarFallback>
                            </Avatar>
                            {conversation.isOnline && (
                              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-amber-900 truncate">
                                {conversation.name}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-amber-600">
                                  {conversation.timestamp}
                                </span>
                                {conversation.unreadCount > 0 && (
                                  <Badge className="bg-teal-500 text-white text-xs px-2 py-1">
                                    {conversation.unreadCount}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-amber-700 truncate mt-1">
                              {conversation.lastMessage}
                            </p>
                            {conversation.orderId && (
                              <p className="text-xs text-teal-600 mt-1">
                                Order: {conversation.orderId}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Chat Window */}
          <div className={`lg:col-span-3 ${selectedChat ? 'block' : 'hidden lg:block'}`}>
            {selectedChat && currentConversation ? (
              <Card className="h-full border-amber-200 flex flex-col">
                {/* Chat Header */}
                <CardHeader className="border-b border-amber-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedChat(null)}
                        className="lg:hidden text-amber-700"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={currentConversation.avatar} alt={currentConversation.name} />
                          <AvatarFallback>
                            {currentConversation.type === 'seller' ? (
                              <Store className="h-5 w-5 text-teal-500" />
                            ) : (
                              <User className="h-5 w-5 text-amber-500" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                        {currentConversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-amber-900">
                          {currentConversation.name}
                        </h3>
                        <p className="text-xs text-amber-600">
                          {currentConversation.isOnline ? 'Online' : 'Last seen recently'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {currentConversation.orderId && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleViewOrder}
                          className="border-amber-300 text-amber-800 hover:bg-amber-100"
                        >
                          View Order
                        </Button>
                      )}
                      <div className="flex items-center space-x-2">
                        {currentConversation.orderId && (
                            <Button
                            variant="outline"
                            size="sm"
                            onClick={handleViewOrder}
                            className="border-amber-300 text-amber-800 hover:bg-amber-100"
                            >
                            View Order
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleViewProfile}
                            className="border-amber-300 text-amber-800 hover:bg-amber-100"
                        >
                            {currentConversation.type === 'seller' ? (
                            <>
                                <Store className="h-4 w-4 mr-2" />
                                View Store
                            </>
                            ) : (
                            <>
                                <User className="h-4 w-4 mr-2" />
                                View Profile
                            </>
                            )}
                        </Button>
                        </div>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSender ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isSender
                            ? 'bg-teal-500 text-white'
                            : 'bg-white border border-amber-200 text-amber-900'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <div className={`flex items-center justify-between mt-1 ${
                          message.isSender ? 'text-teal-100' : 'text-amber-600'
                        }`}>
                          <span className="text-xs">{message.timestamp}</span>
                          {message.isSender && (
                            <CheckCheck className={`h-3 w-3 ml-2 ${
                              message.status === 'delivered' ? 'text-teal-200' : 'text-teal-300'
                            }`} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Message Input */}
                <div className="border-t border-amber-200 p-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 border-amber-300 focus:border-teal-400"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-full border-amber-200 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-amber-700 mb-6">
                    Choose a conversation from the sidebar to start chatting
                  </p>
                  <Button
                    onClick={() => navigate('/products')}
                    className="bg-teal-500 hover:bg-teal-600 text-white"
                  >
                    Browse Products to Start Shopping
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}