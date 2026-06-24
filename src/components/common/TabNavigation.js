export default function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'storefront', label: '🛍️ Storefront', icon: 'store' },
    { id: 'admin', label: '⚙️ Admin CMS', icon: 'settings' }
  ]

  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === tab.id
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}