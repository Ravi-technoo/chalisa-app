const mongoose = require('mongoose');

const verseSchema = new mongoose.Schema({
  verse: {
    type: String,
    required: true,
  },
  meaning: {
    type: String,
    default: '',
  },
}, { _id: false });

const dohaSchema = new mongoose.Schema({
  opening: {
    type: String,
    default: '',
  },
  closing: {
    type: String,
    default: '',
  },
}, { _id: false });

const contentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['aarti', 'chalisa', 'ramayan', 'mahabharat'],
      required: true,
    },
    contentId: {
      type: String,
      required: true,
      trim: true,
      comment: 'Unique identifier like hanuman-chalisa, ganesh-aarti',
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      required: true,
      enum: ['hi', 'en', 'bn', 'mr', 'ta', 'te', 'gu', 'kn', 'ml', 'pa', 'or', 'as'],
      default: 'hi',
      comment: 'Language codes: hi=Hindi, en=English, bn=Bengali, mr=Marathi, ta=Tamil, te=Telugu, gu=Gujarati, kn=Kannada, ml=Malayalam, pa=Punjabi, or=Odia, as=Assamese',
    },
    // For simple content like Aarti
    bodyText: {
      type: String,
      default: '',
    },
    meaningText: {
      type: String,
      default: '',
    },
    // For structured content like Chalisa
    doha: {
      type: dohaSchema,
      default: null,
    },
    chaupai: {
      type: [verseSchema],
      default: [],
    },
    audioUrl: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    createdBy: {
      type: String,
      required: true,
      comment: 'User ID of Pandit/Admin who created this',
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    metadata: {
      duration: Number,
      artist: String,
      tags: [String],
      description: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for search and queries
contentSchema.index({ title: 'text', bodyText: 'text', meaningText: 'text' }, { language_override: 'dummy' });
contentSchema.index({ type: 1, language: 1 });
contentSchema.index({ contentId: 1, language: 1 }, { unique: true });
contentSchema.index({ isActive: 1 });

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
