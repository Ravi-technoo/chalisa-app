# 📊 Chalisa App - User Statistics

**Generated:** December 31, 2025

---

## Overview

### Total Users: **3**

All users registered within the last 7 days (recent signups).

---

## User Demographics

### 👥 By Role
| Role | Count | Percentage |
|------|-------|------------|
| USER | 3 | 100% |
| PANDIT | 0 | 0% |
| ADMIN | 0 | 0% |

**Note:** No PANDIT or ADMIN users exist yet. You'll need to manually update a user's role to enable content management features.

### 🌐 By Language Preference
| Language | Count | Percentage |
|----------|-------|------------|
| Hindi (hi) | 2 | 67% |
| English (en) | 1 | 33% |

### 💎 Premium vs Free
| User Type | Count | Percentage |
|-----------|-------|------------|
| Free | 3 | 100% |
| Premium | 0 | 0% |

**Note:** All users are on free tier. Premium unlock available via payment (₹10).

---

## User Details

| Phone | Name | Role | Language | Premium | Joined |
|-------|------|------|----------|---------|--------|
| 1234567890 | Ravi Kumar | USER | Hindi | ✗ | 2025-12-30 23:07 |
| 7834857008 | ravi | USER | English | ✗ | 2025-12-30 23:00 |
| 9876543210 | *(no name)* | USER | Hindi | ✗ | 2025-12-30 22:54 |

**User IDs:**
- 3e4f27d8-a2c2-4a69-a45f-3a6965480c60
- 4796f4bd-b7e4-48ff-8ca8-f2ac0756b648
- b41b830c-a513-4d43-a656-1f01d0d388b8

---

## Activity Metrics

### 🆕 Recent Signups
- **Last 7 days:** 3 users
- **Last 24 hours:** 0 users
- **Growth rate:** New app (baseline being established)

### 🔐 Authentication
- All users registered via OTP authentication
- Phone verification required for signup

---

## Content Management Access

### Create PANDIT User
To enable content creation for a user, upgrade their role to PANDIT:

```sql
-- Connect to PostgreSQL
psql -h localhost -p 5433 -U ravikumar -d chalisa_app

-- Upgrade user to PANDIT role (replace phone number)
UPDATE users
SET role = 'PANDIT'
WHERE phone = '1234567890';

-- Verify the change
SELECT phone, role, name FROM users WHERE role = 'PANDIT';
```

### Create ADMIN User
For full administrative access:

```sql
UPDATE users
SET role = 'ADMIN'
WHERE phone = '1234567890';
```

**Permissions:**
- **USER:** Can view content, unlock premium
- **PANDIT:** Can create, update, delete own content
- **ADMIN:** Full access to all content and user management

---

## Database Queries

### Get User Statistics
```sql
-- Total users
SELECT COUNT(*) FROM users;

-- Users by role
SELECT role, COUNT(*) FROM users GROUP BY role;

-- Users by language
SELECT language_pref, COUNT(*) FROM users GROUP BY language_pref;

-- Premium users
SELECT COUNT(*) FROM users WHERE is_unlocked = true;

-- Users registered today
SELECT COUNT(*) FROM users
WHERE created_at >= CURRENT_DATE;
```

### Find Specific User
```sql
-- By phone
SELECT * FROM users WHERE phone = '1234567890';

-- By name
SELECT * FROM users WHERE name ILIKE '%ravi%';

-- By role
SELECT * FROM users WHERE role = 'PANDIT';
```

### Update User
```sql
-- Upgrade to premium
UPDATE users SET is_unlocked = true WHERE phone = '1234567890';

-- Change role to PANDIT
UPDATE users SET role = 'PANDIT' WHERE phone = '1234567890';

-- Update name
UPDATE users SET name = 'Ravi Kumar' WHERE phone = '1234567890';

-- Change language preference
UPDATE users SET language_pref = 'en' WHERE phone = '1234567890';
```

---

## Recommendations

### 1. Create Admin/Pandit Users
Currently, no users can manage content. Recommend:
- Upgrade at least one user to ADMIN role
- Create PANDIT accounts for content contributors

### 2. User Engagement
All 3 users are active (registered in last 1-2 days). Monitor:
- Daily active users
- Content views per user
- Premium conversion rate

### 3. Content Strategy
With database-driven content now available:
- Encourage PANDITs to add more devotional content
- Support multiple languages (currently 67% prefer Hindi)
- Consider premium content to drive conversions

### 4. Analytics to Track
- Login frequency
- Content views
- Language toggle usage
- Premium unlock conversion
- OTP success rate

---

## Next Steps

1. **Assign Roles:**
   ```sql
   -- Make Ravi Kumar an ADMIN
   UPDATE users SET role = 'ADMIN' WHERE phone = '1234567890';
   ```

2. **Test Content Creation:**
   - Login as ADMIN/PANDIT user
   - Navigate to `/content/create`
   - Create sample content (Ganesh Chalisa, Aarti, etc.)

3. **Monitor Growth:**
   - Track new user signups
   - Monitor premium conversions
   - Analyze content engagement

4. **Enable Analytics:**
   - Add user activity tracking
   - Track content views per user
   - Monitor most popular content

---

## Database Schema

### Users Table Structure
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  phone VARCHAR(15) UNIQUE NOT NULL,
  role ENUM('USER', 'PANDIT', 'ADMIN') DEFAULT 'USER',
  name VARCHAR(255),
  profile_image_url TEXT,
  language_pref VARCHAR(10) DEFAULT 'hi',
  is_unlocked BOOLEAN DEFAULT false,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

---

**Report Generated:** December 31, 2025
**Database:** PostgreSQL (chalisa_app)
**Total Users:** 3
**Status:** Active and Growing 📈
