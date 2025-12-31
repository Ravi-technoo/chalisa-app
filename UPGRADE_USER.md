# 🔑 Upgrade User to ADMIN/PANDIT

## Quick Commands

### Make Ravi Kumar an ADMIN
```bash
psql -h localhost -p 5433 -U ravikumar -d chalisa_app -c \
  "UPDATE users SET role = 'ADMIN' WHERE phone = '1234567890'; \
   SELECT phone, role, name FROM users WHERE phone = '1234567890';"
```

### Make any user a PANDIT
```bash
# Replace PHONE_NUMBER with actual phone
psql -h localhost -p 5433 -U ravikumar -d chalisa_app -c \
  "UPDATE users SET role = 'PANDIT' WHERE phone = 'PHONE_NUMBER'; \
   SELECT phone, role, name FROM users WHERE phone = 'PHONE_NUMBER';"
```

### Verify Role Change
```bash
psql -h localhost -p 5433 -U ravikumar -d chalisa_app -c \
  "SELECT phone, role, name, language_pref FROM users ORDER BY created_at DESC;"
```

---

## Step-by-Step Upgrade

### 1. Connect to PostgreSQL
```bash
psql -h localhost -p 5433 -U ravikumar -d chalisa_app
```

### 2. View Current Users
```sql
SELECT phone, role, name FROM users;
```

### 3. Upgrade to ADMIN
```sql
UPDATE users
SET role = 'ADMIN'
WHERE phone = '1234567890';
```

### 4. Verify
```sql
SELECT phone, role, name FROM users WHERE role = 'ADMIN';
```

### 5. Exit
```sql
\q
```

---

## After Upgrading

### Test Content Creation

1. **Login** to the app with the upgraded user (phone: 1234567890)
2. **Navigate** to `/content/create`
3. **You should now see** the content creation form
4. **Try creating** a new devotional content:
   - Content ID: `ganesh-chalisa`
   - Title: `गणेश चालीसा`
   - Language: Hindi
   - Type: Chalisa
   - Add verses with meanings

### Test Permissions

**ADMIN can:**
- ✓ View all content
- ✓ Create new content
- ✓ Update any content (even created by others)
- ✓ Delete any content
- ✓ Access `/content/create` page

**PANDIT can:**
- ✓ View all content
- ✓ Create new content
- ✓ Update own content
- ✓ Delete own content
- ✗ Cannot modify content created by others (unless ADMIN)

**USER can:**
- ✓ View content
- ✓ Unlock premium content (via payment)
- ✗ Cannot access `/content/create`
- ✗ Cannot modify content

---

## Quick Reference

| Phone | Current Role | Suggested Upgrade |
|-------|--------------|-------------------|
| 1234567890 | USER | → ADMIN (recommended) |
| 7834857008 | USER | → PANDIT (for testing) |
| 9876543210 | USER | Keep as USER (for testing) |

This setup allows you to test all three role types!

---

## SQL Commands Cheat Sheet

```sql
-- View all users
SELECT phone, role, name FROM users;

-- Make user ADMIN
UPDATE users SET role = 'ADMIN' WHERE phone = '1234567890';

-- Make user PANDIT
UPDATE users SET role = 'PANDIT' WHERE phone = '7834857008';

-- Revert to USER
UPDATE users SET role = 'USER' WHERE phone = '1234567890';

-- Enable premium for user
UPDATE users SET is_unlocked = true WHERE phone = '1234567890';

-- View users by role
SELECT role, COUNT(*) FROM users GROUP BY role;
```

---

## One-Line Upgrade Commands

```bash
# Make 1234567890 an ADMIN
psql -h localhost -p 5433 -U ravikumar -d chalisa_app -c "UPDATE users SET role = 'ADMIN' WHERE phone = '1234567890';"

# Make 7834857008 a PANDIT
psql -h localhost -p 5433 -U ravikumar -d chalisa_app -c "UPDATE users SET role = 'PANDIT' WHERE phone = '7834857008';"

# Enable premium for 1234567890
psql -h localhost -p 5433 -U ravikumar -d chalisa_app -c "UPDATE users SET is_unlocked = true WHERE phone = '1234567890';"
```

---

**Ready to test?** Upgrade your user to ADMIN and start creating content! 🚀
