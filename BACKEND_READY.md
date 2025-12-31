# ✅ Backend Server Ready & API Testing

## Backend Status: RUNNING ✓

The backend server has been successfully restarted with the updated schema and indexes.

### Server Info
- **Status:** Running
- **Port:** 5001
- **Base URL:** http://localhost:5001
- **API Base:** http://localhost:5001/api/v1
- **Health Check:** http://localhost:5001/api/v1/health ✓

### MongoDB Status
- **Connection:** Active ✓
- **Database:** chalisa_content
- **Collection:** contents
- **Documents:** 2 (Hanuman Chalisa Hindi + English)

### Indexes Created ✓

1. **Text Index** (Full-text search)
   - Fields: title, bodyText, meaningText
   - Language override: 'dummy' (fixed conflict)

2. **Compound Index** (Query optimization)
   - Fields: type, language

3. **Unique Compound Index** (Prevent duplicates)
   - Fields: contentId, language
   - Unique: true

4. **Single Index** (Soft delete support)
   - Field: isActive

---

## API Testing

### Test Without Authentication (Expected: 401)
```bash
curl http://localhost:5001/api/v1/content/by-content-id/hanuman-chalisa?language=en

# Response:
{"error":"No token provided"}
```

### Test With Authentication (Replace YOUR_JWT_TOKEN)

**Get English Version:**
```bash
curl http://localhost:5001/api/v1/content/by-content-id/hanuman-chalisa?language=en \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' | jq .
```

**Get Hindi Version:**
```bash
curl http://localhost:5001/api/v1/content/by-content-id/hanuman-chalisa?language=hi \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' | jq .
```

**Expected Response:**
```json
{
  "content": {
    "_id": "6955077b4d2e790db71f9cca",
    "type": "chalisa",
    "contentId": "hanuman-chalisa",
    "title": "Hanuman Chalisa",
    "language": "en",
    "doha": {
      "opening": "After cleansing the mirror of my mind...",
      "closing": "Son of the Wind, destroyer of sorrows..."
    },
    "chaupai": [
      {
        "verse": "Victory to Hanuman...",
        "meaning": "Salutations to Hanuman..."
      }
      // ... 40 verses total
    ],
    "isPremium": false,
    "isActive": true,
    "createdBy": "system-migration",
    "metadata": {
      "description": "Hanuman Chalisa - Composed by Tulsidas",
      "tags": ["hanuman", "chalisa", "devotional", "english"]
    },
    "createdAt": "2025-12-31T11:23:07.123Z",
    "updatedAt": "2025-12-31T11:23:07.123Z"
  }
}
```

---

## How to Get JWT Token

### Option 1: From Browser DevTools
1. Login to the app at http://localhost:3000
2. Open Browser DevTools (F12)
3. Go to Application/Storage → Local Storage
4. Find the `token` or `auth` key
5. Copy the JWT token value

### Option 2: From Browser Console
```javascript
// In browser console after login:
localStorage.getItem('token')
// or
JSON.parse(localStorage.getItem('auth')).token
```

### Option 3: Login via API
```bash
# Step 1: Request OTP
curl -X POST http://localhost:5001/api/v1/auth/request-otp \
  -H 'Content-Type: application/json' \
  -d '{"phone":"9876543210"}'

# Response will include OTP in development mode
# {"message":"OTP sent successfully","otp":"123456"}

# Step 2: Verify OTP
curl -X POST http://localhost:5001/api/v1/auth/verify-otp \
  -H 'Content-Type: application/json' \
  -d '{"phone":"9876543210","otp":"123456"}'

# Response:
# {
#   "message": "Login successful",
#   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#   "user": {...}
# }
```

---

## Frontend Testing

Now that the backend is ready, test the frontend:

1. **Refresh the frontend** at http://localhost:3000
2. **Login** with your credentials
3. **Click "Hanuman Chalisa"** on the home page
4. **Verify:**
   - Content loads from database (check Network tab)
   - 40 verses display correctly
   - Opening and closing doha show
   - Language toggle works (Hindi ↔ English)
   - Font size controls work
   - Meaning toggle works

### Check Network Tab
In Browser DevTools → Network tab, you should see:
```
Request URL: http://localhost:5001/api/v1/content/by-content-id/hanuman-chalisa?language=en
Status: 200 OK
```

---

## Verify Migration Data

```bash
# Count documents
mongosh mongodb://localhost:27017/chalisa_content --eval "db.contents.find({ contentId: 'hanuman-chalisa' }).count()"
# Expected: 2

# Check Hindi verses
mongosh mongodb://localhost:27017/chalisa_content --eval "db.contents.findOne({ contentId: 'hanuman-chalisa', language: 'hi' }).chaupai.length"
# Expected: 40

# Check English verses
mongosh mongodb://localhost:27017/chalisa_content --eval "db.contents.findOne({ contentId: 'hanuman-chalisa', language: 'en' }).chaupai.length"
# Expected: 40

# View sample verse
mongosh mongodb://localhost:27017/chalisa_content --eval "db.contents.findOne({ contentId: 'hanuman-chalisa', language: 'hi' }).chaupai[0]"
```

---

## Server Logs

View real-time backend logs:
```bash
tail -f /tmp/backend.log
```

Stop the backend:
```bash
pkill -f "node.*src/server.js"
```

Restart the backend:
```bash
cd "/Users/ravikumar/Desktop/work-stations/Chalisa App/chalisa-app/backend"
npm start
```

---

## ✅ Checklist

- [x] Backend server running on port 5001
- [x] MongoDB connected to chalisa_content database
- [x] Migration completed (2 documents created)
- [x] Indexes created and optimized
- [x] API endpoint responding correctly
- [x] Authentication middleware working
- [ ] Frontend tested with database data
- [ ] Language toggle tested
- [ ] All 40 verses displaying correctly

---

**Status:** Backend is ready and waiting for frontend requests!

**Next Step:** Test the frontend at http://localhost:3000 and verify the Hanuman Chalisa loads from the database.
