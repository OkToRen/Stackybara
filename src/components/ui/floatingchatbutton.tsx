import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatbotModal from '@/components/ChatModal';

export default function FloatingChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);

  useEffect(() => {
    // Show the floating button after a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Remove notification after first interaction
    if (isChatOpen) {
      setHasNotification(false);
    }
  }, [isChatOpen]);

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          {/* Notification Badge */}
          {hasNotification && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce z-10">
              1
            </div>
          )}

          {/* Pulsing Ring */}
          {hasNotification && (
            <div className="absolute inset-0 w-14 h-14 bg-teal-500 rounded-full animate-ping opacity-20"></div>
          )}

          {/* Main Button */}
          <Button
            onClick={() => setIsChatOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 relative z-10"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>

        {/* Tooltip */}
        {hasNotification && (
          <div className="absolute bottom-16 right-0 bg-white text-gray-800 px-3 py-2 rounded-lg shadow-lg border border-amber-200 whitespace-nowrap animate-pulse">
            <div className="text-sm font-medium">Need help? Chat with us!</div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
          </div>
        )}
      </div>

      {/* Chatbot Modal */}
      <ChatbotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
