'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Save, Palette, Type, Image as ImageIcon } from 'lucide-react'
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
      setTimeout(() => window.location.reload(), 500)
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setLoading(false)
    }
  }

  const settingFields = [
    {
      key: 'store_name',
      label: 'Store Name',
      icon: Type,
      type: 'text',
      placeholder: 'My Awesome Store'
    },
    {
      key: 'hero_title',
      label: 'Hero Title',
      icon: Type,
      type: 'text',
      placeholder: 'Welcome to Our Store'
    },
    {
      key: 'hero_subtitle',
      label: 'Hero Subtitle',
      icon: Type,
      type: 'text',
      placeholder: 'Discover amazing products at great prices'
    },
    {
      key: 'primary_color',
      label: 'Primary Color',
      icon: Palette,
      type: 'color',
      placeholder: '#3b82f6'
    },
    {
      key: 'logo_url',
      label: 'Logo URL',
      icon: ImageIcon,
      type: 'text',
      placeholder: 'https://example.com/logo.png'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
          <Palette className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Store Customization</h3>
          <p className="text-sm text-gray-500">Changes will instantly reflect in the storefront</p>
        </div>
      </div>

      <div className="space-y-6">
        {settingFields.map((field, index) => (
          <motion.div
            key={field.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
              <field.icon className="w-4 h-4 text-gray-400" />
              {field.label}
            </label>
            
            {field.type === 'color' ? (
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={settings[field.key] || '#3b82f6'}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-14 h-14 rounded-xl cursor-pointer border-2 border-gray-200 hover:border-gray-300 transition-colors"
                />
                <input
                  type="text"
                  value={settings[field.key] || '#3b82f6'}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="flex-1 input-field font-mono text-sm"
                  placeholder={field.placeholder}
                />
              </div>
            ) : (
              <input
                type={field.type}
                value={settings[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="input-field"
                placeholder={field.placeholder}
              />
            )}
          </motion.div>
        ))}

        {/* Live Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="border-t pt-6 mt-6"
        >
          <h4 className="text-sm font-medium text-gray-700 mb-3">Live Preview</h4>
          <div 
            className="rounded-2xl p-6 text-white transition-all duration-300"
            style={{ backgroundColor: settings.primary_color || '#3b82f6' }}
          >
            <p className="font-semibold text-lg">{settings.hero_title || 'Welcome to Our Store'}</p>
            <p className="text-sm opacity-90 mt-1">{settings.hero_subtitle || 'Discover amazing products at great prices'}</p>
            <div className="mt-3 flex gap-3">
              <button 
                className="px-4 py-2 bg-white text-gray-900 rounded-xl text-sm font-medium shadow-lg"
                style={{ color: settings.primary_color || '#3b82f6' }}
              >
                Shop Now
              </button>
              <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-medium border border-white/30">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 disabled:opacity-50"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Store Settings
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}