import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'pricing':
        return (
          <div className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <span className="text-gray-900 font-semibold">Pricing Plans</span>
                <h2 className="text-4xl font-bold mt-4 mb-6">Choose the Perfect Plan for Your Business</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Start free and scale as you grow. All plans include a 14-day trial with full access to all features.
                </p>
              </div>
              {/* Rest of the pricing page JSX */}
              {/* ... */}
            </div>
          </div>
        );
      case 'home':
        return (
          <>
            {/* Hero Section */}
            <div className="relative h-[600px] w-full overflow-hidden">
              {/* Rest of the home page JSX */}
              {/* ... */}
            </div>
          </>
        );
      case 'blog':
        return (
          <div className="pt-20 bg-white">
            {/* Blog page content */}
            {/* ... */}
          </div>
        );
      case 'solutions':
        return (
          <div className="pt-20 bg-white">
            {/* Solutions page content */}
            {/* ... */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Feedal</h1>
                <p className="text-sm text-gray-500">Learn from your customers</p>
              </div>
              <div className="hidden md:flex items-center ml-16 space-x-8">
                <button onClick={() => setCurrentPage('home')} className="text-gray-700 hover:text-indigo-600">Home</button>
                <button onClick={() => setCurrentPage('solutions')} className="text-gray-700 hover:text-indigo-600">Solutions</button>
                <button onClick={() => setCurrentPage('blog')} className="text-gray-700 hover:text-indigo-600">Blog</button>
                <button onClick={() => setCurrentPage('pricing')} className="text-gray-700 hover:text-indigo-600">Pricing</button>
                <button onClick={() => setCurrentPage('contact')} className="text-gray-700 hover:text-indigo-600">Contact</button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-6 py-2 text-indigo-600 hover:text-indigo-700 font-semibold whitespace-nowrap"
              >
                Log In
              </button>
              <button
                onClick={() => setShowSignupModal(true)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-button hover:bg-indigo-700 transition duration-300 whitespace-nowrap"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20">
        {renderPage()}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Feedal</h3>
              <p className="text-gray-400">Transforming customer feedback into actionable insights with AI technology.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button className="text-gray-400 hover:text-white">About Us</button></li>
                <li><button className="text-gray-400 hover:text-white">Features</button></li>
                <li><button className="text-gray-400 hover:text-white">Pricing</button></li>
                <li><button className="text-gray-400 hover:text-white">Blog</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">Email: contact@feedal.com</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter text-xl"></i>
                </button>
                <button className="text-gray-400 hover:text-white">
                  <i className="fab fa-linkedin text-xl"></i>
                </button>
                <button className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook text-xl"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 Feedal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;