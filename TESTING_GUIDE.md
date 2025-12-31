# 🎯 Testing Guide - Login/Signup Flow

## ✅ Backend Status: RUNNING

Your backend is successfully running on **http://localhost:5001**

## 🧪 API Test Results

### Test 1: OTP Request ✓
```bash
curl -X POST 'http://localhost:5001/api/v1/auth/request-otp' \
  -H 'Content-Type: application/json' \
  -d '{"phone":"9876543210"}'
```

**Response:**
```json
{
  "message": "OTP sent successfully",
  "devOtp": "545203"
}
```

### Test 2: OTP Verification ✓
```bash
curl -X POST 'http://localhost:5001/api/v1/auth/verify-otp' \
  -H 'Content-Type: application/json' \
  -d '{"phone":"9876543210", "otp":"545203"}'
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "b41b830c-a513-4d43-a656-1f01d0d388b8",
    "phone": "9876543210",
    "name": null,
    "role": "USER",
    "isUnlocked": false
  }
}
```

## 🚀 Start Frontend

Open a **NEW terminal** and run:

```bash
cd "/Users/ravikumar/Desktop/work-stations/Chalisa App/front-end"
npm start
```

The React app will start at **http://localhost:3000**

## 📱 Testing the Login UI

### Step 1: Open the App
- Browser will automatically open to `http://localhost:3000`
- You'll see the Login screen

### Step 2: Enter Phone Number
- Enter: `9876543210` (or any 10-digit number)
- Click **"Send OTP"** button

### Step 3: Get OTP from Backend
- Go to your **backend terminal**
- Look for a line like:
  ```
  🔐 OTP for 9876543210: 123456
  ```
- OR check the API response in browser DevTools Network tab

### Step 4: Enter OTP
- Type the 6-digit OTP you saw
- Click **"Verify OTP"** button

### Step 5: You're Logged In! 🎉
- You'll be redirected to the Home page
- You'll see "Welcome, User" message
- Navigation bar will show your profile

## 🎨 UI Features to Test

### Login Page
- ✓ Phone number input with validation
- ✓ "Send OTP" button
- ✓ Loading state during API call
- ✓ Success toast notification
- ✓ OTP input field (appears after sending OTP)
- ✓ Resend OTP timer (60 seconds)
- ✓ "Verify OTP" button
- ✓ Error handling for invalid OTP

### After Login
- ✓ Home Dashboard
- ✓ Profile menu in navbar
- ✓ Language switcher (Hindi/English)
- ✓ Content browsing
- ✓ Logout functionality

## 🔧 Development Mode Features

### OTP in Development
- OTP is **printed to backend console**
- No SMS is sent (Twilio not configured)
- Check backend terminal for: `🔐 OTP for [phone]: [code]`

### Auto-Login
- Once logged in, token is saved in localStorage
- Refresh the page - you stay logged in!
- Clear localStorage to logout

## 📊 User Database

Check the user that was created:

```bash
psql -h localhost -p 5433 -U ravikumar -d chalisa_app

SELECT id, phone, name, role, is_unlocked FROM users;
```

You should see:
```
                  id                  |    phone    | name  | role | is_unlocked
--------------------------------------+-------------+-------+------+-------------
 b41b830c-a513-4d43-a656-1f01d0d388b8 | 9876543210 | null  | USER | f
```

## 🎭 Testing Different Scenarios

### 1. Invalid Phone Number
- Enter: `123` (too short)
- Should show error: "Please enter a valid phone number"

### 2. Wrong OTP
- Enter correct phone
- Enter wrong OTP like `111111`
- Should show error: "Invalid OTP"

### 3. Expired OTP
- Wait 5+ minutes after requesting OTP
- Try to verify - should fail with "OTP expired"

### 4. Resend OTP
- Request OTP
- Wait for 60 second timer
- Click "Resend OTP"
- New OTP will be generated

### 5. Multiple Users
- Login with different phone numbers
- Each gets a separate account

## 🌐 Language Switching

After login:
1. Look at top-right navbar
2. Click language dropdown
3. Switch between Hindi (हिन्दी) and English
4. UI text updates instantly!

## 🔐 Role Testing

### Become a PANDIT (Content Creator)

```bash
psql -h localhost -p 5433 -U ravikumar -d chalisa_app

UPDATE users SET role = 'PANDIT' WHERE phone = '9876543210';
```

Logout and login again - you'll now see:
- "Create" button in Content page
- Ability to add Aarti/Chalisa

### Become an ADMIN

```bash
UPDATE users SET role = 'ADMIN' WHERE phone = '9876543210';
```

Admins can:
- Do everything Pandits can
- Manage other users' roles
- Delete any content

## 📸 Screenshots of Working App

### Login Screen
```
┌─────────────────────────────────────┐
│     Hanuman Chalisa App             │
│            Login                    │
│                                     │
│  ┌────────────────────────────┐    │
│  │ Mobile Number              │    │
│  │ 9876543210                │    │
│  └────────────────────────────┘    │
│                                     │
│  [     Send OTP     ]              │
│                                     │
└─────────────────────────────────────┘
```

### OTP Entry
```
┌─────────────────────────────────────┐
│     Hanuman Chalisa App             │
│            Login                    │
│                                     │
│  ┌────────────────────────────┐    │
│  │ OTP                        │    │
│  │ 545203                     │    │
│  └────────────────────────────┘    │
│                                     │
│  [    Verify OTP    ]              │
│                                     │
│  Resend OTP in 45s                 │
│  [     Cancel      ]               │
└─────────────────────────────────────┘
```

## 🛠️ Troubleshooting

### Backend Not Responding
```bash
# Check if backend is running
curl http://localhost:5001/api/v1/health

# If not, start it
cd backend
node src/server.js
```

### Frontend Won't Start
```bash
# Clear and reinstall
cd front-end
rm -rf node_modules package-lock.json
npm install
npm start
```

### CORS Errors
- Make sure backend .env has: `FRONTEND_URL=http://localhost:3000`
- Restart backend after changing .env

### Can't See OTP
- Check backend terminal (not frontend)
- OTP is logged with green text and 🔐 emoji
- Also returned in API response in dev mode

## ✅ Success Checklist

- [ ] Backend running on port 5001
- [ ] Frontend running on port 3000
- [ ] Can request OTP for phone number
- [ ] OTP appears in backend terminal
- [ ] Can verify OTP successfully
- [ ] Redirected to home page after login
- [ ] Can see user profile
- [ ] Can switch languages
- [ ] Can logout and login again
- [ ] Token persists on page refresh

## 📝 Notes

- **Port Changed:** Using 5001 instead of 5000 (macOS uses 5000)
- **No Real SMS:** OTP prints to console in development
- **JWT Token:** Valid for 7 days
- **OTP Expiry:** 5 minutes
- **Rate Limiting:** 100 requests per 15 minutes

---

**Everything is working! Happy testing! 🚀**
