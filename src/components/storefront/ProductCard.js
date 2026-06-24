'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, Check } from 'lucide-react'
import { useState } from 'react'

export default function ProductCard({ product, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false)
  const isOutOfStock = product.stock_quantity <= 0

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      onAddToCart(product)
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
    }
  }

  return (
    <motion.div
      className="card card-hover overflow-hidden"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
    >
      {/* Product Image */}
      <div className="relative h-52 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
        
        {/* Stock Badge */}
        {isOutOfStock && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg shadow-red-500/30"
          >
            Out of Stock
          </motion.div>
        )}
        
        {product.featured && !isOutOfStock && (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg shadow-yellow-500/30"
          >
            ⭐ Featured
          </motion.div>
        )}

        {/* Price tag */}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-bold">
          ${product.selling_price?.toFixed(2)}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm truncate" title={product.name}>
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-gray-500 text-xs mt-1 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Stock:</span>
            <span className={`text-xs font-medium ${
              product.stock_quantity > 10 ? 'text-green-600' :
              product.stock_quantity > 0 ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {product.stock_quantity > 0 ? `${product.stock_quantity} units` : 'Out of stock'}
            </span>
          </div>
        </div>
        
        <motion.button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full mt-3 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            isOutOfStock
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : isAdded
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:shadow-blue-500/30'
          }`}
          whileHover={!isOutOfStock && !isAdded ? { scale: 1.02 } : {}}
          whileTap={!isOutOfStock && !isAdded ? { scale: 0.98 } : {}}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              Added!
            </>
          ) : isOutOfStock ? (
            'Out of Stock'
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}