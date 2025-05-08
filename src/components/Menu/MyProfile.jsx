import React from "react";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUser, FaCog, FaLock } from 'react-icons/fa';
const MyProfile = () => {

  const [openProfile, setOpenProfile] = useState(true);
  const [openAccount, setOpenAccount] = useState(false);
  return (
    <>
    
        <div className="bg-white flex h-screen">
      {/* Sidebar */}
      <aside className="w-64  ">
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-6 text-center">Profile Settings</h1>

          <div className="w-60 rounded-xl shadow-md bg-white text-sm text-[#2B2D2E] dark:text-gray-200">
            {/* Profile section */}
            <div>
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className="flex items-center w-full px-4 py-3 hover:bg-gray-100 focus:outline-none"
              >
                <FaUser className="mr-2" />
                <span className="flex-1 text-left">Profile</span>
                <span>{openProfile ? '▾' : '▸'}</span>
              </button>
              {openProfile && (
                <div className="pl-10 border-l-2 border-red-600 bg-gray-50">
                  <Link to="/settings/profile">
                    <div className="py-2 hover:bg-gray-200 px-2 cursor-pointer">Basic Info</div>
                  </Link>
                  <Link to="/settings/profile/my-address">
                    <div className="py-2 hover:bg-gray-200 px-2 cursor-pointer">My Addresses</div>
                  </Link>
                </div>
              )}
            </div>

            {/* Account section */}
            <div>
              <button
                onClick={() => setOpenAccount(!openAccount)}
                className="flex items-center w-full px-4 py-3 hover:bg-gray-100 focus:outline-none"
              >
                <FaCog className="mr-2" />
                <span className="flex-1 text-left">Account</span>
                <span>{openAccount ? '▾' : '▸'}</span>
              </button>
              {openAccount && (
                <div className="pl-10 border-l-2 border-transparent bg-gray-50">
                  <Link to="/settings/account">
                    <div className="py-2 hover:bg-gray-200 px-2 cursor-pointer">Phone numbers</div>
                  </Link>
                </div>
              )}
            </div>

            {/* Security item */}
            <Link to={"/settings/security"}><div className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer">
             <FaLock className="mr-2" />
              <span>Security</span>
            </div></Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
     
    </div>



    </>
  )
}

export default MyProfile