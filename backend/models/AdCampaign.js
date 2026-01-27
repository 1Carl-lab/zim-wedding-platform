const mongoose = require('mongoose');

const adCampaignSchema = new mongoose.Schema({
  advertiserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  adType: {
    type: String,
    enum: ['banner', 'sponsored_listing', 'featured_vendor', 'sidebar', 'video'],
    required: true
  },
  adContent: {
    type: String,
    required: true,
    description: 'URL to image, video, or HTML content'
  },
  adPlacement: {
    type: String,
    enum: ['homepage', 'category_page', 'vendor_listing', 'search_results', 'sidebar'],
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 500
  },
  targetURL: {
    type: String,
    description: 'URL where users are directed when clicking the ad'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  budget: {
    type: Number,
    required: true,
    min: 0
  },
  spend: {
    type: Number,
    default: 0,
    min: 0
  },
  impressions: {
    type: Number,
    default: 0,
    min: 0
  },
  clicks: {
    type: Number,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'paused', 'completed', 'rejected'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentTransactionId: {
    type: String
  }
}, {
  timestamps: true
});

// Virtual for CTR (Click-Through Rate)
adCampaignSchema.virtual('ctr').get(function() {
  if (this.impressions === 0) return 0;
  return (this.clicks / this.impressions * 100).toFixed(2);
});

// Virtual for budget remaining
adCampaignSchema.virtual('budgetRemaining').get(function() {
  return this.budget - this.spend;
});

// Method to check if campaign is currently active
adCampaignSchema.methods.isActive = function() {
  const now = new Date();
  return this.status === 'active' && 
         this.startDate <= now && 
         this.endDate >= now &&
         this.spend < this.budget;
};

// Method to record an impression
adCampaignSchema.methods.recordImpression = async function() {
  this.impressions += 1;
  return this.save();
};

// Method to record a click
adCampaignSchema.methods.recordClick = async function() {
  this.clicks += 1;
  return this.save();
};

const AdCampaign = mongoose.model('AdCampaign', adCampaignSchema);

module.exports = AdCampaign;
