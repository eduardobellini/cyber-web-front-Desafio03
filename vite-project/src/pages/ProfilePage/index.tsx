import React from 'react';
import { UserProfile } from '@clerk/clerk-react';

const UserProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Meu Perfil
            </h1>
            
            <div className="flex justify-center">
              <UserProfile 
                appearance={{
                  elements: {
                    rootBox: "w-full max-w-none",
                    card: "shadow-none border-0"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;