# Hanuman Chalisa App - Quick Start Guide

## ✅ Prerequisites Met
- ✓ PostgreSQL 18 running on port 5433
- ✓ MongoDB running on port 27017
- ✓ Database `chalisa_app` created
- ✓ Backend dependencies installed
- ✓ Environment files configured

## 🚀 Starting the Application

### Step 1: Start Backend Server

Open a new terminal and run:

```bash
cd "/Users/ravikumar/Desktop/work-stations/Chalisa App/backend"
node src/server.js
```

You should see:
```
🚀 Server is running on http://localhost:5000
📚 API: http://localhost:5000/api/v1
```

**Keep this terminal running!**

### Step 2: Install Frontend Dependencies

Open a **new terminal** and run:

```bash
cd "/Users/ravikumar/Desktop/work-stations/Chalisa App/front-end"
npm install
```

### Step 3: Start Frontend

In the same frontend terminal:

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 🔐 Testing Login/Signup

1. Open the app at `http://localhost:3000`
2. You'll see the login screen
3. Enter any Indian phone number (e.g., `9876543210`)
4. Click "Send OTP"
5. **Check the backend terminal** - you'll see the OTP printed like:
   ```
   🔐 OTP for 9876543210: 123456
   ```
6. Enter the OTP shown in the terminal
7. Click "Verify OTP"
8. You're logged in! 🎉

## 📱 Application Features

### For All Users:
- Browse Hanuman Chalisa and Aarti content
- Play audio devotional content
- Read text with meanings
- Switch languages (Hindi/English)
- Profile management

### Testing Different Roles:

**To become a PANDIT** (can create content):
1. Login as a normal user
2. In the backend, manually update your role:
```bash
# Open PostgreSQL
psql -h localhost -p 5433 -U ravikumar -d chalisa_app

# Update role
UPDATE users SET role = 'PANDIT' WHERE phone = '9876543210';
\q
```
3. Logout and login again
4. Now you can create/edit content!

**To become an ADMIN**:
```sql
UPDATE users SET role = 'ADMIN' WHERE phone = '9876543210';
```

## 🛠️ Troubleshooting

### Backend won't start:
```bash
# Kill any process on port 5000
lsof -ti:5000 | xargs kill -9

# Try again
cd backend
node src/server.js
```

### Frontend errors:
```bash
# Clear cache and reinstall
cd front-end
rm -rf node_modules package-lock.json
npm install
npm start
```

### Can't see OTP:
- Make sure the backend terminal is visible
- The OTP will be printed in **GREEN** with a lock emoji 🔐

### Database connection errors:
```bash
# Check PostgreSQL
psql -h localhost -p 5433 -U ravikumar -d chalisa_app -c "SELECT 1;"

# Check MongoDB
mongosh --eval "db.version()"
```

## 📡 API Endpoints

Base URL: `http://localhost:5000/api/v1`

### Test APIs with curl:

**Health Check:**
```bash
curl http://localhost:5000/api/v1/health
```

**Request OTP:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/request-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210"}'
```

**Verify OTP:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210", "otp":"123456"}'
```

## 📝 Creating Sample Content

After logging in as a PANDIT, you can create content through the UI, or insert directly:

```bash
mongosh

use chalisa_content

db.content.insertOne({
  type: "chalisa",
  title: "Hanuman Chalisa",
  language: "hi",
  bodyText: "दोहा\nश्रीगुरु चरन सरोज रज, निजमन मुकुर सुधारि\nवरनऊं रघुवर बिमल जसु, जो दायक फल चारि",
  meaningText: "श्री गुरु महाराज के चरण कमलों की धूलि से अपने मन रूपी दर्पण को पवित्र करके...",
  isPremium: false,
  isActive: true,
  createdBy: "system"
})
```

## 🎨 UI Features

### Login Screen
- Clean, simple OTP-based authentication
- No password required
- Auto-resend OTP timer
- Material-UI design

### Home Dashboard
- Browse all content
- Quick play buttons
- Language selector in navbar
- Premium unlock CTA

### Content Player
- Audio playback controls
- Synchronized text display
- Show/hide meanings
- Responsive design

## 📊 Database Schema

**Users Table (PostgreSQL):**
- id, phone, name, role, is_unlocked
- Roles: USER, PANDIT, ADMIN

**Content Collection (MongoDB):**
- type (aarti/chalisa)
- title, language, bodyText, meaningText
- audioUrl, isPremium

## 🔒 Security Notes

- OTP expires in 5 minutes
- JWT tokens valid for 7 days
- Rate limiting enabled (100 requests/15min)
- In development mode, OTP is printed to console
- In production, integrate real Twilio credentials

## 🎯 Next Steps

1. Add real Twilio credentials for SMS OTP
2. Add Cloudflare R2 credentials for file uploads
3. Add Razorpay credentials for payments
4. Add more devotional content
5. Deploy to production

## 📞 Support

If you encounter issues:
1. Check both terminal outputs (backend & frontend)
2. Verify databases are running
3. Clear browser cache
4. Restart both servers

---

**Happy Coding! May Lord Hanuman bless your development journey! 🙏**
