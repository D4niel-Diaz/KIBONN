"use client";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRightIcon, 
  BookOpenIcon, 
  UserGroupIcon, 
  ClockIcon, 
  ChartBarIcon, 
  DevicePhoneMobileIcon, 
  CloudIcon,
  ShieldCheckIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-purple-600/50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">
              Transform Your Library with Our Modern Management System
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto opacity-0 animate-[fadeIn_0.8s_ease-out_0.2s_forwards]">
              Streamline operations, enhance user experience, and manage collections effortlessly
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-[fadeIn_0.8s_ease-out_0.4s_forwards]">
              <Link 
                href="/auth" 
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Request a Demo
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Powerful Features for Modern Libraries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpenIcon,
                title: "Catalog Management",
                description: "Efficiently organize and manage your entire collection with our intuitive catalog system."
              },
              {
                icon: UserGroupIcon,
                title: "Patron Tracking",
                description: "Keep track of member information, borrowing history, and preferences in one place."
              },
              {
                icon: ClockIcon,
                title: "Loan Management",
                description: "Streamline the borrowing process with automated due dates and renewal options."
              },
              {
                icon: ChartBarIcon,
                title: "Reporting Dashboard",
                description: "Make data-driven decisions with comprehensive analytics and insights."
              },
              {
                icon: DevicePhoneMobileIcon,
                title: "Mobile Accessibility",
                description: "Access your library system anywhere, anytime with our mobile-friendly interface."
              },
              {
                icon: CloudIcon,
                title: "Integration Capabilities",
                description: "Seamlessly connect with other library systems and third-party applications."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-500/50 transition-all duration-200 hover:shadow-lg"
              >
                <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our System?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Reduce administrative workload",
              "Improve resource tracking",
              "Enhance user satisfaction",
              "Data-driven decision making",
              "Cloud-based accessibility",
              "Real-time updates and notifications"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircleIcon className="h-6 w-6 text-blue-500 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Trusted by Libraries Worldwide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "This system cut our processing time by 40%",
                author: "Central Library",
                role: "Head Librarian"
              },
              {
                quote: "Patrons love the new self-checkout feature",
                author: "University Library",
                role: "Library Director"
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-6 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xl text-gray-700 mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center space-x-8">
            <ShieldCheckIcon className="h-12 w-12 text-gray-400" />
            <ShieldCheckIcon className="h-12 w-12 text-gray-400" />
            <ShieldCheckIcon className="h-12 w-12 text-gray-400" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Modernize Your Library?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join the digital transformation and take your library to the next level
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth" 
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Schedule a Consultation
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="#features" 
              className="inline-flex items-center px-8 py-4 border border-white text-lg font-medium rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200"
            >
              View Features
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Library Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}