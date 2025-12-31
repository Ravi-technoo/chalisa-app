# Hanuman Chalisa App - Frontend

React-based Progressive Web Application for the Hanuman Chalisa devotional app.

## Features

- OTP-based authentication
- Multi-language support (Hindi, English)
- Content browsing and playback
- Audio player for devotional content
- Offline support via PWA
- Payment integration with Razorpay
- Role-based content management (User/Pandit/Admin)
- Responsive design with Material-UI

## Tech Stack

- React 18
- Redux Toolkit (State Management)
- React Router (Routing)
- Material-UI (UI Components)
- i18next (Internationalization)
- Axios (HTTP Client)
- Workbox (PWA/Service Worker)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Configure the following variables:
- `REACT_APP_API_BASE_URL`: Backend API URL
- `REACT_APP_RAZORPAY_KEY_ID`: Razorpay key for payments
- `REACT_APP_DEFAULT_LANGUAGE`: Default app language (hi/en)

### 3. Run the Application

Development mode:
```bash
npm start
```

The app will run on `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Project Structure

```
front-end/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── service-worker.js
├── src/
│   ├── components/        # Reusable components
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   └── PrivateRoute.jsx
│   ├── i18n/              # Internationalization
│   │   ├── locales/
│   │   │   ├── hi.json
│   │   │   └── en.json
│   │   └── index.js
│   ├── pages/             # Page components
│   │   ├── Auth/
│   │   │   └── Login.jsx
│   │   ├── Content/
│   │   │   ├── ContentList.jsx
│   │   │   ├── ContentDetail.jsx
│   │   │   └── ContentCreate.jsx
│   │   ├── Home.jsx
│   │   ├── Profile.jsx
│   │   └── Payment.jsx
│   ├── services/          # API services
│   │   └── api.js
│   ├── store/             # Redux store
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── contentSlice.js
│   │   │   └── uiSlice.js
│   │   └── index.js
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   └── serviceWorkerRegistration.js
├── package.json
└── README.md
```

## Available Scripts

- `npm start` - Run development server
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Key Features Implementation

### Authentication
- Phone number + OTP login
- JWT token storage
- Protected routes

### Multi-language Support
- Language switcher in navbar
- Translation files for Hindi & English
- Persisted language preference

### Content Management
- Browse devotional content
- Audio playback
- Show/hide meanings
- Create/Edit content (Pandit/Admin only)

### Payment Integration
- Razorpay integration for ₹10 unlock
- One-time payment verification
- Premium content access control

### PWA Features
- Offline support
- App installation prompt
- Service worker caching
- Responsive design

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the build/ folder to Netlify
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC
