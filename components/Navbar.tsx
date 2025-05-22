"use client";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppProvider";
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { logout, authToken, isLoading } = useAppContext();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/auth');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <nav className="bg-gray-800 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-end h-16">
            <div className="animate-pulse h-4 w-24 bg-gray-700 rounded"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-end h-16">
          {authToken && (
            <button 
              onClick={handleLogout} 
              className="flex items-center px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 rounded-md transition-colors"
              aria-label="Logout"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;