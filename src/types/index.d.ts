type UserData = {
  principal: Principal;
  name: string;
  email: string;
  userLocation: string;
  isSeller: boolean;
};

type Ticket = {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  assignedTo: string | null;
  resolution: string | null;
  messages: {
    id: number;
    sender: string;
    message: string;
    timestamp: string;
    isStaff: boolean;
  }[];
};

type Feature = {
  title: string;
  description: string;
  route: string;
  icon: React.ElementType;
  color: string;
  image: string;
  category: string;
  protected?: boolean;
};
