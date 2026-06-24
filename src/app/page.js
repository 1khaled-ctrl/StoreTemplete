'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Storefront from '@/components/storefront/Storefront'
import AdminPanel from '@/components/admin/AdminPanel'
import TabNavigation from '@/components/common/TabNavigation'

export default function Home() {
  const [activeTab, setActiveTab] = useState('storefront')
  const [store, setStore] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // For demo, we'll use a fixed store ID
    // In production, this would come from the subdomain or authentication
    const fetchStore = async () => {
      try {
        const { data, error } = await supabase
          .from('stores')
          .select('*')
          .eq('subdomain', 'demo')
          .single()
        
        if (error) throw error
        setStore(data)
      } catch (error) {
        console.error('Error fetching store:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStore()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {store?.name || 'E-Commerce Platform'}
            </h1>
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'storefront' ? (
          <Storefront store={store} />
        ) : (
          <AdminPanel store={store} />
        )}
      </div>
    </div>
  )
}