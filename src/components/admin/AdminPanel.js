'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import ProductTable from './ProductTable'
import ProductModal from './ProductModal'
import StoreCustomization from './StoreCustomization'
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
        // Update existing product
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
        // Create new product
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

  return (
    <div>
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'products'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📦 Products
        </button>
        <button
          onClick={() => setActiveTab('customize')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'customize'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🎨 Customize Store
        </button>
      </div>

      {activeTab === 'products' ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Product Inventory</h2>
            <button
              onClick={handleAddProduct}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <span>+</span> Add Product
            </button>
          </div>

          <ProductTable
            products={products}
            loading={loading}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </>
      ) : (
        <StoreCustomization store={store} />
      )}

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