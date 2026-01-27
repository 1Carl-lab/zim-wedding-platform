const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const AdCampaign = require('../models/AdCampaign');

// Process payment with Stripe (placeholder implementation)
const processStripePayment = async (req, res) => {
  try {
    const { campaignId, amount, paymentMethodId } = req.body;
    
    // Validate campaign exists
    const campaign = await AdCampaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }
    
    // Placeholder for Stripe payment intent
    // In production, implement actual Stripe payment processing
    const paymentIntent = {
      id: `pi_placeholder_${Date.now()}`,
      amount: amount * 100, // Stripe uses cents
      currency: 'usd',
      status: 'succeeded',
      // In production:
      // const paymentIntent = await stripe.paymentIntents.create({
      //   amount: amount * 100,
      //   currency: 'usd',
      //   payment_method: paymentMethodId,
      //   confirm: true
      // });
    };
    
    // Update campaign payment status
    campaign.paymentStatus = 'paid';
    campaign.paymentTransactionId = paymentIntent.id;
    campaign.status = 'active';
    await campaign.save();
    
    res.json({
      success: true,
      message: 'Payment processed successfully',
      paymentIntent: {
        id: paymentIntent.id,
        status: paymentIntent.status
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing Stripe payment',
      error: error.message
    });
  }
};

// Process payment with Paynow (placeholder implementation)
const processPaynowPayment = async (req, res) => {
  try {
    const { campaignId, amount, email } = req.body;
    
    // Validate campaign exists
    const campaign = await AdCampaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }
    
    // Placeholder for Paynow integration
    // In production, implement actual Paynow payment processing
    const paynowResponse = {
      success: true,
      reference: `PAYNOW_${Date.now()}`,
      pollUrl: `https://example.com/poll/${Date.now()}`,
      redirectUrl: `https://example.com/pay/${Date.now()}`,
      // In production:
      // const paynow = new Paynow(
      //   process.env.PAYNOW_INTEGRATION_ID,
      //   process.env.PAYNOW_INTEGRATION_KEY
      // );
      // const payment = paynow.createPayment(campaign._id, email);
      // payment.add('Ad Campaign Payment', amount);
      // const response = await paynow.send(payment);
    };
    
    // Update campaign with payment reference
    campaign.paymentTransactionId = paynowResponse.reference;
    campaign.paymentStatus = 'pending'; // Will be updated via webhook
    await campaign.save();
    
    res.json({
      success: true,
      message: 'Payment initiated successfully',
      redirectUrl: paynowResponse.redirectUrl,
      pollUrl: paynowResponse.pollUrl
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing Paynow payment',
      error: error.message
    });
  }
};

// Webhook handler for Paynow status updates
const paynowWebhook = async (req, res) => {
  try {
    const { reference, status } = req.body;
    
    // Find campaign by payment reference
    const campaign = await AdCampaign.findOne({ 
      paymentTransactionId: reference 
    });
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }
    
    // Update payment status based on Paynow response
    if (status === 'Paid') {
      campaign.paymentStatus = 'paid';
      campaign.status = 'active';
    } else if (status === 'Cancelled') {
      campaign.paymentStatus = 'failed';
    }
    
    await campaign.save();
    
    res.json({
      success: true,
      message: 'Webhook processed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing webhook',
      error: error.message
    });
  }
};

// Get payment status
const getPaymentStatus = async (req, res) => {
  try {
    const campaign = await AdCampaign.findById(req.params.campaignId);
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        campaignId: campaign._id,
        paymentStatus: campaign.paymentStatus,
        transactionId: campaign.paymentTransactionId,
        budget: campaign.budget
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching payment status',
      error: error.message
    });
  }
};

module.exports = {
  processStripePayment,
  processPaynowPayment,
  paynowWebhook,
  getPaymentStatus
};
