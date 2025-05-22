"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from '@/context/AppProvider';
import toast from 'react-hot-toast';
import { XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    profile_image?: string | null;
  };
}

const ProfileModal = ({ isOpen, onClose, user }: ProfileModalProps) => {
  const { authToken, updateUser } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (formData.new_password) {
        if (formData.new_password !== formData.confirm_password) {
          throw new Error('New passwords do not match');
        }
        if (!formData.current_password) {
          throw new Error('Current password is required to set a new password');
        }
      }

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/profile`,
        {
          name: formData.name,
          email: formData.email,
          current_password: formData.current_password,
          new_password: formData.new_password
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: 'application/json'
          }
        }
      );

      updateUser(response.data.user);
      toast.success('Profile updated successfully');
      onClose();
    } catch (error) {
      const axiosError = error as Error;
      console.error('Profile update error:', axiosError);
      setError(axiosError.message || 'Failed to update profile');
      toast.error(axiosError.message || 'Failed to update profile');
      
      if (axiosError instanceof Error && 'response' in axiosError) {
        const response = (axiosError as any).response;
        if (response?.status === 422 && response?.data?.errors) {
          const validationErrors = response.data.errors;
          Object.values(validationErrors).forEach((messages: any) => {
            if (Array.isArray(messages)) {
              messages.forEach((message: string) => toast.error(message));
            }
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Update Profile</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Password Section */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Change Password</h4>
            <p className="text-xs text-gray-500 mb-4">Leave these fields empty if you don't want to change your password</p>
            
            {/* Current Password */}
            <div className="mb-4">
              <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                id="current_password"
                name="current_password"
                value={formData.current_password}
                onChange={handleInputChange}
                placeholder="Enter current password to change it"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* New Password */}
            <div className="mb-4">
              <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="new_password"
                name="new_password"
                value={formData.new_password}
                onChange={handleInputChange}
                placeholder="Enter new password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Confirm New Password */}
            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleInputChange}
                placeholder="Confirm new password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? (
                <div className="flex items-center">
                  <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Updating...
                </div>
              ) : (
                'Update Profile'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal; 