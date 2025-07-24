import React from "react";
import {
  Milk,
  TrendingUp,
  Calendar,
  BarChart3,
  Star,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('/bgVertical.png')] lg:bg-[url('/bgHorizontal.png')]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center lg:justify-start px-6 py-8 lg:px-12 lg:py-16">
        <div className="w-full max-w-md lg:max-w-2xl lg:ml-8">
          {/* Logo and Company Name */}
          <div className="flex items-center justify-center lg:justify-start mb-8">
            <div className="bg-white/95 p-3 lg:p-4 rounded-3xl mr-4 shadow-lg">
              <img
                src="/milktablogo11.png"
                alt="milk logo"
                className="size-8 md:size-10"
              />
            </div>
            <div>
              <h1 className="text-3xl lg:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
                MilkLogs
              </h1>
              <p className="text-sm lg:text-xl text-sky-100 font-medium">
                Milk Quantity Logs Maintainer
              </p>
            </div>
          </div>

          {/* Company Motto and Description */}
          <div className="text-center lg:text-left mb-8 lg:mb-10">
            <p className="text-lg lg:text-2xl text-white font-semibold mb-3 lg:mb-4 drop-shadow">
              Track Every Drop, Master Your Milk Budget
            </p>
            <p className="text-base lg:text-lg text-sky-100 leading-relaxed max-w-lg lg:max-w-2xl mx-auto lg:mx-0">
              Effortlessly monitor daily milk deliveries, automatically
              calculate monthly payments, and never lose track of your
              consumption patterns again.
            </p>
          </div>

          {/* Feature Cards - Desktop: 3 in line, Mobile: stacked */}
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 mb-8 lg:mb-10">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 lg:p-6 shadow-lg text-center transform hover:scale-105 transition-all duration-300">
              <TrendingUp className="w-7 h-7 lg:w-8 lg:h-8 text-sky-500 mb-3 mx-auto" />
              <h3 className="font-bold text-gray-800 mb-2 text-sm lg:text-base">
                Daily Logs
              </h3>
              <p className="text-xs lg:text-sm text-gray-600">
                Record milk quantities logs with ease
              </p>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 lg:p-6 shadow-lg text-center transform hover:scale-105 transition-all duration-300">
              <BarChart3 className="w-7 h-7 lg:w-8 lg:h-8 text-sky-500 mb-3 mx-auto" />
              <h3 className="font-bold text-gray-800 mb-2 text-sm lg:text-base">
                Auto Calculate
              </h3>
              <p className="text-xs lg:text-sm text-gray-600">
                Instant payment calculations
              </p>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 lg:p-6 shadow-lg text-center transform hover:scale-105 transition-all duration-300">
              <Calendar className="w-7 h-7 lg:w-8 lg:h-8 text-sky-500 mb-3 mx-auto" />
              <h3 className="font-bold text-gray-800 mb-2 text-sm lg:text-base">
                Reports
              </h3>
              <p className="text-xs lg:text-sm text-gray-600">
                Monthly consumption insights
              </p>
            </div>
          </div>

          {/* Buttons - Desktop: 3 in line, Mobile: stacked */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-center lg:items-start">
            <button
              onClick={() => handleNavigation("/consumer/dashboard")}
              className="w-full lg:w-auto bg-white text-sky-600 px-6 lg:px-8 py-3 lg:py-4 rounded-2xl font-bold text-base lg:text-lg hover:bg-sky-50 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center"
            >
              <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6 mr-2" />
              Dashboard
              <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
            </button>

            <button
              onClick={() => handleNavigation("/consumer/login")}
              className="w-full lg:w-auto bg-sky-500/95 backdrop-blur-sm text-white px-6 lg:px-8 py-3 lg:py-4 rounded-2xl font-bold text-base lg:text-lg hover:bg-sky-600 transition-all duration-300 shadow-lg border border-white/30 flex items-center justify-center transform hover:scale-105"
            >
              Login
            </button>

            <button
              onClick={() => handleNavigation("/consumer/register")}
              className="w-full lg:w-auto bg-gradient-to-r from-sky-400 to-sky-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-2xl font-bold text-base lg:text-lg hover:from-sky-500 hover:to-sky-700 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center"
            >
              <Star className="w-5 h-5 lg:w-6 lg:h-6 mr-2" />
              Start Now
              <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
