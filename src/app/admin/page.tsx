'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { 
  Users, Globe, Calendar, DollarSign, TrendingUp, LogOut, Settings, BarChart3,
  Home, FileText, Image, UserCog, BookOpen, Activity, Bell, ChevronRight,
  ArrowUp, ArrowDown, Eye, Plus, Edit, Trash2, Clock, Star
} from 'lucide-react'
import Link from 'next/link'

interface Activity {
  id: string
  type: 'user' | 'booking' | 'adventure' | 'payment' | 'testimonial'
  message: string
  timestamp: string
  icon: any
  color: string
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdventures: 0,
    totalBookings: 0,
    totalRevenue: 0,
    newUsersThisMonth: 0,
    bookingsThisMonth: 0,
    revenueThisMonth: 0,
    revenueGrowth: 0,
  })

  const [recentActivities, setRecentActivities] = useState<Activity[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [homepageSummary, setHomepageSummary] = useState({
    featuredCount: 0,
    saleCount: 0,
  })

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/signin')
      return
    }

    if (session.user.role !== 'ADMIN') {
      router.push('/')
      return
    }

    fetchAdminStats()
    fetchRecentActivities()
    fetchHomepageSummary()
  }, [session, status, router])

  const fetchAdminStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats({
          ...data,
          newUsersThisMonth: data.newUsersThisMonth || 12,
          bookingsThisMonth: data.bookingsThisMonth || 45,
          revenueThisMonth: data.revenueThisMonth || 12500,
          revenueGrowth: data.revenueGrowth || 12.5,
        })
      }
    } catch (error) {
      console.error('Failed to fetch admin stats:', error)
    }
  }

  const fetchHomepageSummary = async () => {
    try {
      const response = await fetch('/api/admin/adventures')
      if (response.ok) {
        const data = await response.json()
        const adventures = data.adventures || []

        const featuredCount = adventures.filter(
          (adv: any) => adv.homepageFeaturedOrder !== null && adv.homepageFeaturedOrder !== undefined
        ).length
        const saleCount = adventures.filter(
          (adv: any) => adv.homepageSaleOrder !== null && adv.homepageSaleOrder !== undefined
        ).length

        setHomepageSummary({
          featuredCount,
          saleCount,
        })
      }
    } catch (error) {
      console.error('Failed to fetch homepage summary:', error)
    }
  }

  const fetchRecentActivities = async () => {
    // Mock recent activities - replace with API call
    const activities: Activity[] = [
      {
        id: '1',
        type: 'user',
        message: 'New user registration: John Doe',
        timestamp: '2 minutes ago',
        icon: Users,
        color: 'bg-green-500'
      },
      {
        id: '2',
        type: 'booking',
        message: 'New booking created for Gorilla Trekking Adventure',
        timestamp: '15 minutes ago',
        icon: Calendar,
        color: 'bg-blue-500'
      },
      {
        id: '3',
        type: 'payment',
        message: 'Payment received: $2,450.00',
        timestamp: '1 hour ago',
        icon: DollarSign,
        color: 'bg-yellow-500'
      },
      {
        id: '4',
        type: 'adventure',
        message: 'New adventure published: Serengeti Migration Safari',
        timestamp: '2 hours ago',
        icon: Globe,
        color: 'bg-purple-500'
      },
      {
        id: '5',
        type: 'testimonial',
        message: 'New testimonial added by Sarah Johnson',
        timestamp: '3 hours ago',
        icon: FileText,
        color: 'bg-pink-500'
      },
      {
        id: '6',
        type: 'booking',
        message: 'Booking confirmed: Rwanda Volcanoes Experience',
        timestamp: '4 hours ago',
        icon: Calendar,
        color: 'bg-blue-500'
      },
    ]
    setRecentActivities(activities)
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', href: '/admin', active: true },
    { icon: Globe, label: 'Adventures', href: '/admin/adventures' },
    { icon: Star, label: 'Homepage Featured', href: '/admin/homepage' },
    { icon: Calendar, label: 'Bookings', href: '/admin/bookings' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: Image, label: 'Media', href: '/admin/media' },
    { icon: FileText, label: 'Testimonials', href: '/admin/testimonials' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ]

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ML</span>
            </div>
            {sidebarOpen && (
              <h1 className="ml-3 text-lg font-bold text-gray-900">Admin</h1>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-orange-50 text-orange-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="ml-3">{item.label}</span>
                    {item.active && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {session.user.name?.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
            {sidebarOpen && (
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {session.user.name}
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button
              onClick={handleSignOut}
              className="mt-3 w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-sm text-gray-600 mt-1">Welcome back, {session.user.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className={`flex items-center text-sm ${stats.newUsersThisMonth > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                  <ArrowUp className="w-4 h-4 mr-1" />
                  {stats.newUsersThisMonth}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Eye className="w-4 h-4 mr-1" />
                  Active
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">Adventures</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalAdventures}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                </div>
                <div className={`flex items-center text-sm ${stats.bookingsThisMonth > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                  <ArrowUp className="w-4 h-4 mr-1" />
                  {stats.bookingsThisMonth}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">Bookings</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <div className={`flex items-center text-sm ${stats.revenueGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.revenueGrowth > 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                  {stats.revenueGrowth}%
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">${stats.revenueThisMonth.toLocaleString()} this month</p>
            </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm font-semibold text-gray-500">
                {Math.min(homepageSummary.featuredCount, 5)}/5 featured
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-2">Homepage Features</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {Math.min(homepageSummary.saleCount, 5)}/5 sale slots
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Featured cards: {homepageSummary.featuredCount} · Sale cards: {homepageSummary.saleCount}
            </p>
            <Link
              href="/admin/homepage"
              className="text-sm font-semibold text-orange-600 hover:text-orange-700 inline-flex items-center"
            >
              Manage homepage
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          </div>

          {/* Analytics & Activities Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Analytics Chart Section */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Analytics Overview</h3>
                  <p className="text-sm text-gray-600">Key metrics and trends</p>
                </div>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>

              {/* Chart Placeholder */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 mb-6">
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                    <p className="text-gray-600">Chart visualization will be displayed here</p>
                    <p className="text-sm text-gray-500 mt-2">Revenue, bookings, and user growth trends</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{stats.bookingsThisMonth}</p>
                  <p className="text-xs text-gray-600 mt-1">Bookings (Month)</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{stats.newUsersThisMonth}</p>
                  <p className="text-xs text-gray-600 mt-1">New Users (Month)</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">${(stats.revenueThisMonth / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-gray-600 mt-1">Revenue (Month)</p>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                  <p className="text-sm text-gray-600">Latest updates</p>
                </div>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>

              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.timestamp}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <Link
                href="/admin/activities"
                className="mt-4 block text-center text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                View all activities →
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/admin/adventures/new"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-200">
                  <Plus className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">New Adventure</span>
              </Link>

              <Link
                href="/admin/adventures"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200">
                  <Edit className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Manage Adventures</span>
              </Link>

              <Link
                href="/admin/homepage"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-200">
                  <Star className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">Homepage Featured</span>
              </Link>

              <Link
                href="/admin/media"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-200">
                  <Image className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-green-600">Media Library</span>
              </Link>

              <Link
                href="/admin/users"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200">
                  <UserCog className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600">Manage Users</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
