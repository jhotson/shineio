import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validate.js';
import { PaymentsService } from '../services/payments.js';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const paymentsService = new PaymentsService();

// Create payment intent
router.post('/create-intent',
  body('amount').isInt({ min: 1 }),
  validateRequest,
  async (req, res) => {
    const { amount } = req.body;
    const userId = req.auth.sub;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: { userId }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  }
);

// Get payment methods
router.get('/methods', async (req, res) => {
  const userId = req.auth.sub;
  const methods = await paymentsService.getPaymentMethods(userId);
  res.json(methods);
});

// Add payment method
router.post('/methods',
  [
    body('paymentMethodId').notEmpty(),
    body('last4').notEmpty(),
    body('brand').notEmpty(),
  ],
  validateRequest,
  async (req, res) => {
    const userId = req.auth.sub;
    const method = await paymentsService.addPaymentMethod(userId, req.body);
    res.status(201).json(method);
  }
);

// Set default payment method
router.put('/methods/:id/default',
  param('id').isInt(),
  validateRequest,
  async (req, res) => {
    const userId = req.auth.sub;
    const method = await paymentsService.setDefaultPaymentMethod(req.params.id, userId);
    res.json(method);
  }
);

// Delete payment method
router.delete('/methods/:id',
  param('id').isInt(),
  validateRequest,
  async (req, res) => {
    const userId = req.auth.sub;
    await paymentsService.deletePaymentMethod(req.params.id, userId);
    res.status(204).send();
  }
);

export { router as paymentsRouter };