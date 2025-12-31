# Hanuman Chalisa App - Complete Full Stack Application

A comprehensive devotional app for Hanuman Chalisa with multi-language support, audio playback, and premium content unlock features.

## Project Overview

This is a complete full-stack application with:
- **Backend**: Node.js + Express REST API
- **Frontend**: React.js Progressive Web App (PWA)
- **Databases**: PostgreSQL (user data) + MongoDB (content)
- **Authentication**: OTP-based login via Twilio
- **Storage**: Cloudflare R2 for media files
- **Payments**: Razorpay (₹10 one-time unlock)

## Features

### User Features
- OTP-based authentication (no password)
- Browse Hanuman Chalisa & Aarti in 12+ languages
- Audio playback with synchronized text
- Read verse meanings and translations
- Set reminders for morning/evening prayers
- Offline mode via PWA
- One-time ₹10 payment for premium content

### Pandit Features
- All user features
- Create, edit, and delete devotional content
- Upload audio files to Cloudflare R2
- Add translations and meanings

### Admin Features
- All pandit features
- Manage user roles
- Promote users to Pandit role
- Full content management

## Project Structure

```
Chalisa App/
├── backend/               # Node.js REST API
│   ├── src/
│   │   ├── config/        # Database & service configs
│   │   ├── controllers/   # Route handlers
│   │   ├── middlewares/   # Auth, error handling, rate limiting
│   │   ├── models/        # PostgreSQL & MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic (Twilio, R2)
│   │   ├── utils/         # Helper functions
│   │   ├── app.js         # Express app
│   │   └── server.js      # Entry point
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── front-end/             # React PWA
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── i18n/          # Translations (hi, en)
│   │   ├── pages/         # Page components
│   │   ├── services/      # API client
│   │   ├── store/         # Redux state management
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── doc-prd/               # Product documentation
│   ├── Digital Hanuman Chalisa App.pdf
│   ├── PRD-HanumanChalisaApp.pdf
│   └── Overall Architecture (HLD).pdf
│
└── README.md              # This file
```

## Quick Start

### Prerequisites

- Node.js (v18+)
- PostgreSQL (v14+)
- MongoDB (v6+)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

```bash
cd front-end
npm install
cp .env.example .env
# Edit .env with backend URL
npm start
```

Frontend will run on `http://localhost:3000`

## Environment Configuration

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Databases
POSTGRES_HOST=localhost
POSTGRES_DB=chalisa_app
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
MONGODB_URI=mongodb://localhost:27017/chalisa_content

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

# Twilio (for OTP)
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_number

# Cloudflare R2
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=chalisa-app

# Razorpay
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_secret
```

### Frontend (.env)
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api/v1
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
REACT_APP_DEFAULT_LANGUAGE=hi
```

## API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Key Endpoints

#### Authentication
- `POST /auth/request-otp` - Request OTP for login
- `POST /auth/verify-otp` - Verify OTP and get JWT token

#### Profile
- `GET /profile/me` - Get current user profile
- `PUT /profile/update` - Update profile

#### Content
- `GET /content/list` - List all content (with filters)
- `GET /content/:id` - Get content by ID
- `POST /content/create` - Create content (Pandit/Admin)
- `PUT /content/update/:id` - Update content
- `DELETE /content/delete/:id` - Delete content

#### Payment
- `POST /payment/initiate` - Initiate Razorpay payment
- `POST /payment/verify` - Verify payment

#### Upload
- `POST /upload/sign-url` - Get signed URL for R2 upload

## Database Schemas

### PostgreSQL Tables
- **users**: User profiles, roles, unlock status
- **otp_verification**: OTP storage with TTL
- **payments**: Transaction records
- **reminders**: User reminder settings

### MongoDB Collections
- **content**: Devotional content (Aarti, Chalisa) with multi-language support

## Deployment

### Backend Deployment Options
- AWS EC2 / ECS
- Render
- Railway
- Cloudflare Workers

### Frontend Deployment Options
- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront

### Database Hosting
- PostgreSQL: AWS RDS, Supabase, Railway
- MongoDB: MongoDB Atlas

## Technology Stack

### Backend
- Node.js + Express.js
- PostgreSQL + Sequelize ORM
- MongoDB + Mongoose ODM
- JWT Authentication
- Twilio SMS API
- Cloudflare R2 SDK
- Razorpay SDK
- Winston Logger

### Frontend
- React 18
- Redux Toolkit
- React Router v6
- Material-UI
- i18next
- Axios
- Workbox (PWA)

## Security Features

- JWT-based authentication
- OTP verification with TTL (5 min)
- Rate limiting on sensitive endpoints
- HTTPS enforcement in production
- CORS configuration
- Input validation
- SQL injection prevention
- XSS protection via Helmet

## Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd front-end
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support

For issues and questions, please create an issue in the GitHub repository.

## License

ISC

---

**Built with ❤️ for devotional purposes**
