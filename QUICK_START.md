# 🚀 Quick Start - Database Migration

## Step 1: Start Backend & Run Migration

```bash
# Terminal 1: Start Backend
cd "/Users/ravikumar/Desktop/work-stations/Chalisa App/chalisa-app/backend"
npm start

# Terminal 2: Run Migration (after backend starts)
cd "/Users/ravikumar/Desktop/work-stations/Chalisa App/chalisa-app/backend"
node src/scripts/migrateHanumanChalisa.js
```

**✅ Expected Output:**
```
✓ Connected to MongoDB
✓ Hindi Hanuman Chalisa migrated successfully
✓ English Hanuman Chalisa migrated successfully
✓ Migration completed successfully!
```

## Step 2: Start Frontend

```bash
# Terminal 3: Start Frontend
cd "/Users/ravikumar/Desktop/work-stations/Chalisa App/chalisa-app/front-end"
npm install  # Only first time
npm start
```

**✅ Success:** Browser opens at http://localhost:3000

## Step 3: Test the Migration

1. **Login** with your credentials
2. **Click "Hanuman Chalisa"** card on home page
3. **Verify** content loads from database (check Network tab in DevTools)
4. **Toggle** language between Hindi/English
5. **Test** font controls and meaning toggle

---

## 🎯 What Changed?

### Before:
- Hanuman Chalisa stored in static file (`hanumanChalisa.js`)
- Not editable without code changes

### After:
- Hanuman Chalisa stored in MongoDB
- Pandits/Admins can add/update content via UI
- Support for multiple languages and content types

## 📝 Add New Content (Admin/Pandit Only)

1. Navigate to `/content/create`
2. Select content type (Chalisa, Aarti, etc.)
3. Fill in details:
   - Content ID: `ganesh-chalisa`
   - Title: `गणेश चालीसा`
   - Language: Hindi
4. Add verses with meanings
5. Submit

## 🔍 Verify Migration

```bash
# Check MongoDB data
mongosh mongodb://localhost:27017/chalisa_content

# Count documents
db.contents.find({ contentId: 'hanuman-chalisa' }).count()
# Expected: 2 (Hindi + English)

# Check verses
db.contents.findOne({ contentId: 'hanuman-chalisa', language: 'hi' }).chaupai.length
# Expected: 40
```

## 📚 Documentation

- [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) - Detailed migration guide
- API endpoints, database schema, troubleshooting

**Need help?** Check the migration guide or console logs for errors.
