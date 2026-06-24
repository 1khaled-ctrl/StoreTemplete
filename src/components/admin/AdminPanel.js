'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import ProductTable from './ProductTable'
import ProductModal from './ProductModal'
import StoreCustomization from './StoreCustomization'
import { Plus, Package, Palette } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminPanel({ store }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [activeTab, setActiveTab] = useState('products')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (store) {
      fetchProducts()
      fetchCategories()
    }
  }, [store])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .eq('store_id', store.id)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('store_id', store.id)
        .order('name')
      
      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleDeleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)
        .eq('store_id', store.id)
      
      if (error) throw error
      
      toast.success('Product deleted successfully')
      fetchProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('Failed to delete product')
    }
  }

  const handleSaveProduct = async (productData) => {
    try {
      const dataToSave = {
        ...productData,
        store_id: store.id,
        images: productData.images || [],
      }

      let result
      if (editingProduct) {
        const { data, error } = await supabase
          .from('products')
          .update(dataToSave)
          .eq('id', editingProduct.id)
          .select()
          .single()
        
        if (error) throw error
        result = data
        toast.success('Product updated successfully')
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert([dataToSave])
          .select()
          .single()
        
        if (error) throw error
        result = data
        toast.success('Product created successfully')
      }

      setIsModalOpen(false)
      fetchProducts()
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error('Failed to save product')
    }
  }

  const tabConfigs = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'customize', label: 'Customize Store', icon: Palette }
  ]

  return (
    <div>
      <div className="flex gap-2 mb-6 bg-gray-100/80 backdrop-blur-sm p-1 rounded-2xl w-fit">
        {tabConfigs.map((tab) => {
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
                  layoutId="admin-tab-indicator"
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

      <AnimatePresence mode="wait">
        {activeTab === 'products' ? (
          <motion.div
            key="products"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Product Inventory</h2>
                <p className="text-gray-500 text-sm mt-1">Manage your products and inventory</p>
              </div>
              <motion.button
                onClick={handleAddProduct}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-4 h-4" />
                Add Product
              </motion.button>
            </div>

            <ProductTable
              products={products}
              loading={loading}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          </motion.div>
        ) : (
          <motion.div
            key="customize"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <StoreCustomization store={store} />
          </motion.div>
        )}
      </AnimatePresence>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
        categories={categories}
      />
    </div>
  )
}