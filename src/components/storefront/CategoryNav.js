'use client'

import { motion } from 'framer-motion'
import { LayoutGrid } from 'lucide-react'

export default function CategoryNav({ categories, selectedCategory, onSelectCategory }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex flex-wrap gap-2">
        <motion.button
          onClick={() => onSelectCategory(null)}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            selectedCategory === null
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LayoutGrid className="w-4 h-4" />
          All Products
        </motion.button>
        {categories.map(category => (
          <motion.button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {category.name}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}