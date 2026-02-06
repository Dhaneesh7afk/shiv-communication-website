# Project Status

## Admin shell + access
- Sticky sidebar + top bar actions in admin shell; glass effect preserved.
- Admin login under `app/admin/(auth)`; admin routes under `app/admin/(dashboard)`.
- Site navbar, footer, and mobile sticky bar hidden when admin is logged in.

## Orders
- Status enum expanded: CREATED, PAID (displayed as RECEIVED), PACKED, READY, DELIVERED, CANCELLED, FAILED.
- Transition rules enforced in API (`lib/order-status.ts`).
- Order detail page shows customer info and payment tracking with auto-refresh.
- Razorpay webhook + sync endpoints update status and refund state.
- Orders list shows order status + payment status pills; bulk sync runs every 45s.
- Status dropdown only shows valid next transitions; cancel triggers refund prompt with Razorpay link.

## Payments / refunds
- Payment status auto-updates when captured.
- Refund status tracked (`payment.refundStatus`) and shown on order detail.
- Bulk sync endpoints: `/api/orders/sync` and `/api/orders/[id]/sync`.

## Products
- Edit flow added: `/admin/products/[id]` with prefilled form.
- Active toggle persists; inactive products hidden from users but visible in admin list with "Hidden" badge.
- Product list shows low-stock + active/hidden badges; edit replaces disable.
- Product images preview in forms; edit uses a small "Saved just now" indicator.
- Product API GET returns all for admins, only active for users.

## Used phones
- Inventory page has stats + filters + availability-only toggle.
- Mobile layout uses card view; table remains for larger screens.
- Add/edit dialog constrained for mobile with scroll.
- Phone form includes image preview + refined layout.

## Customers
- Auto-derived from orders (no signup).
- `/admin/customers` list with LTV, order count, last order.
- Customer detail page shows profile + order history; order cards link to order detail.

## Analytics
- `/admin/analytics` with lightweight metrics and 7-day order/revenue lists.
- MongoDB aggregations only (no heavy chart library).

## UI / UX polish
- Consistent card styling, badges, and micro-interactions.
- Removed double-border look in forms; improved spacing.
- Added blurred pills for shop "In Stock" badge.

## Notes
- Mongoose dev model reset added for Order and Customer models.
- Admin uses `Providers` wrapper to keep `CartContext` client-only.
