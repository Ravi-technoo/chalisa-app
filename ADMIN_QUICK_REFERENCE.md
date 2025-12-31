# 🎛️ Admin Dashboard - Quick Reference Card

## 🔑 Admin Access

**Login Phone:** `1234567890`
**Role:** ADMIN
**Dashboard:** Click **👑 Admin** button in navbar

---

## 📍 Quick Links

| Feature | URL |
|---------|-----|
| Dashboard | http://localhost:3000/admin/dashboard |
| User Management | http://localhost:3000/admin/users |
| Content Management | http://localhost:3000/admin/content |
| Create Content | http://localhost:3000/content/create |

---

## 👥 User Management Quick Actions

### View All Users
```
Navigate to: /admin/users
```

### Edit User
```
1. Find user in table
2. Click Edit icon (✏️)
3. Change role: USER / PANDIT / ADMIN
4. Toggle premium: Free / Premium
5. Save changes
```

### Upgrade User via SQL
```bash
# Make PANDIT
psql -h localhost -p 5433 -U ravikumar -d chalisa_app -c \
  "UPDATE users SET role = 'PANDIT' WHERE phone = 'PHONE_NUMBER';"

# Make ADMIN
psql -h localhost -p 5433 -U ravikumar -d chalisa_app -c \
  "UPDATE users SET role = 'ADMIN' WHERE phone = 'PHONE_NUMBER';"

# Grant Premium
psql -h localhost -p 5433 -U ravikumar -d chalisa_app -c \
  "UPDATE users SET is_unlocked = true WHERE phone = 'PHONE_NUMBER';"
```

---

## 📚 Content Management Quick Actions

### View Content
```
Navigate to: /admin/content
Filter by Type / Language
Search by title or ID
```

### Create Chalisa
```
1. Click "Create New"
2. Select type: Chalisa
3. Enter content ID: example-chalisa
4. Enter title in Hindi/English
5. Add opening & closing doha
6. Click "Add Verse" for each verse
7. Submit
```

### Create Aarti
```
1. Click "Create New"
2. Select type: Aarti
3. Enter content ID: example-aarti
4. Enter title
5. Paste body text
6. Add meaning (optional)
7. Submit
```

---

## 🎯 User Roles

| Role | Icon | Can Do |
|------|------|--------|
| USER | 👤 | View content, unlock premium |
| PANDIT | 📿 | Create & manage own content |
| ADMIN | 👑 | Full access to everything |

---

## 📊 Current System

### Users
- **Total:** 3 users
- **Admins:** 1 (you!)
- **Pandits:** 0
- **Users:** 2

### Content
- **Hanuman Chalisa:** Hindi + English (migrated)
- **Ready for more:** Create new content

---

## 🔄 Common Tasks

### Make User a Content Creator
```sql
UPDATE users SET role = 'PANDIT' WHERE phone = '7834857008';
```

### Give User Premium Access
```sql
UPDATE users SET is_unlocked = true WHERE phone = '9876543210';
```

### View All Admins
```sql
SELECT phone, name, role FROM users WHERE role = 'ADMIN';
```

### View All Content
```
Navigate to: /admin/content
```

---

## 🚨 Troubleshooting

**Admin button not showing?**
→ Logout, login again, check role in database

**Can't access admin pages?**
→ Verify role = 'ADMIN' in database

**Can't edit user?**
→ Cannot edit yourself, try another user

**Can't delete content?**
→ Check if you're owner or ADMIN

---

## 📞 Support Commands

### Restart Backend
```bash
cd "/Users/ravikumar/Desktop/work-stations/Chalisa App/chalisa-app/backend"
npm start
```

### Check User Roles
```bash
psql -h localhost -p 5433 -U ravikumar -d chalisa_app -c \
  "SELECT phone, name, role FROM users ORDER BY role;"
```

### View Content Count
```bash
mongosh mongodb://localhost:27017/chalisa_content --eval \
  "db.contents.count()"
```

---

## ✅ Feature Checklist

- [x] Admin Dashboard accessible
- [x] User list viewable
- [x] User roles editable
- [x] Content list viewable
- [x] Content creation working
- [x] Content editing enabled
- [x] Content deletion functional
- [x] Search & filters working
- [x] Role-based access enforced
- [x] API endpoints secured

---

**Quick Start:** Login → Click 👑 Admin → Explore! 🎉
