import { Link } from 'react-router-dom';
import {
  Home,
  ShoppingBag,
  ShoppingCart,
  User,
  MessageCircle,
  CreditCard,
  Package,
  BarChart3,
  Settings,
  HeadphonesIcon,
  Store,
  FileText,
  Truck,
  Star,
  Search,
  Grid3X3,
  UserPlus,
  LogIn,
  Info,
  Loader,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FeaturesPage = () => {
  const customerFeatures = [
    {
      title: 'Products Catalog',
      description: 'Browse and search through our extensive product collection',
      route: '/products',
      icon: ShoppingBag,
      color: 'bg-green-500',
      image: '/placeholder.svg?height=200&width=300',
      category: 'Shopping',
    },
    {
      title: 'Shopping Cart',
      description: 'Review and manage items before checkout',
      route: '/cart',
      icon: ShoppingCart,
      color: 'bg-orange-500',
      image: '/placeholder.svg?height=200&width=300',
      category: 'Shopping',
      protected: true,
    },
    {
      title: 'User Profile',
      description: 'Manage your account settings and personal information',
      route: '/profile',
      icon: User,
      color: 'bg-indigo-500',
      image: '/placeholder.svg?height=200&width=300',
      category: 'Account',
      protected: true,
    },
    {
      title: 'Chat Support',
      description: 'Real-time messaging with sellers and support',
      route: '/chat',
      icon: MessageCircle,
      color: 'bg-pink-500',
      image: '/placeholder.svg?height=200&width=300',
      category: 'Communication',
    },
    {
      title: 'Support Center',
      description: 'Submit tickets and track support requests',
      route: '/support',
      icon: HeadphonesIcon,
      color: 'bg-cyan-500',
      image: '/placeholder.svg?height=200&width=300',
      category: 'Support',
      protected: true,
    },
    {
      title: 'About Us',
      description: 'Learn more about Stackybara and our mission',
      route: '/about',
      icon: Info,
      color: 'bg-gray-500',
      image: '/placeholder.svg?height=200&width=300',
      category: 'Information',
    },
  ];

  const sellerFeatures = [
    {
      title: 'Seller Dashboard',
      description: 'Overview of your store performance and analytics',
      route: '/seller',
      icon: BarChart3,
      color: 'bg-emerald-500',
      image: '/placeholder.svg?height=200&width=300',
      category: 'Seller Tools',
    },
    {
      title: 'Product Manager',
      description: 'Add, edit, and manage your product inventory',
      route: '/seller/productmanager',
      icon: Grid3X3,
      color: 'bg-violet-500',
      image: '/placeholder.svg?height=200&width=300',
      category: 'Seller Tools',
    },
    {
      title: 'Order Management',
      description: 'Process and fulfill customer orders',
      route: '/seller/orders',
      icon: Truck,
      color: 'bg-amber-500',
      image: '/placeholder.svg?height=200&width=300',
      category: 'Seller Tools',
    },
    {
      title: 'Store Profile',
      description: 'Customize your store information and branding',
      route: '/seller/profile',
      icon: Store,
      color: 'bg-rose-500',
      image: '/placeholder.svg?height=200&width=300',
      category: 'Seller Tools',
    },
  ];

  const authFeatures = [
    {
      title: 'Post Login Setup',
      description: 'Complete your profile after first login',
      route: '/postlogin',
      icon: UserPlus,
      color: 'bg-lime-500',
      image: '/placeholder.svg?height=200&width=300',
      category: 'Authentication',
    },
    {
      title: 'Become a Seller',
      description: 'Upgrade your account to start selling',
      route: '/postseller',
      icon: Store,
      color: 'bg-sky-500',
      image: '/placeholder.svg?height=200&width=300',
      category: 'Authentication',
    },
  ];

  const FeatureCard = ({ feature }: { feature: Feature }) => {
    const IconComponent = feature.icon;

    return (
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-amber-200 hover:border-teal-300">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className={`p-3 rounded-lg ${feature.color} text-white`}>
              <IconComponent className="h-6 w-6" />
            </div>
            <div className="flex gap-2">
              {feature.protected && (
                <Badge variant="secondary" className="text-xs">
                  Protected
                </Badge>
              )}
              <Badge variant="outline" className="text-xs">
                {feature.category}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
            <img
              src={feature.image || '/placeholder.svg'}
              alt={feature.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <CardTitle className="text-lg text-amber-900 group-hover:text-teal-600 transition-colors">
              {feature.title}
            </CardTitle>
            <CardDescription className="mt-2 text-sm text-gray-600">
              {feature.description}
            </CardDescription>
          </div>
          <Link to={feature.route}>
            <Button className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white">
              Explore Feature
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  };

  interface FeatureSectionProps {
    title: string;
    features: Feature[];
    description: string;
  }

  const FeatureSection = ({
    title,
    features,
    description,
  }: FeatureSectionProps) => (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-amber-900 mb-4">{title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mb-6">
            <Grid3X3 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-amber-900 mb-6">
            Stackybara Features
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover all the powerful features available in your Stackybara
            marketplace. From shopping to selling, we've got everything you need
            for a complete e-commerce experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              {customerFeatures.length} Customer Features
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              {sellerFeatures.length} Seller Tools
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              {authFeatures.length} Account Features
            </Badge>
          </div>
        </div>

        {/* Customer Features */}
        <FeatureSection
          title="Customer Features"
          description="Everything you need for an amazing shopping experience"
          features={customerFeatures}
        />

        {/* Seller Features */}
        <FeatureSection
          title="Seller Tools"
          description="Powerful tools to manage and grow your online business"
          features={sellerFeatures}
        />

        {/* Authentication Features */}
        <FeatureSection
          title="Account Management"
          description="Setup and manage your Stackybara account"
          features={authFeatures}
        />

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of users who are already enjoying the Stackybara
            experience
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-teal-600 hover:bg-gray-100"
              >
                Start Shopping
              </Button>
            </Link>
            <Link to="/postseller">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-teal-600"
              >
                Become a Seller
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeaturesPage;
