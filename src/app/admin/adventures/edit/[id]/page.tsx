'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import AdventureForm from '@/components/admin/AdventureForm';

export default function EditAdventurePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [adventure, setAdventure] = useState(null);
  const [loading, setLoading] = useState(true);

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

    fetchAdventure();
  }, [session, status, router, params.id]);

  const fetchAdventure = async () => {
    try {
      const response = await fetch(`/api/admin/adventures/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setAdventure(data.adventure);
      }
    } catch (error) {
      console.error('Error fetching adventure:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (adventureData: any) => {
    try {
      const response = await fetch(`/api/admin/adventures/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adventureData),
      });

      if (response.ok) {
        router.push('/admin/adventures');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to update adventure'}`);
      }
    } catch (error) {
      console.error('Error updating adventure:', error);
      alert('Failed to update adventure');
    }
  };

  const handleCancel = () => {
    router.push('/admin/adventures');
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null;
  }

  if (!adventure) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Adventure not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit Adventure</h1>
          <p className="text-gray-600 mt-1">Update adventure package details</p>
        </div>

        <AdventureForm adventure={adventure} onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
}

