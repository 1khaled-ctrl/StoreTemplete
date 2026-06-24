'use client'

import { motion } from 'framer-motion'
import { Store, Settings } from 'lucide-react'

export default function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'storefront', label: 'Storefront', icon: Store },
    { id: 'admin', label: 'Admin CMS', icon: Settings }
  ]

  return (
    <div className="flex gap-1 bg-gray-100/80 backdrop-blur-sm p-1 rounded-2xl">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        const Icon = tab.icon
        
        return (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-colors flex items-center gap-2 ${
              isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-0 bg-white rounded-xl shadow-sm"
                transition={{ type: 'spring', duration: 0.3 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Icon className="w-4 h-4" />
              {tab.label}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}