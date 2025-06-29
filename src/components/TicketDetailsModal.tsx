import React, { useState, useMemo } from 'react';
import {
  X,
  Send,
  User,
  Bot,
  Clock,
  AlertCircle,
  CheckCircle,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTickets } from '@/lib/TicketContext';

type TicketDetailsModalProps = {
  ticket: Ticket;
  isOpen: boolean;
  onClose: () => void;
};

export default function TicketDetailsModal({
  ticket,
  isOpen,
  onClose,
}: TicketDetailsModalProps) {
  const { addMessage, getTicketById } = useTickets();
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Get the current ticket from context to ensure we have the latest data
  const currentTicket = useMemo(() => {
    return getTicketById(ticket.id) || ticket;
  }, [getTicketById, ticket.id, ticket]);

  if (!isOpen || !currentTicket) return null;

  const handleSendMessage = async (e: React.FormEvent) => {
    console.log(newMessage);
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);

    addMessage(currentTicket.id, newMessage);
    setNewMessage('');
    setIsSending(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'Resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low':
        return 'bg-gray-100 text-gray-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-amber-100 via-amber-50 to-teal-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden border-amber-200">
        <CardHeader className="border-b border-amber-200 bg-gradient-to-r from-amber-50 to-teal-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-amber-700" />
              <div>
                <CardTitle className="text-amber-900">
                  {currentTicket.title}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-sm text-teal-600 font-semibold">
                    {currentTicket.id}
                  </span>
                  <Badge
                    className={getStatusColor(currentTicket.status)}
                    variant="outline"
                  >
                    {getStatusIcon(currentTicket.status)}
                    <span className="ml-1">{currentTicket.status}</span>
                  </Badge>
                  <Badge className={getPriorityColor(currentTicket.priority)}>
                    {currentTicket.priority}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-amber-300 text-amber-700"
                  >
                    {currentTicket.category}
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-amber-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <div className="flex flex-col lg:flex-row h-[calc(90vh-120px)]">
          {/* Ticket Info Sidebar */}
          <div className="lg:w-80 border-r border-amber-200 bg-amber-25 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Ticket Details */}
              <div>
                <h3 className="font-semibold text-amber-900 mb-3">
                  Ticket Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-amber-700">Created:</span>
                    <span className="text-amber-900 font-medium">
                      {formatDate(currentTicket.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700">Last Updated:</span>
                    <span className="text-amber-900 font-medium">
                      {formatDate(currentTicket.updatedAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700">Assigned To:</span>
                    <span className="text-amber-900 font-medium">
                      {currentTicket.assignedTo || 'Unassigned'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700">Messages:</span>
                    <span className="text-amber-900 font-medium">
                      {currentTicket.messages.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Original Description */}
              <div>
                <h3 className="font-semibold text-amber-900 mb-3">
                  Original Description
                </h3>
                <div className="bg-white border border-amber-200 rounded-lg p-3">
                  <p className="text-sm text-amber-800 leading-relaxed">
                    {currentTicket.description}
                  </p>
                </div>
              </div>

              {/* Resolution */}
              {currentTicket.resolution && (
                <div>
                  <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Resolution
                  </h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800 leading-relaxed">
                      {currentTicket.resolution}
                    </p>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div>
                <h3 className="font-semibold text-amber-900 mb-3">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-amber-300 text-amber-800 hover:bg-amber-100 bg-transparent"
                  >
                    Print Ticket
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-amber-300 text-amber-800 hover:bg-amber-100 bg-transparent"
                  >
                    Email Transcript
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-amber-25 to-orange-25">
              <div className="space-y-4">
                {currentTicket.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.isStaff ? 'justify-start' : 'justify-end'}`}
                  >
                    {message.isStaff && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.isStaff
                          ? 'bg-white border border-amber-200 text-gray-800 rounded-bl-md shadow-sm'
                          : 'bg-teal-500 text-white rounded-br-md'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm">
                          {message.isStaff ? message.sender : 'You'}
                        </span>
                        <span
                          className={`text-xs ${message.isStaff ? 'text-gray-500' : 'text-teal-100'}`}
                        >
                          {formatDate(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">
                        {message.message}
                      </p>
                    </div>

                    {!message.isStaff && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            {currentTicket.status !== 'Resolved' && (
              <div className="p-6 border-t border-amber-200 bg-white">
                <form onSubmit={handleSendMessage} className="flex gap-3">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border-amber-300 focus:border-teal-400"
                    disabled={isSending}
                  />
                  <Button
                    type="submit"
                    disabled={!newMessage.trim() || isSending}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-6 rounded-full"
                  >
                    {isSending ? (
                      <Clock className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
                <p className="text-xs text-amber-600 mt-2">
                  Our support team typically responds within 2-4 hours during
                  business hours.
                </p>
              </div>
            )}

            {currentTicket.status === 'Resolved' && (
              <div className="p-6 border-t border-amber-200 bg-green-50">
                <div className="flex items-center justify-center gap-2 text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">
                    This ticket has been resolved
                  </span>
                </div>
                <p className="text-sm text-green-700 text-center mt-1">
                  If you need further assistance, please create a new ticket.
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
