import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="text-center bg-white p-12 rounded-3xl shadow-2xl w-full max-w-2xl">
        <h1 className="text-9xl font-extrabold text-gray-800 mb-6">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8 text-lg">
          Sorry, the page you’re looking for doesn’t exist or might have been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-xl transition duration-200 text-base font-medium"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
