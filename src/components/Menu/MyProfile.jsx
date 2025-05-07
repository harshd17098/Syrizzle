import React from "react";
import Profile from "./Profile";
import { Link } from "react-router-dom";

const MyProfile = () => {


  return (
    <>
      <div className=" bg-white flex">
        {/* Sidebar */}
        <aside className="w-64 p-6 border-r border-gray-200">
          <h1 className="text-2xl font-semibold mb-6">Profile Settings</h1>
          <nav className="space-y-2">
            <div className="flex flex-col space-y-1">
              <button className="flex items-center px-4 py-2 rounded hover:bg-gray-100">
                <Link to={"/settings/profiles"}> <span className="mr-2">👤</span> Profile</Link>
              </button>
              {/* <button className="flex items-center px-4 py-2 rounded hover:bg-gray-100">
              Basic Info
            </button> */}
              <Link to={"/settings/profile/my-address"}><button className="flex items-center px-4 py-2 bg-gray-100 border-l-4 border-red-500 text-black font-medium rounded">
                My Addresses
              </button></Link>
              <button className="flex items-center px-4 py-2 rounded hover:bg-gray-100">
                <span className="mr-2">⚙️</span> Account
              </button>

              <Link to={"/settings/account"}>  <button className="flex items-center px-4 py-2 bg-gray-100 border-l-4 border-red-500 text-black font-medium rounded">
                Phone numbers
              </button></Link>
              <button className="flex items-center px-4 py-2 rounded hover:bg-gray-100">
                <span className="mr-2">🔒</span> Security
              </button>
            </div>
          </nav>
        </aside>
        <main>


        </main>

      </div>

    </>
  )
}

export default MyProfile