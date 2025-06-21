import { Shield, Users, Globe, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Logo from '@/assets/Logo.png';
import DarrenOliverProfilePicture from '@/assets/DarrenOliver.jpeg';
import RoonySoonProfilePicture from '@/assets/RoonySoon.jpg';
import MartinEricksonProfilePicture from '@/assets/MartinErickson.jpg';
import JasonProfilePicture from '@/assets/Jason.png';
import RoderickAureliusProfilePicture from '@/assets/RoderickAurelius.png';

export default function AboutPage() {
  const team = [
    {
      name: 'Darren Oliver Putra Haryanto',
      role: 'CEO & Founder',
      image: DarrenOliverProfilePicture,
      bio: 'Blockchain enthusiast',
    },
    {
      name: 'Roony Soon',
      role: 'CTO',
      image: RoonySoonProfilePicture,
      bio: 'Former Google engineer, blockchain security expert',
    },
    {
      name: 'Jason',
      role: 'Head of Product',
      image: JasonProfilePicture,
      bio: 'UX designer passionate about decentralized commerce',
    },
    {
      name: 'Martin Erickson',
      role: 'Head of Marketing',
      image: MartinEricksonProfilePicture,
      bio: 'Digital marketing strategist and community builder',
    },
    {
      name: 'Roderick Aurelius Tenggono',
      role: 'Head of Marketing',
      image: RoderickAureliusProfilePicture,
      bio: 'Digital marketing strategist and community builder',
    },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description:
        'Every transaction is secured by blockchain technology, ensuring complete transparency and immutability.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description:
        'Our platform is built by the community, for the community. Every voice matters in our ecosystem.',
    },
    {
      icon: Globe,
      title: 'Global Access',
      description:
        'Breaking down barriers to enable seamless commerce across borders and currencies.',
    },
    {
      icon: Heart,
      title: 'Customer Obsessed',
      description:
        'We put our customers at the center of everything we do, ensuring the best possible experience.',
    },
  ];

  const milestones = [
    {
      year: '2021',
      title: 'Company Founded',
      description: 'Started with a vision to revolutionize e-commerce',
    },
    {
      year: '2022',
      title: 'Blockchain Integration',
      description: 'Successfully integrated blockchain technology',
    },
    {
      year: '2023',
      title: '10K+ Users',
      description: 'Reached our first major user milestone',
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'Launched in 15+ countries worldwide',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-teal-100 text-teal-800 px-4 py-2 text-sm font-medium mb-6">
              🌟 About Shoppybara
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-6">
              Revolutionizing E-commerce with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                Blockchain
              </span>
            </h1>
            <p className="text-xl text-amber-800 leading-relaxed mb-8">
              We're building the future of decentralized commerce, where every
              transaction is transparent, secure, and puts the power back in the
              hands of the people.
            </p>
            <div className="flex justify-center">
              <img
                src={Logo}
                alt="Shoppybara Mascot"
                className="w-32 h-32 rounded-full shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-amber-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-amber-800 leading-relaxed mb-6">
                At Stackybara, we believe that e-commerce should be transparent,
                secure, and accessible to everyone. Our mission is to create a
                decentralized marketplace that empowers both buyers and sellers
                through blockchain technology.
              </p>
              <p className="text-lg text-amber-800 leading-relaxed">
                We're not just building another shopping platform – we're
                creating a new paradigm for digital commerce that prioritizes
                trust, transparency, and community ownership.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-teal-100 to-amber-100 rounded-3xl p-8 shadow-xl">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/80 rounded-xl p-4">
                    <div className="text-2xl font-bold text-teal-600">50K+</div>
                    <div className="text-sm text-amber-800">Happy Users</div>
                  </div>
                  <div className="bg-white/80 rounded-xl p-4">
                    <div className="text-2xl font-bold text-teal-600">
                      100K+
                    </div>
                    <div className="text-sm text-amber-800">Transactions</div>
                  </div>
                  <div className="bg-white/80 rounded-xl p-4">
                    <div className="text-2xl font-bold text-teal-600">15+</div>
                    <div className="text-sm text-amber-800">Countries</div>
                  </div>
                  <div className="bg-white/80 rounded-xl p-4">
                    <div className="text-2xl font-bold text-teal-600">
                      99.9%
                    </div>
                    <div className="text-sm text-amber-800">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-amber-700">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-amber-200 hover:shadow-lg transition-all duration-300 text-center"
              >
                <CardHeader>
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 mx-auto mb-4 flex items-center justify-center">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-amber-900">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-700">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-amber-700">
              Key milestones in our growth
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-teal-200"></div>
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div
                    className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}
                  >
                    <Card className="border-amber-200 hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <Badge className="bg-teal-100 text-teal-800 mb-2">
                          {milestone.year}
                        </Badge>
                        <h3 className="text-xl font-semibold text-amber-900 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-amber-700">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-teal-500 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-amber-700">
              The passionate people behind Stackybara
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="border-amber-200 hover:shadow-lg transition-all duration-300 text-center group"
              >
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <img
                      src={member.image || '/placeholder.svg'}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-teal-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-amber-700 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
