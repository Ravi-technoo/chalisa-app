# Hanuman Chalisa App - Backend API

Backend API for the Hanuman Chalisa devotional app with OTP authentication, content management, and payment integration.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Databases**: PostgreSQL (user data), MongoDB (content)
- **Authentication**: JWT + Twilio OTP
- **Storage**: Cloudflare R2
- **Payments**: Razorpay
- **Logging**: Winston

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the `.env.example` file to `.env` and configure all variables:

```bash
cp .env.example .env
```

Edit `.env` with your actual credentials:
- PostgreSQL connection details
- MongoDB URI
- Twilio credentials
- Cloudflare R2 credentials
- Razorpay keys
- JWT secret

### 3. Database Setup

Ensure PostgreSQL and MongoDB are running:

```bash
# PostgreSQL (create database)
createdb chalisa_app

# MongoDB should be running on default port 27017
```

### 4. Run the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

Base URL: `http://localhost:5000/api/v1`

### Authentication
- `POST /auth/request-otp` - Request OTP
- `POST /auth/verify-otp` - Verify OTP & login

### Profile
- `GET /profile/me` - Get user profile
- `PUT /profile/update` - Update profile
- `POST /profile/role/update` - Update user role (Admin only)

### Content
- `GET /content/list` - List all content
- `GET /content/:id` - Get content by ID
- `POST /content/create` - Create content (Pandit/Admin)
- `PUT /content/update/:id` - Update content (Pandit/Admin)
- `DELETE /content/delete/:id` - Delete content (Pandit/Admin)

### Payment
- `POST /payment/initiate` - Initiate payment
- `POST /payment/verify` - Verify payment

### Upload
- `POST /upload/sign-url` - Get signed upload URL for R2

### Health
- `GET /health` - Health check

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middlewares/     # Custom middlewares
│   ├── models/          # Database models
│   │   ├── postgres/    # PostgreSQL models
│   │   └── mongodb/     # MongoDB models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Helper functions
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
├── logs/                # Log files
├── .env.example         # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## Development

### Linting
```bash
npm run lint
npm run lint:fix
```

### Formatting
```bash
npm run format
```

### Testing
```bash
npm test
```

## Roles & Permissions

- **USER**: Read content, set reminders, unlock premium
- **PANDIT**: All USER permissions + CRUD content
- **ADMIN**: All permissions + manage user roles

## Security Features

- JWT-based authentication
- Rate limiting on sensitive endpoints
- OTP with TTL (5 minutes)
- HTTPS enforcement in production
- CORS configuration
- Helmet security headers
- Input validation

## License

ISC
