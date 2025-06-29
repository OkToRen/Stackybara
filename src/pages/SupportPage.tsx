import { useState } from 'react';
import {
  Plus,
  Search,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTickets } from '@/lib/TicketContext';
import CreateTicketModal from '@/components/CreateTicketModal';
import TicketDetailsModal from '@/components/TicketDetailsModal';

export default function SupportPage() {
  const { tickets, getTicketsByStatus } = useTickets();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket>();
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    'All',
    'Shipping',
    'Product Quality',
    'Account',
    'Payment',
    'Technical',
    'Other',
  ];
  const priorities = ['All', 'Low', 'Medium', 'High', 'Urgent'];

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

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || ticket.category === selectedCategory;
    const matchesPriority =
      selectedPriority === 'All' || ticket.priority === selectedPriority;

    if (activeTab === 'all')
      return matchesSearch && matchesCategory && matchesPriority;
    if (activeTab === 'open')
      return (
        matchesSearch &&
        matchesCategory &&
        matchesPriority &&
        ticket.status === 'Open'
      );
    if (activeTab === 'progress')
      return (
        matchesSearch &&
        matchesCategory &&
        matchesPriority &&
        ticket.status === 'In Progress'
      );
    if (activeTab === 'resolved')
      return (
        matchesSearch &&
        matchesCategory &&
        matchesPriority &&
        ticket.status === 'Resolved'
      );

    return matchesSearch && matchesCategory && matchesPriority;
  });

  const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTicketStats = () => {
    return {
      total: tickets.length,
      open: getTicketsByStatus('Open').length,
      inProgress: getTicketsByStatus('In Progress').length,
      resolved: getTicketsByStatus('Resolved').length,
    };
  };

  const stats = getTicketStats();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-amber-900 mb-2">
                Support Center
              </h1>
              <p className="text-amber-700">
                Manage your support tickets and get help with your orders
              </p>
            </div>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-full px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Ticket
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-amber-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-900">
                {stats.total}
              </div>
              <div className="text-sm text-amber-700">Total Tickets</div>
            </CardContent>
          </Card>
          <Card className="border-amber-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {stats.open}
              </div>
              <div className="text-sm text-amber-700">Open</div>
            </CardContent>
          </Card>
          <Card className="border-amber-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.inProgress}
              </div>
              <div className="text-sm text-amber-700">In Progress</div>
            </CardContent>
          </Card>
          <Card className="border-amber-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.resolved}
              </div>
              <div className="text-sm text-amber-700">Resolved</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-amber-200 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 h-4 w-4" />
                <Input
                  placeholder="Search tickets by ID, title, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-amber-300 focus:border-teal-400"
                />
              </div>
              <div className="flex gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-amber-300 rounded-md bg-white focus:border-teal-400 focus:outline-none"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="px-4 py-2 border border-amber-300 rounded-md bg-white focus:border-teal-400 focus:outline-none"
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tickets Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 bg-white border border-amber-200">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
            >
              All Tickets ({stats.total})
            </TabsTrigger>
            <TabsTrigger
              value="open"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
            >
              Open ({stats.open})
            </TabsTrigger>
            <TabsTrigger
              value="progress"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
            >
              In Progress ({stats.inProgress})
            </TabsTrigger>
            <TabsTrigger
              value="resolved"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
            >
              Resolved ({stats.resolved})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredTickets.length === 0 ? (
              <Card className="border-amber-200">
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-16 w-16 text-amber-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">
                    No tickets found
                  </h3>
                  <p className="text-amber-700 mb-6">
                    {searchTerm ||
                    selectedCategory !== 'All' ||
                    selectedPriority !== 'All'
                      ? 'Try adjusting your filters to see more results.'
                      : "You haven't created any support tickets yet."}
                  </p>
                  <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-teal-500 hover:bg-teal-600 text-white rounded-full"
                  >
                    Create Your First Ticket
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredTickets.map((ticket) => (
                  <Card
                    key={ticket.id}
                    className="border-amber-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono text-sm text-teal-600 font-semibold">
                              {ticket.id}
                            </span>
                            <Badge
                              className={getStatusColor(ticket.status)}
                              variant="outline"
                            >
                              {getStatusIcon(ticket.status)}
                              <span className="ml-1">{ticket.status}</span>
                            </Badge>
                            <Badge
                              className={getPriorityColor(ticket.priority)}
                            >
                              {ticket.priority}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-amber-300 text-amber-700"
                            >
                              {ticket.category}
                            </Badge>
                          </div>

                          <h3 className="text-lg font-semibold text-amber-900 mb-2 hover:text-teal-600 transition-colors">
                            {ticket.title}
                          </h3>

                          <p className="text-amber-700 text-sm mb-3 line-clamp-2">
                            {ticket.description}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-amber-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>
                                Created: {formatDate(ticket.createdAt)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>
                                Updated: {formatDate(ticket.updatedAt)}
                              </span>
                            </div>
                            {ticket.assignedTo && (
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>Assigned to: {ticket.assignedTo}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-sm font-medium text-amber-900">
                              {ticket.messages.length} message
                              {ticket.messages.length !== 1 ? 's' : ''}
                            </div>
                            {ticket.resolution && (
                              <div className="text-xs text-green-600 font-medium">
                                ✓ Resolved
                              </div>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-amber-300 text-amber-800 hover:bg-amber-100 bg-transparent"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <CreateTicketModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {selectedTicket && (
        <TicketDetailsModal
          ticket={selectedTicket}
          isOpen={!!selectedTicket}
          onClose={() => setSelectedTicket(undefined)}
        />
      )}
    </div>
  );
}
