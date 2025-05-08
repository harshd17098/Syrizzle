import React from "react";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <img src="/logo.svg" alt="Dubizzle Logo" className="h-6" />
        <button className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700">
          PLACE YOUR AD
        </button>
      </div>

      {/* Language Selection and Title */}
      <div className="text-center py-10">
  <p className="text-sm text-gray-600">English (US)</p>
  <h1 className="text-3xl font-medium mt-2">How can we help you?</h1>

  {/* Input + Search Icon */}
  <div className="mt-6 w-96 mx-auto relative">
    <input
      type="text"
      placeholder="Search our articles"
      className="w-full px-4 py-2 border rounded shadow-sm pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
    />
    {/* SVG Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-red-500 absolute right-3 top-1/2 transform -translate-y-1/2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-4.35-4.35M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13z"
      />
    </svg>
  </div>
</div>

      {/* Help Section */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex space-x-6">
          {/* Help Form */}
          <div className="bg-white p-6 shadow rounded w-full">
            <p className="text-xl font-semibold mb-4">Help us help you faster!</p>
            <p className="text-sm text-gray-700 mb-4">
              Accurately selecting your specific issue from the drop-down lists below will enable us
              to direct your message to the right department. Once you select your issue, you will be
              able to contact us.
            </p>
            <label className="block text-gray-700 text-sm mb-2" htmlFor="help-select">
              How can we help? Select a form that best meets your needs:
            </label>
            <select
              id="help-select"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option>-</option>
              <option>Customer Support</option>
              <option>Verified Business</option>
              <option>Become a Verified Business</option>
              {/* Add more options here */}
            </select>
            <p className="text-red-600 text-xs mt-1">* Mandatory fields</p>
          </div>

          {/* Trending Articles */}
          <div className="w-1/3 bg-white p-6 shadow rounded">
            <p className="text-lg font-semibold mb-2">Trending articles</p>
            {/* Add trending articles here */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 border-t border-gray-200 py-8 bg-white">
        <div className="flex flex-col items-center text-sm text-gray-600 space-y-1">
          <div className="flex space-x-4">
            <a href="#">Home</a>
            <a href="#">Terms of Use</a>
            <a href="#">Privacy Policy</a>
            <a href="#">About Us</a>
            <a href="#">Place Your Ad</a>
          </div>
          <div className="flex space-x-4 mt-4">
            <img src="/google-play-badge.png" alt="Google Play" className="h-10" />
            <img src="/app-store-badge.png" alt="App Store" className="h-10" />
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <div className="fixed bottom-4 right-4">
        <button className="bg-red-600 text-white rounded-full p-4 shadow-lg hover:bg-red-700">
          Chat
        </button>
      </div>
    </div>
  );
}
