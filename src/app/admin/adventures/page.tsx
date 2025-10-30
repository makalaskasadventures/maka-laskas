'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Eye, Search, Filter, Star } from 'lucide-react';
import Link from 'next/link';

interface Adventure {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  image: string;
  duration: number;
  groupSize: number;
  difficulty: string;
  price: number;
  isActive: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  country: { name: string };
  category: { name: string };
}

export default function ManageAdventuresPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

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

    fetchAdventures();
  }, [session, status, router]);

  const fetchAdventures = async () => {
    try {
      const response = await fetch('/api/admin/adventures');
      if (response.ok) {
        const data = await response.json();
        setAdventures(data.adventures || []);
      }
    } catch (error) {
      console.error('Failed to fetch adventures:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this adventure?')) return;

    try {
      const response = await fetch(`/api/admin/adventures/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAdventures(prev => prev.filter(adv => adv.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete adventure:', error);
    }
  };

  const toggleFeatured = async (id: string, currentValue: boolean) => {
    try {
      const response = await fetch(`/api/admin/adventures/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !currentValue }),
      });

      if (response.ok) {
        setAdventures(prev =>
          prev.map(adv =>
            adv.id === id ? { ...adv, isFeatured: !currentValue } : adv
          )
        );
      }
    } catch (error) {
      console.error('Failed to toggle featured:', error);
    }
  };

  const filteredAdventures = adventures.filter(adv => {
    const matchesSearch = adv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adv.category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' ||
      (filterStatus === 'active' && adv.isActive) ||
      (filterStatus === 'inactive' && !adv.isActive);
    return matchesSearch && matchesFilter;
  });

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manage Adventures</h1>
              <p className="text-gray-600 mt-1">Create and manage adventure packages</p>
            </div>
            <Link
              href="/admin/adventures/new"
              className="btn-primary inline-flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Adventure
            </Link>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search adventures..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Adventures</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Adventures List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Adventure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAdventures.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No adventures found
                    </td>
                  </tr>
                ) : (
                  filteredAdventures.map((adventure) => (
                    <tr key={adventure.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {adventure.image && (
                            <img
                              src={adventure.image}
                              alt={adventure.title}
                              className="w-12 h-12 rounded-lg object-cover mr-4"
                            />
                          )}
                          <div>
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">
                                {adventure.title}
                              </div>
                              {adventure.isFeatured && (
                                <Star className="w-4 h-4 ml-2 text-yellow-500 fill-yellow-500" />
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              {adventure.shortDescription?.substring(0, 50)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {adventure.category.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {adventure.duration} days
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        ${adventure.price}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            adventure.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {adventure.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => toggleFeatured(adventure.id, adventure.isFeatured)}
                            className={`p-2 rounded-lg transition-colors ${
                              adventure.isFeatured
                                ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            title={adventure.isFeatured ? 'Remove from featured' : 'Add to featured'}
                          >
                            <Star className="w-4 h-4" />
                          </button>
                          <Link
                            href={`/adventures/${adventure.slug}`}
                            target="_blank"
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            title="View adventure"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/admin/adventures/edit/${adventure.id}`}
                            className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                            title="Edit adventure"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(adventure.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            title="Delete adventure"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{adventures.length}</div>
            <div className="text-sm text-gray-600">Total Adventures</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {adventures.filter(a => a.isActive).length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-yellow-600">
              {adventures.filter(a => a.isFeatured).length}
            </div>
            <div className="text-sm text-gray-600">Featured</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">
              {adventures.filter(a => a.isOnSale).length}
            </div>
            <div className="text-sm text-gray-600">On Sale</div>
          </div>
        </div>
      </div>
    </div>
  );
}


