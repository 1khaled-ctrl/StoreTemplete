# Multi-Tenant E-Commerce Platform

A production-ready, scalable e-commerce platform built with Next.js 14, Supabase, and Tailwind CSS. Designed to be resold to multiple retail stores with complete data isolation and customizable storefronts.

## 🚀 Features

### Multi-Tenant Architecture
- Complete data isolation per store
- Subdomain-based store identification
- Scalable infrastructure ready for hundreds of stores

### Admin CMS (100% Code-Free)
- **Product Management**: Add/Edit/Delete products with rich descriptions
- **Pricing Matrix**: Separate cost price (internal) and selling price (public)
- **Inventory Control**: Real-time stock management with low-stock alerts
- **Category Management**: Organize products with custom categories
- **Store Customization**: 
  - Change store name
  - Update hero banner text
  - Customize primary colors (instant preview)
  - Upload logo
  - Manage layout sections

### Customer Storefront
- Beautiful, conversion-optimized UI
- Category-based product filtering
- Real-time stock status ("In Stock"/"Out of Stock" badges)
- Shopping cart with live updates
- Responsive design (mobile-first)
- Featured products highlighting

### Technical Stack
- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: React Hooks + Context
- **Styling**: Tailwind CSS with custom theming
- **Icons**: Lucide React

## 📦 Database Schema

### Core Tables
- `stores` - Multi-tenant store configuration
- `profiles` - User profiles with role-based access (admin/customer)
- `categories` - Product categorization
- `products` - Complete product management with pricing matrix
- `orders` - Order processing and tracking
- `order_items` - Individual order line items
- `carts` - Shopping cart management
- `cart_items` - Cart line items

### Key Features
- Row Level Security (RLS) for data isolation
- Automatic timestamp updates
- Optimized indexes for performance
- JSONB fields for flexible store settings

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (free tier works)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ecommerce-platform.git
cd ecommerce-platform
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Set Up Supabase

1. Create a new project on [Supabase](https://supabase.com)
2. Navigate to the SQL Editor
3. Run the migration file: `supabase/migrations/001_initial_schema.sql`
4. Get your project credentials:
   - Project URL
   - Anon/Public Key

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Seed Demo Data (Optional)

```sql
-- Insert a demo store
INSERT INTO stores (id, name, subdomain) VALUES 
('11111111-1111-1111-1111-111111111111', 'Demo Store', 'demo');

-- Insert demo products (example)
INSERT INTO products (store_id, name, slug, selling_price, cost_price, stock_quantity, status) VALUES
('11111111-1111-1111-1111-111111111111', 'Premium Headphones', 'premium-headphones', 99.99, 50.00, 100, 'active'),
('11111111-1111-1111-1111-111111111111', 'Wireless Mouse', 'wireless-mouse', 29.99, 15.00, 50, 'active'),
('11111111-1111-1111-1111-111111111111', 'USB-C Hub', 'usb-c-hub', 45.99, 22.00, 30, 'active');
```

### 6. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
ecommerce-platform/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin dashboard
│   │   ├── api/            # API routes
│   │   └── page.js         # Main entry
│   ├── components/
│   │   ├── admin/          # Admin CMS components
│   │   ├── storefront/     # Customer-facing components
│   │   └── common/         # Shared components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and Supabase client
│   └── styles/             # Global styles
├── supabase/
│   └── migrations/         # Database migrations
├── .env.local              # Environment variables
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Dependencies
```

## 🎨 Key Components

### Admin Panel Features
- **Product Table**: Sortable, filterable inventory with cost/selling price columns
- **Product Modal**: Create/Edit products with image management
- **Store Customization**: Real-time theme and content updates
- **Category Management**: Organize products efficiently

### Storefront Features
- **Hero Banner**: Dynamic content from store settings
- **Category Navigation**: Filter products by category
- **Product Cards**: Display images, prices, and stock status
- **Cart Drawer**: Slide-out cart with quantity management

## 🔒 Security

### Row Level Security (RLS)
All tables have RLS policies ensuring:
- Users can only access their store's data
- Role-based access control (admin vs customer)
- Secure authentication via Supabase Auth

### Authentication Flow
1. User signs up via Supabase Auth
2. Profile created with store association
3. Role assigned (admin/customer)
4. RLS policies enforce data access rules

## 📱 Responsive Design

- **Mobile-first** approach with Tailwind CSS
- **Product grid** adapts from 1 to 4 columns
- **Touch-optimized** buttons and interactions
- **Slide-in cart** drawer for mobile devices

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Manual Build
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@yourdomain.com or create an issue in the GitHub repository.

---

## 🎯 Future Roadmap

- [ ] Payment integration (Stripe, PayPal)
- [ ] Order management system
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Advanced product variants (size, color)
- [ ] Customer reviews and ratings
- [ ] Discount and coupon system
- [ ] Inventory alerts
- [ ] CSV import/export

## 🏆 Why This Platform?

1. **Multi-Tenant Ready**: Built from the ground up for multiple stores
2. **Admin Flexibility**: Full control without touching code
3. **Modern Stack**: Uses the latest Next.js and React features
4. **Performance Optimized**: Built for Vercel deployment
5. **Scalable**: PostgreSQL with proper indexing
6. **Secure**: RLS policies and authentication built-in
7. **Resellable**: White-label ready for your customers

---

**Built with ❤️ using Next.js, Supabase, and Tailwind CSS**