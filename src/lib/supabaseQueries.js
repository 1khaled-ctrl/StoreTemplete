import { supabase } from './supabase'

// Store queries
export const getStoreBySubdomain = async (subdomain) => {
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('subdomain', subdomain)
    .single()
  
  if (error) throw error
  return data
}

// Product queries
export const getProductsByStore = async (storeId, filters = {}) => {
  let query = supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('store_id', storeId)
    .eq('status', 'active')
  
  if (filters.category) {
    query = query.eq('category_id', filters.category)
  }
  
  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`)
  }
  
  const { data, error } = await query
  if (error) throw error
  return data
}

// Category queries
export const getCategoriesByStore = async (storeId) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('store_id', storeId)
    .order('name')
  
  if (error) throw error
  return data
}

// Cart queries
export const getCart = async (cartId) => {
  const { data, error } = await supabase
    .from('carts')
    .select('*, cart_items(*, products(*))')
    .eq('id', cartId)
    .single()
  
  if (error) throw error
  return data
}

// Order queries
export const createOrder = async (orderData) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single()
  
  if (error) throw error
  return data
}