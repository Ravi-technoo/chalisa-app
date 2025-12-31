# Project Structure

Complete file structure for the Hanuman Chalisa App

```
Chalisa App/
│
├── backend/                                    # Backend API Server
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js                    # PostgreSQL & MongoDB connections
│   │   │   └── r2.js                          # Cloudflare R2 client config
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js              # OTP request/verify logic
│   │   │   ├── contentController.js           # Content CRUD operations
│   │   │   ├── paymentController.js           # Razorpay payment handling
│   │   │   ├── profileController.js           # User profile management
│   │   │   └── uploadController.js            # R2 signed URL generation
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.js                        # JWT authentication middleware
│   │   │   ├── errorHandler.js                # Global error handler
│   │   │   └── rateLimiter.js                 # Rate limiting configs
│   │   │
│   │   ├── models/
│   │   │   ├── postgres/
│   │   │   │   ├── User.js                    # User model (Sequelize)
│   │   │   │   ├── OtpVerification.js         # OTP storage model
│   │   │   │   ├── Payment.js                 # Payment transactions
│   │   │   │   ├── Reminder.js                # User reminders
│   │   │   │   └── index.js                   # Model exports & associations
│   │   │   └── mongodb/
│   │   │       └── Content.js                 # Content model (Mongoose)
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js                  # /auth endpoints
│   │   │   ├── contentRoutes.js               # /content endpoints
│   │   │   ├── paymentRoutes.js               # /payment endpoints
│   │   │   ├── profileRoutes.js               # /profile endpoints
│   │   │   ├── uploadRoutes.js                # /upload endpoints
│   │   │   └── index.js                       # Route aggregator
│   │   │
│   │   ├── services/
│   │   │   ├── twilioService.js               # SMS/OTP via Twilio
│   │   │   └── r2Service.js                   # Cloudflare R2 operations
│   │   │
│   │   ├── utils/
│   │   │   ├── logger.js                      # Winston logger config
│   │   │   └── otpGenerator.js                # OTP generation utility
│   │   │
│   │   ├── app.js                             # Express app configuration
│   │   └── server.js                          # Server entry point
│   │
│   ├── logs/                                   # Log files (auto-generated)
│   ├── .env.example                            # Environment template
│   ├── .gitignore
│   ├── .eslintrc.json
│   ├── .prettierrc
│   ├── package.json
│   └── README.md
│
├── front-end/                                  # React Frontend
│   ├── public/
│   │   ├── index.html                         # HTML template
│   │   ├── manifest.json                      # PWA manifest
│   │   ├── service-worker.js                  # Service worker for offline
│   │   ├── favicon.ico
│   │   ├── logo192.png
│   │   └── logo512.png
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx                     # Main layout wrapper
│   │   │   ├── Navbar.jsx                     # Navigation bar
│   │   │   └── PrivateRoute.jsx               # Protected route wrapper
│   │   │
│   │   ├── i18n/
│   │   │   ├── locales/
│   │   │   │   ├── hi.json                    # Hindi translations
│   │   │   │   └── en.json                    # English translations
│   │   │   └── index.js                       # i18n configuration
│   │   │
│   │   ├── pages/
│   │   │   ├── Auth/
│   │   │   │   └── Login.jsx                  # OTP login page
│   │   │   ├── Content/
│   │   │   │   ├── ContentList.jsx            # Content listing page
│   │   │   │   ├── ContentDetail.jsx          # Content player/reader
│   │   │   │   └── ContentCreate.jsx          # Create/edit content
│   │   │   ├── Home.jsx                       # Home dashboard
│   │   │   ├── Profile.jsx                    # User profile page
│   │   │   └── Payment.jsx                    # Payment/unlock page
│   │   │
│   │   ├── services/
│   │   │   └── api.js                         # Axios API client
│   │   │
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js               # Auth state & actions
│   │   │   │   ├── contentSlice.js            # Content state & actions
│   │   │   │   └── uiSlice.js                 # UI state (language, etc)
│   │   │   └── index.js                       # Redux store config
│   │   │
│   │   ├── App.js                             # Main App component
│   │   ├── index.js                           # React entry point
│   │   ├── index.css                          # Global styles
│   │   └── serviceWorkerRegistration.js       # PWA registration
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
├── doc-prd/                                    # Project Documentation
│   ├── Digital Hanuman Chalisa App.pdf
│   ├── PRD-HanumanChalisaApp.pdf
│   └── Overall Architecture (HLD).pdf
│
├── setup.sh                                    # Quick setup script
├── PROJECT_STRUCTURE.md                        # This file
└── README.md                                   # Main documentation
```

## Key Files Description

### Backend

| File | Purpose |
|------|---------|
| `src/server.js` | Application entry point, starts Express server |
| `src/app.js` | Express app setup with middleware |
| `src/config/database.js` | Database connection configuration |
| `src/models/postgres/User.js` | User data model with roles |
| `src/models/mongodb/Content.js` | Devotional content model |
| `src/controllers/authController.js` | OTP authentication logic |
| `src/middlewares/auth.js` | JWT verification & role-based access |
| `src/services/twilioService.js` | SMS sending via Twilio |
| `src/services/r2Service.js` | File upload to Cloudflare R2 |

### Frontend

| File | Purpose |
|------|---------|
| `src/index.js` | React app entry point |
| `src/App.js` | Main app component with routing |
| `src/store/index.js` | Redux store configuration |
| `src/services/api.js` | Axios HTTP client with interceptors |
| `src/pages/Auth/Login.jsx` | OTP-based login UI |
| `src/pages/Home.jsx` | Dashboard with content preview |
| `src/pages/Content/ContentDetail.jsx` | Audio player & text reader |
| `src/i18n/index.js` | Multi-language configuration |
| `public/manifest.json` | PWA configuration |

## Technology Mapping

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                        │
│  React + Redux + Material-UI + i18next + Workbox       │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                      API LAYER                          │
│    Express.js REST API + JWT Auth + Rate Limiting      │
└─────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────┬────────────────────┬─────────────────┐
│   DATA LAYER     │   SERVICES LAYER   │  STORAGE LAYER  │
│                  │                    │                 │
│  PostgreSQL      │   Twilio SMS      │  Cloudflare R2  │
│  (User data)     │   (OTP)           │  (Media files)  │
│                  │                    │                 │
│  MongoDB         │   Razorpay        │                 │
│  (Content)       │   (Payments)      │                 │
└──────────────────┴────────────────────┴─────────────────┘
```

## API Endpoint Structure

```
/api/v1
├── /auth
│   ├── POST /request-otp
│   └── POST /verify-otp
├── /profile
│   ├── GET /me
│   ├── PUT /update
│   └── POST /role/update (Admin)
├── /content
│   ├── GET /list
│   ├── GET /:id
│   ├── POST /create (Pandit/Admin)
│   ├── PUT /update/:id (Pandit/Admin)
│   └── DELETE /delete/:id (Pandit/Admin)
├── /payment
│   ├── POST /initiate
│   └── POST /verify
└── /upload
    └── POST /sign-url
```

## Database Schema Overview

### PostgreSQL

```
users
├── id (UUID, PK)
├── phone (VARCHAR)
├── role (ENUM: USER|PANDIT|ADMIN)
├── name
├── profile_image_url
├── language_pref
├── is_unlocked (BOOLEAN)
└── created_at, updated_at

otp_verification
├── id (UUID, PK)
├── phone
├── otp_hash
└── expires_at

payments
├── id (UUID, PK)
├── user_id (FK → users)
├── amount
├── transaction_ref
├── status (ENUM: PENDING|SUCCESS|FAILED)
└── razorpay_* fields

reminders
├── id (UUID, PK)
├── user_id (FK → users)
├── time
└── type (ENUM: morning|evening)
```

### MongoDB

```
content
├── _id (ObjectId)
├── type (aarti|chalisa)
├── title
├── language
├── bodyText
├── meaningText
├── audioUrl
├── imageUrl
├── createdBy (user_id)
├── isPremium (Boolean)
└── timestamps
```

## Component Hierarchy (Frontend)

```
App
├── BrowserRouter
│   ├── Routes
│   │   ├── /login → Login
│   │   └── / → PrivateRoute → Layout
│   │       ├── Navbar
│   │       └── Outlet
│   │           ├── / → Home
│   │           ├── /content → ContentList
│   │           ├── /content/:id → ContentDetail
│   │           ├── /content/create → ContentCreate
│   │           ├── /profile → Profile
│   │           └── /payment → Payment
│   └── ToastContainer
```

## State Management (Redux)

```
Redux Store
├── auth
│   ├── user (object)
│   ├── token (string)
│   ├── isAuthenticated (boolean)
│   └── loading, error
├── content
│   ├── list (array)
│   ├── currentContent (object)
│   ├── pagination
│   └── loading, error
└── ui
    ├── language (hi|en)
    ├── showMeaning (boolean)
    └── isPlaying, currentAudioUrl
```
