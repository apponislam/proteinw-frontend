# ProteinW - Nordic Fundraising Platform

A modern fundraising platform built with Next.js 16, designed to help schools, teams, and organizations raise funds through product sales.

## 🚀 Tech Stack

- **Framework**: Next.js 16.2.4
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit + Redux Persist
- **Form Handling**: React Hook Form + Zod
- **UI Components**: shadcn/ui, Radix UI, Lucide Icons
- **Rich Text Editor**: Jodit React
- **Animations**: tw-animate-css

## 📁 Project Structure

```
proteinw-frontend/
├── app/
│   ├── (auth)/              # Authentication routes
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   ├── verify-code/
│   │   │   ├── create-password/
│   │   │   └── reset-successful/
│   │   └── layout.tsx
│   ├── (dashboard)/         # Dashboard routes
│   │   ├── dashboard/
│   │   │   ├── admins/
│   │   │   ├── campaigns/
│   │   │   ├── groups/
│   │   │   ├── orders/
│   │   │   ├── products/
│   │   │   ├── profit-rules/
│   │   │   ├── sellers/
│   │   │   ├── seller/
│   │   │   ├── storefront/
│   │   │   └── team-sales/
│   │   └── layout.tsx
│   ├── (root)/              # Public pages
│   │   ├── about-us/
│   │   ├── products/
│   │   ├── profit/
│   │   ├── sell-with-us/
│   │   ├── privacy-policy/
│   │   └── terms-of-service/
│   ├── (store)/             # Store routes
│   │   └── store/
│   ├── layout.tsx
│   ├── globals.css
│   └── not-found.tsx
├── components/
│   ├── about-us/
│   ├── dashboard/
│   │   ├── Seller/
│   │   ├── SellerAdmin/
│   │   └── SuperAdmin/
│   ├── home/
│   ├── products/
│   ├── profit/
│   ├── sell-with-us/
│   ├── ui/                   # shadcn/ui components
│   ├── Footer.tsx
│   └── header.tsx
├── redux/
│   ├── api/
│   ├── features/
│   │   └── auth/
│   ├── hooks.ts
│   └── store.ts
├── hooks/
├── lib/
├── providers/
├── public/
└── utils/
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (latest LTS recommended)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3030`

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Key Features

### User Roles

1. **Super Admin** - Full platform management
   - Manage admins, sellers, products, campaigns
   - View orders and profit rules
   - Monitor platform performance

2. **Seller Admin** - Team/group management
   - Manage their own groups
   - Track team sales
   - Manage storefront

3. **Seller** - Individual seller
   - View and join campaigns
   - Track personal sales
   - Access fundraising targets

### Authentication Flow

- User Registration with profession selection (Leader, Teacher, Parent, Coach)
- Email/Password Login
- Forgot Password with email verification
- OTP Verification (6-digit code)
- Password Reset

### Dashboard Features

- **Campaign Management** - Create and track fundraising campaigns
- **Product Management** - Add and edit products
- **Order Tracking** - Monitor sales and orders
- **Group Management** - Create and manage seller groups
- **Profit Rules** - Define profit distribution rules
- **Analytics** - Real-time performance dashboards

## 📝 Form Validation

All forms use **React Hook Form + Zod** for validation:

- **Registration**: Full name, email, phone, organization, group, profession, password, terms
- **Login**: Email, password, remember me
- **Forgot Password**: Email validation
- **Verify Code**: 6-digit code validation
- **Create Password**: Password matching (min 8 characters)

## 🎯 Design System

### Colors

- Primary: `#7C5800` to `#FFB800` gradient
- Secondary: `#D97706`
- Accent: `#EFAC02`
- Background: `#FFDEA8` (hover state)
- Text: `#1A1C1C`, `#271900`, `#78716C`

### Typography

- Inter/Geist font family
- Responsive text sizing
- Clear hierarchy from H1 to body

## 🔧 Configuration

### Development Server

Configured to run on port 3030 and listen on all interfaces:

```bash
npm run dev  # next dev -H 0.0.0.0 -p 3030
```

### Allowed Dev Origins

- `10.10.7.24`
- `fundraising.apponislam.top`
- `198.41.192.7`

## 📦 Dependencies

### Core

- `next` ^16.2.4
- `react` ^19.2.4
- `react-dom` ^19.2.4

### State Management

- `@reduxjs/toolkit` ^2.11.2
- `react-redux` ^9.2.0
- `redux-persist` ^6.0.0

### Forms & Validation

- `react-hook-form` ^7.75.0
- `@hookform/resolvers` ^5.2.2
- `zod` ^4.4.3

### UI Components

- `lucide-react` ^1.14.0
- `radix-ui` ^1.4.3
- `shadcn` ^4.6.0
- `class-variance-authority` ^0.7.1
- `clsx` ^2.1.1
- `tailwind-merge` ^3.5.0

### Rich Text

- `jodit` ^4.12.2
- `jodit-react` ^5.3.21

### Animations

- `tw-animate-css` ^1.4.0

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 📞 Support

For support, contact:
- Email: hello@nordicarchive.fund
- Phone: +46 (0) 8 123 45 67

---

**Built with ❤️ for Nordic fundraising**
