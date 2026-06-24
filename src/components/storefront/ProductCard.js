export default function ProductCard({ product, onAddToCart }) {
  const isOutOfStock = product.stock_quantity <= 0

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden card-hover transition-all">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
        
        {/* Stock Badge */}
        {isOutOfStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold badge-pulse">
            Out of Stock
          </div>
        )}
        
        {product.featured && !isOutOfStock && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm truncate" title={product.name}>
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mt-1">
          ${product.selling_price?.toFixed(2)}
        </p>
        
        {!isOutOfStock && (
          <button
            onClick={() => onAddToCart(product)}
            className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Add to Cart
          </button>
        )}
        
        {isOutOfStock && (
          <button
            disabled
            className="w-full mt-3 bg-gray-300 text-gray-500 py-2 rounded-lg cursor-not-allowed text-sm font-medium"
          >
            Out of Stock
          </button>
        )}
      </div>
    </div>
  )
}