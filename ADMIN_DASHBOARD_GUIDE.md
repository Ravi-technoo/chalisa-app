# 🎛️ Admin Dashboard - Complete Guide

## Overview

The Admin Dashboard is a comprehensive management system for the Chalisa App, allowing administrators to:
- 📊 View and manage all registered users
- 📚 Upload and manage devotional content
- 👥 Assign roles (USER, PANDIT, ADMIN)
- 💎 Grant premium access to users
- 📈 View platform statistics

---

## 🚀 Quick Start

### Step 1: Upgrade a User to ADMIN

First, you need at least one ADMIN user. Run this command:

```bash
psql -h localhost -p 5433 -U ravikumar -d chalisa_app -c \
  "UPDATE users SET role = 'ADMIN' WHERE phone = '1234567890';"
```

### Step 2: Login as ADMIN

1. Open http://localhost:3000
2. Login with the upgraded admin phone number
3. You'll see a **👑 Admin** button in the navbar

### Step 3: Access Dashboard

Click the **👑 Admin** button in the navbar or navigate to:
```
http://localhost:3000/admin/dashboard
```

---

## 📱 Dashboard Features

### 1. Admin Dashboard Home
**Route:** `/admin/dashboard`

Four main sections:

#### 👥 Manage Users
- View all registered users
- Edit user roles (USER → PANDIT → ADMIN)
- Grant/revoke premium access
- View user statistics

#### 📚 Manage Content
- View all devotional content
- Filter by type, language
- Edit or delete content
- See content statistics

#### ➕ Create Content
- Add new devotional content
- Support for multiple languages
- Chalisa with verses or simple text content

#### 📊 Analytics
- View user statistics
- Content performance metrics
- Growth trends

---

## 👥 User Management

### Accessing User Management
`/admin/users`

### Features

**User List Table:**
| Field | Description |
|-------|-------------|
| User | Name and user ID |
| Phone | Phone number |
| Role | USER / PANDIT / ADMIN |
| Language | Preferred language (हिं / EN) |
| Premium | Premium status (✓ / ✗) |
| Joined | Registration date |
| Actions | Edit button |

**Quick Stats:**
- Total users
- Admins count
- Pandits count
- Regular users count
- Premium users count

### Editing a User

1. Click the **Edit** icon (✏️) next to any user
2. Modal opens with:
   - **Role Selection:** Choose USER, PANDIT, or ADMIN
   - **Premium Status:** Toggle between Free/Premium
3. Click **Save Changes**

**Role Descriptions:**
- **👤 USER:** Regular user, can view content
- **📿 PANDIT:** Can create and manage own content
- **👑 ADMIN:** Full access to all features

### Search & Filter

- **Search bar:** Search by phone, name, or role
- **Refresh button:** Reload user list
- Real-time filtering

---

## 📚 Content Management

### Accessing Content Management
`/admin/content`

### Features

**Content List Table:**
| Field | Description |
|-------|-------------|
| Content | Title and content ID |
| Type | Chalisa / Aarti / Ramayan / Mahabharat |
| Language | Hindi or English |
| Premium | Free or Premium content |
| Verses | Has verses (✓) or plain text (-) |
| Created | Creation date |
| Actions | View / Edit / Delete |

**Filters:**
- **Search:** By title or content ID
- **Type Filter:** All / Chalisa / Aarti / Ramayan / Mahabharat
- **Language Filter:** All / Hindi / English

### Managing Content

**View Content:**
- Click the eye icon (👁️) to view content as users see it

**Edit Content:**
- Click the edit icon (✏️) to modify content
- Update title, verses, meanings, etc.

**Delete Content:**
- Click the delete icon (🗑️)
- Confirmation dialog appears
- Soft delete (content becomes inactive)

**Create New Content:**
- Click **Create New** button
- Redirects to content creation form

---

## ➕ Creating Devotional Content

### Route
`/content/create`

### Content Types

#### 1. Chalisa (चालीसा)
Structured content with verses:
- **Content ID:** `ganesh-chalisa`
- **Title:** `गणेश चालीसा`
- **Language:** Hindi or English
- **Opening Doha:** Opening verse
- **Closing Doha:** Closing verse
- **Chaupai (Verses):** Add 40 verses with meanings
  - Click "Add Verse" for each verse
  - Enter verse text and meaning
  - Remove verses with delete button

#### 2. Aarti (आरती)
Simple text content:
- **Content ID:** `ganesh-aarti`
- **Title:** `गणेश आरती`
- **Body Text:** Complete aarti text
- **Meaning Text:** Translation/explanation

#### 3. Ramayan / Mahabharat
Similar to Aarti - text-based content

### Form Fields

**Required Fields:**
- Content Type (dropdown)
- Content ID (unique identifier, lowercase-with-hyphens)
- Title (display title in selected language)
- Language (Hindi / English)

**Optional Fields:**
- Description
- Tags (comma-separated)
- Premium Content toggle

**For Chalisa:**
- Opening Doha
- Closing Doha
- Verses (minimum 1, typically 40)

**For Others:**
- Body Text
- Meaning Text

### Example: Creating Ganesh Chalisa

```javascript
Content Type: Chalisa (चालीसा)
Content ID: ganesh-chalisa
Title: गणेश चालीसा
Language: हिन्दी (Hindi)
Description: श्री गणेश चालीसा
Tags: ganesh, chalisa, devotional
Premium: No

Opening Doha:
जय गणेश जय गणेश जय गणेश देवा।
माता जाकी पार्वती पिता महादेवा॥

Verse 1:
  Verse: एक दंत दयावंत चार भुजाधारी...
  Meaning: गणेश जी एक दांत वाले, दयालु...

[Continue adding all verses...]

Closing Doha:
जो यह पढ़े गणेश चालीसा...
```

---

## 🔒 Role-Based Access Control

### Permission Matrix

| Feature | USER | PANDIT | ADMIN |
|---------|------|--------|-------|
| View Content | ✅ | ✅ | ✅ |
| Create Content | ❌ | ✅ | ✅ |
| Edit Own Content | ❌ | ✅ | ✅ |
| Edit Any Content | ❌ | ❌ | ✅ |
| Delete Own Content | ❌ | ✅ | ✅ |
| Delete Any Content | ❌ | ❌ | ✅ |
| View Users | ❌ | ❌ | ✅ |
| Edit Users | ❌ | ❌ | ✅ |
| Access Admin Dashboard | ❌ | ❌ | ✅ |
| Unlock Premium Content | 💰 | ✅ | ✅ |

**Legend:**
- ✅ Allowed
- ❌ Denied
- 💰 Requires Payment

### Route Protection

**Frontend:**
- Admin routes check `user.role === 'ADMIN'`
- Automatic redirect to home if unauthorized
- Admin button only visible to admins

**Backend:**
- `authMiddleware` validates JWT token
- `roleMiddleware('ADMIN')` checks admin role
- Returns 403 Forbidden if unauthorized

---

## 📊 API Endpoints

### Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/admin/users` | Get all users | ADMIN |
| GET | `/api/v1/admin/users/stats` | Get user statistics | ADMIN |
| PUT | `/api/v1/admin/users/:id` | Update user role/premium | ADMIN |
| DELETE | `/api/v1/admin/users/:id` | Delete user | ADMIN |

### Example API Calls

**Get All Users:**
```bash
curl http://localhost:5001/api/v1/admin/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Update User Role:**
```bash
curl -X PUT http://localhost:5001/api/v1/admin/users/USER_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "role": "PANDIT",
    "isUnlocked": true
  }'
```

**Get User Statistics:**
```bash
curl http://localhost:5001/api/v1/admin/users/stats \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🎨 User Interface Components

### Dashboard Cards
- **Gradient header** with welcome message
- **4 main action cards:**
  - Manage Users (Blue)
  - Manage Content (Green)
  - Create Content (Orange)
  - Analytics (Purple)
- **Quick overview stats** (in development)

### User Management
- **Search bar** for filtering
- **Statistics chips** showing counts
- **Data table** with user details
- **Edit modal** for role/premium updates
- **Responsive design**

### Content Management
- **Multi-filter system**
- **Color-coded content types**
- **Action buttons** (View/Edit/Delete)
- **Delete confirmation** dialog
- **Real-time search**

---

## 🔧 Technical Implementation

### Frontend Structure
```
front-end/src/pages/Admin/
├── Dashboard.jsx          # Main admin dashboard
├── UserManagement.jsx     # User list & editing
└── ContentManagement.jsx  # Content list & management
```

### Backend Structure
```
backend/src/
├── controllers/
│   └── adminController.js    # Admin API logic
├── routes/
│   └── adminRoutes.js        # Admin routes
└── middlewares/
    └── auth.js               # Role-based protection
```

### State Management
- Redux auth slice stores current user
- Role checked on every protected route
- Automatic logout on 401/403 responses

---

## 🛡️ Security Features

1. **JWT Authentication:** All admin requests require valid token
2. **Role Verification:** Backend validates ADMIN role
3. **Self-Protection:** Admins cannot demote or delete themselves
4. **Audit Logging:** All admin actions logged
5. **Input Validation:** Sanitized user inputs
6. **SQL Injection Prevention:** Sequelize parameterized queries

---

## 📈 Future Enhancements

- [ ] Analytics dashboard with charts
- [ ] Bulk user operations
- [ ] Content versioning
- [ ] Activity logs viewer
- [ ] Email notifications
- [ ] Export user/content data
- [ ] Advanced search filters
- [ ] Content scheduling
- [ ] User activity tracking
- [ ] Performance metrics

---

## 🐛 Troubleshooting

### Issue: "Access Denied" when accessing admin pages

**Solution:**
1. Verify user role in database:
   ```sql
   SELECT phone, role FROM users WHERE phone = 'YOUR_PHONE';
   ```
2. Ensure role is 'ADMIN'
3. Logout and login again to refresh token

### Issue: Admin button not showing in navbar

**Solution:**
1. Check if logged in user has role = 'ADMIN'
2. Clear browser cache
3. Check Redux state in DevTools

### Issue: Cannot update users

**Solution:**
1. Verify backend server is running
2. Check JWT token is valid
3. Ensure you're not trying to edit yourself
4. Check browser console for errors

---

## 📞 Quick Commands

### Upgrade User to ADMIN
```bash
psql -h localhost -p 5433 -U ravikumar -d chalisa_app -c \
  "UPDATE users SET role = 'ADMIN' WHERE phone = '1234567890';"
```

### Create PANDIT User
```bash
psql -h localhost -p 5433 -U ravikumar -d chalisa_app -c \
  "UPDATE users SET role = 'PANDIT' WHERE phone = '7834857008';"
```

### Grant Premium Access
```bash
psql -h localhost -p 5433 -U ravikumar -d chalisa_app -c \
  "UPDATE users SET is_unlocked = true WHERE phone = '1234567890';"
```

### View All Admins
```bash
psql -h localhost -p 5433 -U ravikumar -d chalisa_app -c \
  "SELECT phone, name, role FROM users WHERE role = 'ADMIN';"
```

---

## ✅ Testing Checklist

- [ ] Upgrade user to ADMIN via SQL
- [ ] Login as ADMIN user
- [ ] Verify Admin button appears in navbar
- [ ] Access Admin Dashboard
- [ ] Navigate to User Management
- [ ] Edit a user's role
- [ ] Grant premium access to a user
- [ ] Navigate to Content Management
- [ ] View existing content
- [ ] Create new content (Chalisa)
- [ ] Create new content (Aarti)
- [ ] Edit content
- [ ] Delete content
- [ ] Test all filters and search
- [ ] Verify non-admin users cannot access admin pages

---

**Dashboard Ready!** 🎉

Your admin dashboard is fully functional and ready to manage your devotional content platform!
