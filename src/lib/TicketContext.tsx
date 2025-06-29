import { createContext, ReactNode, useContext, useState } from 'react';

type TicketContextType = {
  tickets: Ticket[];
  createTicket: (ticketData: {
    title: string;
    description: string;
    category: string;
    priority: string;
  }) => Ticket;
  addMessage: (ticketId: string, message: any) => void;
  getTicketById: (id: string) => Ticket | undefined;
  getTicketsByStatus: (status: string) => Ticket[];
  getTicketsByPriority: (priority: string) => Ticket[];
};

export const TicketContext = createContext<TicketContextType | undefined>(
  undefined,
);

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'TKT-2024-001',
      title: 'Order not received',
      description:
        "I placed an order 5 days ago but haven't received it yet. The tracking shows it was delivered but I didn't get anything.",
      category: 'Shipping',
      priority: 'High',
      status: 'In Progress',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-16T14:20:00Z',
      assignedTo: 'Sarah Johnson',
      resolution: null,
      messages: [
        {
          id: 1,
          sender: 'You',
          message:
            "I placed an order 5 days ago but haven't received it yet. Order #ORD-2024-001",
          timestamp: '2024-01-15T10:30:00Z',
          isStaff: false,
        },
        {
          id: 2,
          sender: 'Sarah Johnson',
          message:
            "Hi! I'm sorry to hear about this issue. I've checked your order and I can see it was marked as delivered. Let me contact our shipping partner to investigate this further.",
          timestamp: '2024-01-16T14:20:00Z',
          isStaff: true,
        },
      ],
    },
    {
      id: 'TKT-2024-002',
      title: 'Defective product received',
      description:
        "The wireless headphones I received have a crackling sound in the left ear. I'd like to return or exchange them.",
      category: 'Product Quality',
      priority: 'Medium',
      status: 'Resolved',
      createdAt: '2024-01-10T09:15:00Z',
      updatedAt: '2024-01-12T16:45:00Z',
      assignedTo: 'Mike Rodriguez',
      resolution:
        'Product exchanged successfully. New item shipped with expedited delivery. Customer satisfied with resolution.',
      messages: [
        {
          id: 1,
          sender: 'You',
          message:
            'The wireless headphones have a crackling sound in the left ear. This seems like a manufacturing defect.',
          timestamp: '2024-01-10T09:15:00Z',
          isStaff: false,
        },
        {
          id: 2,
          sender: 'Mike Rodriguez',
          message:
            "I apologize for the defective product. We'll arrange an immediate exchange. Please use the prepaid return label I'm sending to your email.",
          timestamp: '2024-01-11T11:30:00Z',
          isStaff: true,
        },
        {
          id: 3,
          sender: 'Mike Rodriguez',
          message:
            'Your replacement has been shipped with expedited delivery. You should receive it tomorrow. Tracking: TRK123456789',
          timestamp: '2024-01-12T16:45:00Z',
          isStaff: true,
        },
      ],
    },
    {
      id: 'TKT-2024-003',
      title: 'Account login issues',
      description:
        "I can't log into my account. It says my password is incorrect but I'm sure it's right.",
      category: 'Account',
      priority: 'Low',
      status: 'Open',
      createdAt: '2024-01-18T15:45:00Z',
      updatedAt: '2024-01-18T15:45:00Z',
      assignedTo: null,
      resolution: null,
      messages: [
        {
          id: 1,
          sender: 'You',
          message:
            "I can't log into my account. It says my password is incorrect but I'm sure it's right. My email is alex.johnson@email.com",
          timestamp: '2024-01-18T15:45:00Z',
          isStaff: false,
        },
      ],
    },
  ]);

  const createTicket = (ticketData: {
    title: string;
    description: string;
    category: string;
    priority: string;
  }) => {
    const newTicket: Ticket = {
      id: `TKT-2024-${String(tickets.length + 1).padStart(3, '0')}`,
      title: ticketData.title,
      description: ticketData.description,
      category: ticketData.category,
      priority: ticketData.priority,
      status: 'Open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignedTo: null,
      resolution: null,
      messages: [
        {
          id: 1,
          sender: 'You',
          message: ticketData.description,
          timestamp: new Date().toISOString(),
          isStaff: false,
        },
      ],
    };
    setTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  };

  const addMessage = (ticketId: string, message: any) => {
    setTickets((prev) =>
      prev.map((ticket) => {
        if (ticket.id === ticketId) {
          const newMessage = {
            id: ticket.messages.length + 1,
            sender: 'You',
            message,
            timestamp: new Date().toISOString(),
            isStaff: false,
          };
          return {
            ...ticket,
            messages: [...ticket.messages, newMessage],
            updatedAt: new Date().toISOString(),
          };
        }
        return ticket;
      }),
    );
  };

  const getTicketById = (id: string) => {
    return tickets.find((ticket) => ticket.id === id);
  };

  const getTicketsByStatus = (status: string) => {
    return tickets.filter((ticket) => ticket.status === status);
  };

  const getTicketsByPriority = (priority: string) => {
    return tickets.filter((ticket) => ticket.priority === priority);
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        createTicket,
        addMessage,
        getTicketById,
        getTicketsByStatus,
        getTicketsByPriority,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
