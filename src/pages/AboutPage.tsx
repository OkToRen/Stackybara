"use client"

import { useState, useEffect } from "react"
import { Shield, Users, Globe, Heart, Award, Sparkles, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Logo from "@/assets/Logo.png"
import DarrenOliverProfilePicture from "@/assets/DarrenOliver.jpeg"
import RoonySoonProfilePicture from "@/assets/RoonySoon.jpg"
import MartinEricksonProfilePicture from "@/assets/MartinErickson.jpg"
import JasonProfilePicture from "@/assets/Jason.png"
import RoderickAureliusProfilePicture from "@/assets/RoderickAurelius.png"

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [missionInView, setMissionInView] = useState(false)
  const [valuesInView, setValuesInView] = useState(false)
  const [timelineInView, setTimelineInView] = useState(false)
  const [teamInView, setTeamInView] = useState(false)
  const [counters, setCounters] = useState({ users: 0, transactions: 0, countries: 0, uptime: 0 })

  useEffect(() => {
    setIsVisible(true)

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const createObserver = (setter: (value: boolean) => void) =>
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setter(true)
          }
        })
      }, observerOptions)

    const missionObserver = createObserver(setMissionInView)
    const valuesObserver = createObserver(setValuesInView)
    const timelineObserver = createObserver(setTimelineInView)
    const teamObserver = createObserver(setTeamInView)

    const missionSection = document.getElementById("mission-section")
    const valuesSection = document.getElementById("values-section")
    const timelineSection = document.getElementById("timeline-section")
    const teamSection = document.getElementById("team-section")

    if (missionSection) missionObserver.observe(missionSection)
    if (valuesSection) valuesObserver.observe(valuesSection)
    if (timelineSection) timelineObserver.observe(timelineSection)
    if (teamSection) teamObserver.observe(teamSection)

    return () => {
      missionObserver.disconnect()
      valuesObserver.disconnect()
      timelineObserver.disconnect()
      teamObserver.disconnect()
    }
  }, [])

  // Animated counter effect
  useEffect(() => {
    if (missionInView) {
      const targets = { users: 50, transactions: 100, countries: 15, uptime: 99.9 }
      const duration = 2000
      const steps = 60

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps
        const easeOut = 1 - Math.pow(1 - progress, 3)

        setCounters({
          users: Math.floor(targets.users * easeOut),
          transactions: Math.floor(targets.transactions * easeOut),
          countries: Math.floor(targets.countries * easeOut),
          uptime: Math.min(targets.uptime, (targets.uptime * easeOut).toFixed(1)),
        })

        if (step >= steps) {
          clearInterval(timer)
          setCounters(targets)
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [missionInView])

  const team = [
    {
      name: "Darren Oliver Putra Haryanto",
      role: "CEO & Founder",
      image: DarrenOliverProfilePicture,
      bio: "Blockchain enthusiast with a vision for decentralized commerce",
    },
    {
      name: "Roony Soon",
      role: "CTO",
      image: RoonySoonProfilePicture,
      bio: "Former Google engineer, blockchain security expert",
    },
    {
      name: "Jason",
      role: "Head of Product",
      image: JasonProfilePicture,
      bio: "UX designer passionate about decentralized commerce",
    },
    {
      name: "Martin Erickson",
      role: "Head of Marketing",
      image: MartinEricksonProfilePicture,
      bio: "Digital marketing strategist and community builder",
    },
    {
      name: "Roderick Aurelius Tenggono",
      role: "Head of Marketing",
      image: RoderickAureliusProfilePicture,
      bio: "Digital marketing strategist and community builder",
    },
  ]

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description:
        "Every transaction is secured by blockchain technology, ensuring complete transparency and immutability.",
      delay: "delay-100",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Our platform is built by the community, for the community. Every voice matters in our ecosystem.",
      delay: "delay-200",
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Breaking down barriers to enable seamless commerce across borders and currencies.",
      delay: "delay-300",
    },
    {
      icon: Heart,
      title: "Customer Obsessed",
      description: "We put our customers at the center of everything we do, ensuring the best possible experience.",
      delay: "delay-400",
    },
  ]

  const milestones = [
    {
      year: "2021",
      title: "Company Founded",
      description: "Started with a vision to revolutionize e-commerce through blockchain innovation",
      icon: Sparkles,
    },
    {
      year: "2022",
      title: "Blockchain Integration",
      description: "Successfully integrated cutting-edge blockchain technology for secure transactions",
      icon: Shield,
    },
    {
      year: "2023",
      title: "10K+ Users",
      description: "Reached our first major user milestone with growing community engagement",
      icon: Users,
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Launched in 15+ countries worldwide, connecting global communities",
      icon: Globe,
    },
  ]

  const stats = [
    { value: counters.users, label: "Happy Users", suffix: "K+", icon: Users },
    { value: counters.transactions, label: "Transactions", suffix: "K+", icon: TrendingUp },
    { value: counters.countries, label: "Countries", suffix: "+", icon: Globe },
    { value: counters.uptime, label: "Uptime", suffix: "%", icon: Award },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-float animation-delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-200/10 rounded-full blur-2xl animate-pulse" />

        <div className="relative container mx-auto px-4">
          <div
            className={`text-center max-w-4xl mx-auto transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Badge className="bg-teal-100 text-teal-800 px-6 py-2 text-sm font-medium mb-8 animate-bounce-in hover:scale-105 transition-transform duration-300">
              🌟 About Shoppybara
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-amber-900 mb-8 leading-tight">
              Revolutionizing E-commerce with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 animate-gradient-x">
                Blockchain
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-amber-800 leading-relaxed mb-12 animate-fade-in animation-delay-500">
              We're building the future of decentralized commerce, where every transaction is transparent, secure, and
              puts the power back in the hands of the people.
            </p>

            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full opacity-20 group-hover:opacity-30 transition-opacity blur-xl animate-pulse" />
                <div className="relative bg-white/30 backdrop-blur-sm rounded-full p-6 border border-white/40 shadow-2xl group-hover:scale-110 transition-all duration-500">
                  <img
                    src={Logo || "/placeholder.svg"}
                    alt="Shoppybara Mascot"
                    className="w-32 h-32 animate-float group-hover:animate-bounce"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission-section" className="py-20 bg-white/70 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-50/50 to-amber-50/50" />
        <div className="relative container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div
              className={`space-y-8 transition-all duration-800 ease-out ${
                missionInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-8">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                  Mission
                </span>
              </h2>
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-amber-800 leading-relaxed">
                  At Shoppybara, we believe that e-commerce should be transparent, secure, and accessible to everyone.
                  Our mission is to create a decentralized marketplace that empowers both buyers and sellers through
                  blockchain technology.
                </p>
                <p className="text-lg md:text-xl text-amber-800 leading-relaxed">
                  We're not just building another shopping platform – we're creating a new paradigm for digital commerce
                  that prioritizes trust, transparency, and community ownership.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-teal-100 text-teal-700 px-4 py-2 hover:scale-105 transition-transform duration-300">
                  🔒 Secure
                </Badge>
                <Badge className="bg-emerald-100 text-emerald-700 px-4 py-2 hover:scale-105 transition-transform duration-300">
                  🌐 Decentralized
                </Badge>
                <Badge className="bg-amber-100 text-amber-700 px-4 py-2 hover:scale-105 transition-transform duration-300">
                  🚀 Innovative
                </Badge>
              </div>
            </div>

            <div
              className={`relative transition-all duration-800 ease-out delay-300 ${
                missionInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <div className="bg-gradient-to-br from-teal-100 to-amber-100 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center group-hover:scale-105 transition-all duration-300 hover:shadow-lg"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-center mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mr-2">
                          <stat.icon className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-teal-600 mb-1">
                        {stat.value}
                        {stat.suffix}
                      </div>
                      <div className="text-sm text-amber-800 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values-section" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-50/30 to-transparent" />
        <div className="relative container mx-auto px-4">
          <div
            className={`text-center mb-16 transition-all duration-800 ease-out ${
              valuesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                Values
              </span>
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our vision for the future
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className={`border-amber-200 hover:shadow-2xl transition-all duration-500 text-center group cursor-pointer hover:scale-105 hover:-translate-y-2 bg-white/80 backdrop-blur-sm ${
                  valuesInView ? `opacity-100 translate-y-0 ${value.delay}` : "opacity-0 translate-y-10"
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-amber-900 group-hover:text-teal-600 transition-colors duration-300">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-700 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline-section" className="py-20 bg-white/70 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/50 to-teal-50/50" />
        <div className="relative container mx-auto px-4">
          <div
            className={`text-center mb-16 transition-all duration-800 ease-out ${
              timelineInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                Journey
              </span>
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Key milestones that shaped our path to revolutionizing e-commerce
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Animated Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-teal-200 via-emerald-200 to-amber-200 rounded-full" />

              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center mb-16 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} ${
                    timelineInView ? `opacity-100 translate-y-0` : "opacity-0 translate-y-10"
                  }`}
                  style={{
                    transitionDelay: timelineInView ? `${index * 200}ms` : "0ms",
                    transitionDuration: "800ms",
                  }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                    <Card className="border-amber-200 hover:shadow-2xl transition-all duration-500 group hover:scale-105 bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <milestone.icon className="h-5 w-5 text-white" />
                          </div>
                          <Badge className="bg-teal-100 text-teal-800 px-3 py-1 hover:scale-105 transition-transform duration-300">
                            {milestone.year}
                          </Badge>
                        </div>
                        <h3 className="text-2xl font-bold text-amber-900 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                          {milestone.title}
                        </h3>
                        <p className="text-amber-700 leading-relaxed">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Animated Timeline Dot */}
                  <div className="relative z-10">
                    <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full border-4 border-white shadow-lg animate-pulse hover:scale-125 transition-transform duration-300" />
                  </div>

                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team-section" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-50/30 to-transparent" />
        <div className="relative container mx-auto px-4">
          <div
            className={`text-center mb-16 transition-all duration-800 ease-out ${
              teamInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
              Meet Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Team</span>
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              The passionate innovators behind Shoppybara's revolutionary platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className={`border-amber-200 hover:shadow-2xl transition-all duration-500 text-center group cursor-pointer hover:scale-105 hover:-translate-y-2 bg-white/80 backdrop-blur-sm overflow-hidden ${
                  teamInView ? `opacity-100 translate-y-0` : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: teamInView ? `${index * 150}ms` : "0ms",
                }}
              >
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <div className="absolute -inset-2 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg" />
                    <div className="relative">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-500 border-4 border-white shadow-lg"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-amber-900 group-hover:text-teal-600 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <Badge className="bg-teal-100 text-teal-600 px-3 py-1 font-medium hover:scale-105 transition-transform duration-300">
                      {member.role}
                    </Badge>
                    <p className="text-amber-700 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
