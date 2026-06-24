'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export default function StoreCustomization({ store }) {
  const [settings, setSettings] = useState(store?.custom_settings || {})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (store?.custom_settings) {
      setSettings(store.custom_settings)
    }
  }, [store])

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from('stores')
        .update({ custom_settings: settings })
        .eq('id', store.id)
      
      if (error) throw error
      
      toast.success('Store settings updated successfully!')
      // Force refresh to show changes in storefront
      window.location.reload()
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Store Customization
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Changes here will instantly reflect in the storefront preview.
      </p>

      <div className="space-y-6">
        {/* Store Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Store Name
          </label>
          <input
            type="text"
            value={settings.store_name || store?.name || ''}
            onChange={(e) => handleChange('store_name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Hero Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hero Title
          </label>
          <input
            type="text"
            value={settings.hero_title || 'Welcome to Our Store'}
            onChange={(e) => handleChange('hero_title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Hero Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hero Subtitle
          </label>
          <input
            type="text"
            value={settings.hero_subtitle || 'Discover amazing products at great prices'}
            onChange={(e) => handleChange('hero_subtitle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Primary Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Primary Color
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={settings.primary_color || '#3b82f6'}
              onChange={(e) => handleChange('primary_color', e.target.value)}
              className="w-12 h-12 rounded-lg cursor-pointer border border-gray-300"
            />
            <input
              type="text"
              value={settings.primary_color || '#3b82f6'}
              onChange={(e) => handleChange('primary_color', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">This color appears on buttons, banners, and highlights.</p>
        </div>

        {/* Preview Section */}
        <div className="border-t pt-6 mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Live Preview</h4>
          <div 
            className="rounded-lg p-4 text-white"
            style={{ backgroundColor: settings.primary_color || '#3b82f6' }}
          >
            <p className="font-semibold">{settings.hero_title || 'Welcome to Our Store'}</p>
            <p className="text-sm opacity-90">{settings.hero_subtitle || 'Discover amazing products at great prices'}</p>
            <button 
              className="mt-2 px-4 py-1 bg-white text-gray-900 rounded text-sm font-medium"
              style={{ color: settings.primary_color || '#3b82f6' }}
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Store Settings'}
        </button>
      </div>
    </div>
  )
}