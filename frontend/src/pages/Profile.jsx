import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Profile = () => {
    const {user} = useAuthStore();
    const navigate = useNavigate();

    const handleEdit = () => {
      navigate("/edit-profile")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-700 text-white flex items-center justify-center text-3xl font-bold mb-4">
                {user?.name?.charAt(0).toUpperCase() || '?'}
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">{user?.name || 'Unknown User'}</h2>
              <p className="text-sm text-gray-500 mb-6">{user?.email}</p>
            </div>
    
            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Full Name</span>
                <span>{user?.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Email</span>
                <span>{user?.email || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Phone</span>
                <span>{user?.phone || 'Not Provided'}</span>
              </div>
            </div>
    
            <button
              // onClick={() => navigate('/edit-profile')}
              onClick={handleEdit}
              className="mt-8 w-full bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-xl text-sm font-medium transition duration-200"
            >
              Edit Profile
            </button>
          </div>
        </div>
      );
    };

export default Profile;