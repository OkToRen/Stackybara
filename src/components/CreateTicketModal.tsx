'use client';

import { useState } from 'react';
import { X, AlertCircle, FileText, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTickets } from '@/lib/TicketContext';

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTicketModal({
  isOpen,
  onClose,
}: CreateTicketModalProps) {
  const { createTicket } = useTickets();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General',
    priority: 'Medium',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdTicket, setCreatedTicket] = useState<Ticket>();

  const categories = [
    { value: 'Shipping', label: 'Shipping & Delivery', icon: '🚚' },
    { value: 'Product Quality', label: 'Product Quality', icon: '⭐' },
    { value: 'Account', label: 'Account Issues', icon: '👤' },
    { value: 'Payment', label: 'Payment & Billing', icon: '💳' },
    { value: 'Technical', label: 'Technical Support', icon: '🔧' },
    { value: 'Other', label: 'Other', icon: '❓' },
  ];

  const priorities = [
    {
      value: 'Low',
      label: 'Low',
      description: 'General questions, minor issues',
    },
    {
      value: 'Medium',
      label: 'Medium',
      description: 'Standard support requests',
    },
    {
      value: 'High',
      label: 'High',
      description: 'Urgent issues affecting service',
    },
    {
      value: 'Urgent',
      label: 'Urgent',
      description: 'Critical issues requiring immediate attention',
    },
  ];

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const ticket = createTicket(formData);
    setCreatedTicket(ticket);
    setShowSuccess(true);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      category: 'General',
      priority: 'Medium',
    });
    setShowSuccess(false);
    setCreatedTicket(undefined);
    onClose();
  };

  const getPriorityColor = (priority: string | undefined) => {
    switch (priority) {
      case 'Low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-amber-100 via-amber-50 to-teal-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-amber-200">
        <CardHeader className="border-b border-amber-200 bg-gradient-to-r from-amber-50 to-teal-50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-amber-900 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {showSuccess
                ? 'Ticket Created Successfully!'
                : 'Create Support Ticket'}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-amber-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {showSuccess ? (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="h-8 w-8 text-green-600" />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">
                  Ticket Created Successfully!
                </h3>
                <p className="text-amber-700 mb-4">
                  Your support ticket has been created and our team will respond
                  within 24 hours.
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-amber-900">
                      Ticket ID:
                    </span>
                    <Badge className="bg-teal-500 text-white font-mono">
                      {createdTicket?.id}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-amber-900">Title:</span>
                    <span className="text-amber-800">
                      {createdTicket?.title}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-amber-900">
                      Priority:
                    </span>
                    <Badge
                      className={getPriorityColor(createdTicket?.priority)}
                      variant="outline"
                    >
                      {createdTicket?.priority}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    What happens next?
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Our support team will review your ticket</li>
                    <li>• You'll receive email updates on progress</li>
                    <li>• You can track status in your Support Center</li>
                    <li>• Average response time: 2-4 hours</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleClose}
                    className="flex-1 bg-teal-500 hover:bg-teal-600 text-white rounded-full"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setShowSuccess(false);
                      setCreatedTicket(undefined);
                      setFormData({
                        title: '',
                        description: '',
                        category: 'General',
                        priority: 'Medium',
                      });
                    }}
                    variant="outline"
                    className="border-amber-300 text-amber-800 hover:bg-amber-100 rounded-full bg-transparent"
                  >
                    Create Another
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Ticket Title *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Brief description of your issue"
                  className="border-amber-300 focus:border-teal-400"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-3">
                  Category *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <label
                      key={category.value}
                      className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.category === category.value
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-amber-200 hover:border-amber-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={formData.category === category.value}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="sr-only"
                      />
                      <span className="text-lg mr-3">{category.icon}</span>
                      <span className="font-medium text-amber-900">
                        {category.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-3">
                  Priority *
                </label>
                <div className="space-y-2">
                  {priorities.map((priority) => (
                    <label
                      key={priority.value}
                      className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.priority === priority.value
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-amber-200 hover:border-amber-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="priority"
                        value={priority.value}
                        checked={formData.priority === priority.value}
                        onChange={(e) =>
                          setFormData({ ...formData, priority: e.target.value })
                        }
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge
                            className={getPriorityColor(priority.value)}
                            variant="outline"
                          >
                            {priority.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-amber-700 mt-1">
                          {priority.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Please provide detailed information about your issue..."
                  rows={5}
                  className="w-full px-3 py-2 border border-amber-300 rounded-md focus:border-teal-400 focus:ring-teal-400 focus:outline-none resize-none"
                  required
                />
                <p className="text-xs text-amber-600 mt-1">
                  Include order numbers, error messages, or any relevant details
                </p>
              </div>

              {/* Contact Info Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-1">
                      Contact Information
                    </h4>
                    <p className="text-sm text-amber-700 mb-2">
                      We'll use your account email for updates. For urgent
                      issues, you can also reach us:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 text-sm">
                      <div className="flex items-center gap-1 text-amber-800">
                        <Mail className="h-3 w-3" />
                        <span>support@stackybara.com</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-800">
                        <Phone className="h-3 w-3" />
                        <span>+1 (555) 123-4567</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 border-amber-300 text-amber-800 hover:bg-amber-100 rounded-full bg-transparent"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-full"
                  disabled={
                    isSubmitting || !formData.title || !formData.description
                  }
                >
                  {isSubmitting ? 'Creating...' : 'Create Ticket'}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
