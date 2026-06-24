export default function HeroBanner({ store }) {
  const settings = store?.custom_settings || {}
  
  return (
    <div 
      className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-blue-600 to-purple-600"
      style={{ 
        backgroundColor: settings.primary_color || '#3b82f6'
      }}
    >
      <div className="relative z-10 px-8 py-16 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {settings.hero_title || 'Welcome to Our Store'}
        </h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-2xl">
          {settings.hero_subtitle || 'Discover amazing products at great prices'}
        </p>
        <div className="mt-6">
          <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </div>
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)`
        }}
      ></div>
    </div>
  )
}