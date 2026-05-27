# CocoBongo - Premium Nightlife Web Application

A modern, production-ready web application for a luxury nightlife and entertainment business. Built with React, Next.js, TailwindCSS, and Supabase.

## 🎯 Features

### Pages
- **Home Page**: Cinematic hero, upcoming events, VIP experience section, testimonials
- **Events Page**: Upcoming events with filtering, ticket availability, performer details
- **Reservation System**: Premium booking flow with table type selection (Standard, VIP, Ultra VIP)
- **Gallery**: Responsive photo & video gallery with lightbox
- **Contact Page**: Location, hours, contact form, WhatsApp integration, embedded maps
- **Admin Dashboard**: Manage reservations, events, and gallery (password protected)

### Core Features
- ✨ Premium luxury design with gold accents and neon elements
- 📱 Mobile-first responsive design
- 🎬 Smooth animations with Framer Motion
- 🗄️ Supabase backend integration
- 🔐 Admin authentication
- 📧 Reservation notifications
- 💬 WhatsApp integration
- 🎨 Modern dark theme with gradient effects
- ⚡ Fast performance optimized
- 🔍 SEO-friendly metadata

## 🛠️ Tech Stack

- **Frontend**: React 19, Next.js 16
- **Styling**: TailwindCSS 4, Framer Motion
- **Backend**: Supabase (PostgreSQL)
- **Deployment**: Vercel-ready
- **Language**: TypeScript

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Environment variables configured

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at [https://supabase.com](https://supabase.com)
2. Go to the SQL Editor and run the schema from `supabase/schema.sql`
3. Copy your project URL and anon key

### 3. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
cocobongo/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx       # Navigation header
│   │   └── Footer.tsx       # Footer component
│   ├── lib/
│   │   └── supabase.ts      # Supabase client & helpers
│   ├── dashboard/           # Admin dashboard
│   ├── events/              # Events page
│   ├── gallery/             # Gallery page
│   ├── reserve/             # Reservation page
│   ├── contact/             # Contact page
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── styles/
│   └── globals.css          # Global styles & animations
├── public/                  # Static assets
├── supabase/
│   └── schema.sql           # Database schema
├── tailwind.config.js       # TailwindCSS config
├── next.config.js           # Next.js config
└── package.json             # Dependencies
```

## 🗄️ Database Schema

### Reservations
- `id` (UUID): Primary key
- `full_name` (VARCHAR): Guest name
- `phone` (VARCHAR): Contact phone
- `email` (VARCHAR): Email address
- `date` (DATE): Reservation date
- `time` (TIME): Reservation time
- `guests` (INTEGER): Number of guests
- `table_type` (VARCHAR): standard, vip, or ultra_vip
- `notes` (TEXT): Special requests
- `status` (VARCHAR): pending, confirmed, or cancelled

### Events
- `id` (UUID): Primary key
- `title` (VARCHAR): Event name
- `description` (TEXT): Event details
- `date` (DATE): Event date
- `time` (TIME): Event time
- `performer` (VARCHAR): DJ/Performer name
- `image_url` (VARCHAR): Event image
- `tickets_available` (INTEGER): Regular ticket count
- `vip_available` (INTEGER): VIP ticket count
- `ticket_price` (DECIMAL): Regular ticket price
- `vip_price` (DECIMAL): VIP ticket price

### Gallery
- `id` (UUID): Primary key
- `title` (VARCHAR): Item title
- `image_url` (VARCHAR): Image URL
- `video_url` (VARCHAR): Video URL
- `type` (VARCHAR): photo or video

## 🎨 Design System

### Colors
- **Primary Gold**: `#D4AF37`
- **Dark Background**: `#0A0E27`
- **Dark Card**: `#1A1F3A`
- **Neon Purple**: `#9D4EDD`
- **Neon Pink**: `#FF006E`

### Typography
- **Display Font**: Poppins (headings)
- **Body Font**: Inter (body text)

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly interface
- Optimized mobile navigation

## 🔐 Admin Dashboard

Access the admin dashboard at `/dashboard`:
- **Password**: Configured in `.env.local`
- **Features**:
  - View and manage reservations
  - Confirm or cancel bookings
  - Add/edit events
  - Manage gallery items
  - View basic analytics

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
npm run build
npm run start
```

### Vercel Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
NEXT_PUBLIC_ADMIN_PASSWORD=your_password
```

## 📊 Performance Tips

- Use image optimization with Next.js Image component
- Enable Vercel Analytics for monitoring
- Implement caching strategies
- Minify and compress assets
- Use CDN for media files (Supabase Storage)

---

Built with ❤️ for CocoBongo. Premium nightlife experience.
