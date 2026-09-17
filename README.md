# SOLEVA — Premium Footwear E-Commerce

A production-style e-commerce storefront for a premium sneaker brand, built with React, TypeScript, Tailwind CSS, and React Router.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## What's included

- **Homepage** — announcement bar, hero, shop-by-category, trending products, new arrivals, brand story, best seller spotlight, testimonials, newsletter signup.
- **Shop page** — search-driven navigation, filters (category, gender, price, size, color, rating), sorting, "load more" pagination, loading skeletons, and an empty state.
- **Product page** — image gallery with zoom, color/size selectors, quantity picker, add to cart, buy now, wishlist, size guide modal, specs, reviews, and recommended products.
- **Cart** — slide-in drawer and a full cart page, with quantity controls, promo code (`SOLEVA10` for 10% off), and order summary.
- **Checkout** — shipping/payment form with an order confirmation state.
- **Wishlist** — saved products page.
- Reusable components: `Navbar`, `ProductCard`, `ProductGrid`, `ProductFilters`, `Hero`, `CategoryCard`, `ReviewCard`, `CartDrawer`, `Footer`, `Button`, `Modal`, `Toast`, `StarRating`.
- Toast notifications, keyboard-accessible modals/drawers, focus-visible states, and `prefers-reduced-motion` support.

## Notes

- Product imagery is sourced from Unsplash placeholder URLs — swap in your own product photography under `src/data/products.ts` before launch.
- Cart, wishlist, and checkout state are held in memory (React context) and reset on page reload; wire up a backend/persistence layer for production use.
