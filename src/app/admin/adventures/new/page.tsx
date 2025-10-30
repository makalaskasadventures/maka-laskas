'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdventureForm from '@/components/admin/AdventureForm';

export default function NewAdventurePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    if (session.user.role !== 'ADMIN') {
      router.push('/');
      return;
    }
  }, [session, status, router]);

  const handleSubmit = async (adventureData: any) => {
    try {
      const response = await fetch('/api/admin/adventures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adventureData),
      });

      if (response.ok) {
        router.push('/admin/adventures');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to create adventure'}`);
      }
    } catch (error) {
      console.error('Error creating adventure:', error);
      alert('Failed to create adventure');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create New Adventure</h1>
          <p className="text-gray-600 mt-1">Add a new adventure package to your catalog</p>
        </div>

        <AdventureForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}


