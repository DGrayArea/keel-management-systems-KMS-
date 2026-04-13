# KEEL Management Systems (KMS)

KEEL is a powerful, modular management platform designed to unify the core operations of diverse organizational types—ranging from logistics and hotels to schools and hospitals—under one roof.

## Core Architecture

The system operates around a central "Core Shell" that handles:
- **Authentication & Authorization** (NextAuth with Role-based access control).
- **Module Selector & Shared Layouts**.
- **Audit Logging** and global settings.
- **Multi-Tenant / Multi-Organization access**.

## Domain Modules

KMS is built in phases to support domain-specific workflows:

1. **🚚 Logistics:** Shipment tracking, driver/vehicle rosters, and real-time route logging.
2. **🏨 Hotel:** Room management, guest bookings, check-in/checkout, and invoicing.
3. **📦 Inventory:** Product catalog, stock movement, suppliers, and low-inventory alerts.
4. **🎓 School:** Student records, attendance, fees, and performance results.
5. **🏥 Hospital / Clinic:** Patient profiles, appointments, consultation notes, and pharmacy/dispensary management.
6. **💰 Finance & Accounting:** Cross-module billing, income/expenses logging, chart of accounts, and budgeting.
7. **👥 HR & Payroll:** Employee records, leave management, appraisals, and monthly payroll processing.

## Tech Stack

The architecture is carefully chosen for type safety, performance, and expandability:
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** NextAuth.js v5
- **UI Components:** shadcn/ui + Tailwind CSS
- **State Management:** Zustand (Client State), React Query (Server State + Caching)
- **File Uploads:** Uploadthing or Cloudinary
- **Email:** Resend or Nodemailer
- **PDF Generation:** react-pdf or Puppeteer
- **Desktop Wrap:** Electron (via `next-electron-server`)

## Directory Structure Overview

The `app/` folder leverages Next.js Route Groups to cleanly separate the Admin interface from Client Portals:

```text
app/
  (core)/             ← login, module selector, root settings
  (admin)/
    hotel/            ← hotel admin dashboard
    logistics/        ← logistics admin
    school/           ← school admin
    inventory/
    hospital/
    finance/
    hr/
  (portal)/
    hotel/            ← guest self-service
    logistics/        ← shipment tracker
    school/           ← student/parent portal
    hospital/         ← patient portal
```

## Getting Started

First, install dependencies and run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the live application.
