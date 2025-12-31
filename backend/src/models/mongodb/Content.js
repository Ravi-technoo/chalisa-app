const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['aarti', 'chalisa'],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      required: true,
      default: 'hi',
    },
    bodyText: {
      type: String,
      required: true,
    },
    meaningText: {
      type: String,
      default: '',
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
      comment: 'User ID of Pandit who created this',
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
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for search
contentSchema.index({ title: 'text', bodyText: 'text', meaningText: 'text' });
contentSchema.index({ type: 1, language: 1 });
contentSchema.index({ isActive: 1 });

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
