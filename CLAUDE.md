# CocoBongo Development Guide

## Project Overview

CocoBongo is a premium nightlife web application built with modern web technologies. This document outlines the project structure, development practices, and important guidelines.

## Architecture

### Tech Stack
- **Framework**: Next.js 16 (React 19)
- **Styling**: TailwindCSS 4 + Framer Motion
- **Backend**: Supabase (PostgreSQL)
- **Language**: TypeScript
- **Deployment**: Vercel

### Core Components

#### Pages
- `/` - Home page with hero, events, VIP section
- `/events` - Events listing and filtering
- `/reserve` - Reservation booking form
- `/gallery` - Photo & video gallery
- `/contact` - Contact information and inquiry form
- `/dashboard` - Admin panel (password protected)

#### Shared Components
- `Header` - Navigation with mobile menu
- `Footer` - Footer with links and social media

#### Libraries
- `lib/supabase.ts` - Database client and helper functions

### Database Schema

Tables: `reservations`, `events`, `gallery`, `users`

All tables have:
- UUID primary keys
- `created_at` and `updated_at` timestamps
- RLS (Row Level Security) enabled

See `supabase/schema.sql` for complete schema.

## Development Workflow

### Environment Setup
1. Copy `.env.local.example` to `.env.local`
2. Add Supabase credentials and admin password
3. Run `npm install`
4. Run `npm run dev`

### Code Style
- Use TypeScript for all new code
- Follow existing naming conventions (camelCase for vars/functions, PascalCase for components)
- Use Framer Motion for animations
- Leverage TailwindCSS utilities over custom CSS
- Keep components small and focused

### File Organization
- Page components in `app/[page]/page.tsx`
- Reusable components in `app/components/`
- Database logic in `app/lib/supabase.ts`
- Styles in `styles/globals.css` and TailwindCSS classes

## Design System

### Colors (tailwind.config.js)
- Gold: `#D4AF37` (primary brand color)
- Dark BG: `#0A0E27`
- Dark Card: `#1A1F3A`
- Neon Purple: `#9D4EDD`
- Neon Pink: `#FF006E`

### Animations
- `slide-up` - Entrance from bottom
- `float` - Gentle vertical movement
- `pulse-glow` - Gold glow pulse effect

## Key Features to Maintain

1. **Mobile-First Design**: All pages must be mobile responsive
2. **Accessibility**: Use semantic HTML, alt text for images
3. **Performance**: Lazy load images, optimize bundles
4. **SEO**: Meta tags, OG images, structured data
5. **Security**: No secrets in code, use env vars, CORS headers

## Database Operations

### Supabase Helpers (lib/supabase.ts)

```typescript
// Reservations
supabaseHelpers.reservations.create(data)
supabaseHelpers.reservations.getAll()
supabaseHelpers.reservations.update(id, data)
supabaseHelpers.reservations.delete(id)

// Events
supabaseHelpers.events.create(data)
supabaseHelpers.events.getAll()

// Gallery
supabaseHelpers.gallery.create(data)
supabaseHelpers.gallery.getAll()
```

## Deployment

### To Vercel
1. Push changes to the designated branch
2. Vercel automatically deploys on push
3. Add environment variables in Vercel dashboard
4. Verify build completes successfully

### Build Command
```bash
npm run build
```

## Admin Dashboard

- Access at `/dashboard`
- Default password: Check `.env.local`
- Features: Manage reservations, events, gallery
- LocalStorage persists auth during session

## Common Tasks

### Adding a New Page
1. Create `app/[page]/page.tsx`
2. Import Header and Footer
3. Add page content with Framer Motion animations
4. Test mobile responsiveness

### Adding a Database Table
1. Add SQL to `supabase/schema.sql`
2. Create helper functions in `lib/supabase.ts`
3. Import and use in components

### Modifying Styles
1. Update colors in `tailwind.config.js`
2. Add animations to `keyframes` in config
3. Use TailwindCSS utilities in components
4. Global styles go in `styles/globals.css`

## Performance Checklist

- [ ] Images are optimized and lazy-loaded
- [ ] No console errors or warnings
- [ ] Page load < 3 seconds
- [ ] Mobile scores > 90 (Lighthouse)
- [ ] No unused packages
- [ ] CSS is minified
- [ ] JavaScript is code-split

## Security Checklist

- [ ] No API keys in code or comments
- [ ] Env variables for all secrets
- [ ] CORS properly configured
- [ ] Input validation on forms
- [ ] RLS enabled on Supabase tables
- [ ] Admin password is strong
- [ ] HTTPS on production

## Testing

Currently testing is manual. To add automated tests:
```bash
npm install --save-dev jest @testing-library/react
```

Then create `.test.tsx` files alongside components.

## Git Workflow

- Feature branches: `feature/description`
- Bug fixes: `fix/description`
- Main branch is production-ready
- Always write clear commit messages
- Create PRs for code review before merging

## Debugging

### Common Issues

**Supabase connection fails**
- Check NEXT_PUBLIC_SUPABASE_URL and KEY in env
- Verify Supabase project is active
- Check network tab in DevTools

**Styling issues**
- Clear `.next/` cache and rebuild
- Check TailwindCSS purge config
- Ensure classnames are correct

**Build errors**
- Run `npm run lint` to check for issues
- Check TypeScript errors: `npx tsc --noEmit`
- Clear node_modules and reinstall if needed

## Resources

- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
- TailwindCSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion/

## Maintenance

- Update dependencies monthly: `npm outdated`
- Monitor Vercel analytics
- Check Supabase logs for errors
- Review reservation inquiries regularly
- Test all forms and flows before deployment

---

Last Updated: 2024
