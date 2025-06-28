import { useState, useEffect, useRef } from 'react';
import { X, Send, User, Bot, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type TypewriterTextProps = {
  text: string;
  speed?: number;
  onComplete?: () => void;
};

const TypewriterText = ({
  text,
  speed = 30,
  onComplete = () => {},
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;

    setDisplayedText('');
    setIsComplete(false);
    let index = 0;

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        setIsComplete(true);
        onComplete();
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return (
    <span>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
};

type ChatMessageProps = {
  message: string;
  isUser: boolean;
  isTyping?: boolean;
  onTypingComplete?: () => void;
};

const ChatMessage = ({
  message,
  isUser,
  isTyping = false,
  onTypingComplete = () => {},
}: ChatMessageProps) => {
  return (
    <div
      className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}

      <div
        className={`max-w-[80%] p-3 rounded-2xl ${
          isUser
            ? 'bg-teal-500 text-white rounded-br-md'
            : 'bg-white border border-amber-200 text-gray-800 rounded-bl-md shadow-sm'
        }`}
      >
        {isUser ? (
          <p className="text-sm">{message}</p>
        ) : (
          <div className="text-sm">
            {isTyping ? (
              <TypewriterText
                text={message}
                speed={30}
                onComplete={onTypingComplete}
              />
            ) : (
              <p>{message}</p>
            )}
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  );
};

type ChatbotModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ChatbotModal({ isOpen, onClose }: ChatbotModalProps) {
  type Message = {
    id: number;
    text: string;
    isUser: boolean;
    timestamp: Date;
    isTyping?: boolean;
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Stacky, your AI assistant. How can I help you today? 🦫",
      isUser: false,
      timestamp: new Date(),
      isTyping: false,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const predefinedResponses = {
    greeting: [
      'Hello! Welcome to Stackybara! How can I assist you today?',
      "Hi there! I'm here to help with any questions about our decentralized marketplace.",
      'Greetings! What can I help you with on Stackybara today?',
    ],
    shipping: [
      'We offer free shipping on orders over $50! Standard shipping takes 3-5 business days, and express shipping is available for 1-2 days delivery.',
      'Shipping costs depend on your location and order size. We use blockchain-verified logistics for secure delivery tracking.',
    ],
    returns: [
      'We have a 30-day return policy for most items. Returns are processed through our smart contract system for instant refunds.',
      'You can return items within 30 days of purchase. Our decentralized return system ensures quick processing.',
    ],
    blockchain: [
      'Stackybara uses blockchain technology to ensure all transactions are secure, transparent, and immutable. Every purchase is recorded on the blockchain.',
      'Our platform leverages smart contracts for secure payments and automated order processing. Your data is protected by cryptographic security.',
    ],
    payment: [
      'We accept traditional payment methods and cryptocurrency. All payments are secured by blockchain technology.',
      'You can pay with credit cards, PayPal, or various cryptocurrencies. Our smart contracts ensure secure transactions.',
    ],
    account: [
      'You can create an account by clicking the user icon in the top right corner. Account creation is free and gives you access to order tracking and wishlist features.',
      'Your account is secured with blockchain technology. You can manage your profile, orders, and preferences from the account dashboard.',
    ],
    products: [
      'We have thousands of products across electronics, fashion, home goods, and more. All products are verified by our decentralized quality assurance system.',
      'Our marketplace features products from verified sellers worldwide. You can browse by category or use our advanced search filters.',
    ],
    default: [
      "I understand you're asking about that. Let me help you find the right information. Could you be more specific about what you need?",
      "That's a great question! I'm here to help. Can you provide a bit more detail so I can give you the best answer?",
      "I'd be happy to help with that! Could you tell me more about what specifically you're looking for?",
    ],
  };

  const getAIResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();

    if (
      message.includes('hello') ||
      message.includes('hi') ||
      message.includes('hey')
    ) {
      return predefinedResponses.greeting[
        Math.floor(Math.random() * predefinedResponses.greeting.length)
      ];
    }
    if (
      message.includes('ship') ||
      message.includes('delivery') ||
      message.includes('deliver')
    ) {
      return predefinedResponses.shipping[
        Math.floor(Math.random() * predefinedResponses.shipping.length)
      ];
    }
    if (
      message.includes('return') ||
      message.includes('refund') ||
      message.includes('exchange')
    ) {
      return predefinedResponses.returns[
        Math.floor(Math.random() * predefinedResponses.returns.length)
      ];
    }
    if (
      message.includes('blockchain') ||
      message.includes('crypto') ||
      message.includes('secure')
    ) {
      return predefinedResponses.blockchain[
        Math.floor(Math.random() * predefinedResponses.blockchain.length)
      ];
    }
    if (
      message.includes('pay') ||
      message.includes('payment') ||
      message.includes('card')
    ) {
      return predefinedResponses.payment[
        Math.floor(Math.random() * predefinedResponses.payment.length)
      ];
    }
    if (
      message.includes('account') ||
      message.includes('profile') ||
      message.includes('sign up')
    ) {
      return predefinedResponses.account[
        Math.floor(Math.random() * predefinedResponses.account.length)
      ];
    }
    if (
      message.includes('product') ||
      message.includes('item') ||
      message.includes('buy')
    ) {
      return predefinedResponses.products[
        Math.floor(Math.random() * predefinedResponses.products.length)
      ];
    }

    return predefinedResponses.default[
      Math.floor(Math.random() * predefinedResponses.default.length)
    ];
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(
      () => {
        const aiResponse = getAIResponse(inputValue);
        const aiMessage = {
          id: Date.now() + 1,
          text: aiResponse,
          isUser: false,
          timestamp: new Date(),
          isTyping: true,
        };

        setMessages((prev) => [...prev, aiMessage]);
      },
      500 + Math.random() * 1000,
    );
  };

  const handleTypingComplete = () => {
    setIsTyping(false);
    setMessages((prev) =>
      prev.map((msg) => (msg.isTyping ? { ...msg, isTyping: false } : msg)),
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
      <div
        className={`bg-white rounded-2xl shadow-2xl border border-amber-200 pointer-events-auto transition-all duration-300 ${
          isMinimized ? 'w-80 h-16' : 'w-96 h-[600px] max-h-[80vh]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-amber-200 bg-gradient-to-r from-teal-50 to-amber-50 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold text-amber-900">
                Stacky AI Assistant
              </h3>
              <p className="text-xs text-amber-700">
                {isTyping ? 'Typing...' : 'Online • Usually replies instantly'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 text-amber-700 hover:bg-amber-100"
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 text-amber-700 hover:bg-amber-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-amber-25 to-orange-25 max-h-[400px]">
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message.text}
                    isUser={message.isUser}
                    isTyping={message.isTyping}
                    onTypingComplete={handleTypingComplete}
                  />
                ))}
                {isTyping && messages[messages.length - 1]?.isUser && (
                  <div className="flex gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white border border-amber-200 text-gray-800 rounded-2xl rounded-bl-md shadow-sm p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t border-amber-100">
              <div className="flex gap-2 flex-wrap">
                {[
                  'Shipping Info',
                  'Returns',
                  'Track Order',
                  'Payment Help',
                ].map((action) => (
                  <button
                    key={action}
                    onClick={() => setInputValue(action)}
                    className="px-3 py-1 text-xs bg-amber-100 text-amber-800 rounded-full hover:bg-amber-200 transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-amber-200 bg-white rounded-b-2xl">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 border-amber-300 focus:border-teal-400 focus:ring-teal-400 rounded-full"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-4"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by Stackybara AI • Secure & Private
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
