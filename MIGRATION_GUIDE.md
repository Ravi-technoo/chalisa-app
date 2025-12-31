# Hanuman Chalisa Database Migration Guide

This guide explains how to migrate the Hanuman Chalisa data from static files to MongoDB and use the new API-based system.

## Overview

The Hanuman Chalisa data has been migrated from a static JavaScript file to a MongoDB database. This allows:
- **Pandits and Admins** to add/update devotional content in multiple languages
- **Dynamic content management** without code changes
- **Support for multiple content types**: Chalisa, Aarti, Ramayan, Mahabharat
- **Multi-language support** with structured verse-based content

## What's Changed

### Backend Changes

1. **Updated MongoDB Content Schema** ([backend/src/models/mongodb/Content.js](backend/src/models/mongodb/Content.js))
   - Added `contentId` field for unique content identification
   - Added `doha` schema for opening/closing verses
   - Added `chaupai` array for verses with meanings
   - Support for both structured (chalisa) and simple (aarti) content types

2. **New API Endpoint**
   - `GET /api/v1/content/by-content-id/:contentId?language=hi` - Fetch content by contentId and language

3. **Updated Content Controller** ([backend/src/controllers/contentController.js](backend/src/controllers/contentController.js))
   - Enhanced validation for chalisa-type content
   - Support for doha and chaupai fields
   - Better error handling for duplicate content

4. **Migration Script** ([backend/src/scripts/migrateHanumanChalisa.js](backend/src/scripts/migrateHanumanChalisa.js))
   - Transfers Hanuman Chalisa data from static file to MongoDB
   - Creates both Hindi and English versions

### Frontend Changes

1. **Updated ContentViewer** ([front-end/src/pages/ContentViewer.jsx](front-end/src/pages/ContentViewer.jsx))
   - Now fetches content from API instead of static file
   - Added loading and error states
   - Dynamic content rendering based on type

2. **Enhanced ContentCreate** ([front-end/src/pages/Content/ContentCreate.jsx](front-end/src/pages/Content/ContentCreate.jsx))
   - Form now supports creating Chalisa with verses
   - Dynamic form fields based on content type
   - Add/remove verses functionality
   - Support for doha (opening/closing verses)
   - Tags and metadata support

## Step-by-Step Migration Process

### Step 1: Ensure Backend is Running

Make sure your backend server and MongoDB are running:

```bash
cd backend
npm install
npm start
```

The backend should start on `http://localhost:5001`

### Step 2: Run the Migration Script

Execute the migration script to transfer Hanuman Chalisa data to MongoDB:

```bash
cd backend
node src/scripts/migrateHanumanChalisa.js
```

Expected output:
```
✓ Connected to MongoDB
✓ Hindi Hanuman Chalisa migrated successfully
✓ English Hanuman Chalisa migrated successfully

✓ Migration completed successfully!
  - Hindi version ID: 67a1b2c3d4e5f6g7h8i9j0k1
  - English version ID: 67a1b2c3d4e5f6g7h8i9j0k2
```

If content already exists:
```
⚠ Hanuman Chalisa already exists in database. Skipping migration.
If you want to re-migrate, please delete existing records first.
```

### Step 3: Verify Data in MongoDB

Connect to MongoDB and verify the data:

```bash
mongosh mongodb://localhost:27017/chalisa_content
```

```javascript
// List all content
db.contents.find({ contentId: 'hanuman-chalisa' }).pretty()

// Count verses in Hindi version
db.contents.findOne({ contentId: 'hanuman-chalisa', language: 'hi' }).chaupai.length
// Should return: 40

// Check a sample verse
db.contents.findOne({ contentId: 'hanuman-chalisa', language: 'hi' }).chaupai[0]
```

### Step 4: Test the API

Test the new API endpoint using curl or Postman:

```bash
# Get Hindi version
curl -X GET 'http://localhost:5001/api/v1/content/by-content-id/hanuman-chalisa?language=hi' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'

# Get English version
curl -X GET 'http://localhost:5001/api/v1/content/by-content-id/hanuman-chalisa?language=en' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

### Step 5: Start the Frontend

```bash
cd front-end
npm install
npm start
```

The frontend should start on `http://localhost:3000`

### Step 6: Test the Frontend

1. **Login** with your credentials
2. **Navigate** to Home page and click on "Hanuman Chalisa"
3. **Verify** that content loads from the API (not the static file)
4. **Test** language toggle (Hindi ↔ English)
5. **Test** font size controls
6. **Test** meaning toggle

## Creating New Content (For Pandits/Admins)

### Using the UI

1. Login as PANDIT or ADMIN user
2. Navigate to `/content/create`
3. Fill in the form:
   - **Content Type**: Select Chalisa, Aarti, etc.
   - **Content ID**: e.g., `ganesh-chalisa` (unique identifier)
   - **Language**: Select Hindi or English
   - **Title**: Display title (e.g., "गणेश चालीसा")
   - **Description**: Brief description
   - **Tags**: comma-separated (e.g., ganesh, chalisa, devotional)

For **Chalisa** type:
- Fill in Opening and Closing Doha
- Click "Add Verse" to add each verse (40 verses for a Chalisa)
- For each verse, add the verse text and meaning

For **other types** (Aarti, etc.):
- Fill in Body Text (main content)
- Fill in Meaning Text (optional translation)

4. Click "Create Content"

### Using the API

```bash
curl -X POST 'http://localhost:5001/api/v1/content/create' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "chalisa",
    "contentId": "ganesh-chalisa",
    "title": "गणेश चालीसा",
    "language": "hi",
    "doha": {
      "opening": "जय गणपति सदगुण सदन...",
      "closing": "जो यह पढ़े..."
    },
    "chaupai": [
      {
        "verse": "जय गणेश जय गणेश जय गणेश देवा।\nमाता जाकी पार्वती पिता महादेवा॥",
        "meaning": "गणेश जी की जय हो..."
      }
    ],
    "isPremium": false,
    "metadata": {
      "description": "श्री गणेश चालीसा",
      "tags": ["ganesh", "chalisa", "devotional"]
    }
  }'
```

## Database Schema

### Content Model

```javascript
{
  type: 'chalisa' | 'aarti' | 'ramayan' | 'mahabharat',
  contentId: 'hanuman-chalisa', // Unique identifier
  title: 'हनुमान चालीसा',
  language: 'hi' | 'en',

  // For structured content (Chalisa)
  doha: {
    opening: 'श्रीगुरु चरन सरोज रज...',
    closing: 'पवनतनय संकट हरन...'
  },
  chaupai: [
    {
      verse: 'जय हनुमान ज्ञान गुन सागर...',
      meaning: 'हनुमान जी की जय हो...'
    }
  ],

  // For simple content (Aarti)
  bodyText: 'Main content text',
  meaningText: 'Translation/meaning',

  // Common fields
  audioUrl: 'https://...mp3',
  imageUrl: 'https://...jpg',
  createdBy: 'user-id',
  isPremium: false,
  isActive: true,
  metadata: {
    description: 'Brief description',
    tags: ['tag1', 'tag2'],
    duration: 300,
    artist: 'Artist name'
  },
  createdAt: '2025-12-31T00:00:00.000Z',
  updatedAt: '2025-12-31T00:00:00.000Z'
}
```

## API Endpoints

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/content/list` | List all content | ✓ | USER |
| GET | `/content/by-content-id/:contentId?language=hi` | Get content by ID and language | ✓ | USER |
| GET | `/content/:id` | Get content by MongoDB ID | ✓ | USER |
| POST | `/content/create` | Create new content | ✓ | PANDIT, ADMIN |
| PUT | `/content/update/:id` | Update content | ✓ | PANDIT, ADMIN |
| DELETE | `/content/delete/:id` | Soft delete content | ✓ | PANDIT, ADMIN |

## Troubleshooting

### Issue: "Content not found" error

**Solution**: Make sure you've run the migration script and the content exists in MongoDB.

```bash
# Check if content exists
mongosh mongodb://localhost:27017/chalisa_content
db.contents.find({ contentId: 'hanuman-chalisa' }).count()
# Should return: 2 (Hindi and English versions)
```

### Issue: "Failed to fetch content" error

**Solution**:
1. Check if backend is running: `curl http://localhost:5001/health`
2. Verify your JWT token is valid
3. Check browser console for detailed error messages

### Issue: Migration script fails with "Duplicate key error"

**Solution**: Content already exists. To re-migrate:

```javascript
// Delete existing content
mongosh mongodb://localhost:27017/chalisa_content
db.contents.deleteMany({ contentId: 'hanuman-chalisa' })
```

Then run the migration script again.

### Issue: "Premium content - unlock required"

**Solution**: The content is marked as premium. Either:
1. Update the content to set `isPremium: false`
2. Or complete the payment flow to unlock premium features

## Next Steps

1. ✅ Run the migration script
2. ✅ Test the API endpoints
3. ✅ Test the frontend ContentViewer
4. ✅ Create sample content using the ContentCreate form
5. Add audio files to content (use the upload API)
6. Create content in multiple languages
7. Add more devotional content (Ganesh Chalisa, Aarti, etc.)

## Support

If you encounter any issues:
1. Check the console logs (both frontend and backend)
2. Verify MongoDB connection
3. Ensure all environment variables are set correctly
4. Check user role (PANDIT or ADMIN) for content creation

---

**Created**: December 31, 2025
**Author**: Claude Code Migration Assistant
