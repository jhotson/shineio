import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validate.js';
import { ListingsService } from '../services/listings.js';

const router = express.Router();
const listingsService = new ListingsService();

// Get all listings
router.get('/', async (req, res) => {
  const listings = await listingsService.getAllListings();
  res.json(listings);
});

// Get user's listings
router.get('/user', async (req, res) => {
  const userId = req.auth.sub;
  const listings = await listingsService.getUserListings(userId);
  res.json(listings);
});

// Get single listing
router.get('/:id', 
  param('id').isInt(),
  validateRequest,
  async (req, res) => {
    const listing = await listingsService.getListing(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json(listing);
  }
);

// Create listing
router.post('/',
  [
    body('name').trim().notEmpty(),
    body('description').trim().optional(),
    body('price').isFloat({ min: 0 }),
    body('images').isArray(),
  ],
  validateRequest,
  async (req, res) => {
    const userId = req.auth.sub;
    const listing = await listingsService.createListing({
      ...req.body,
      userId
    });
    res.status(201).json(listing);
  }
);

// Update listing
router.put('/:id',
  [
    param('id').isInt(),
    body('name').trim().optional(),
    body('description').trim().optional(),
    body('price').isFloat({ min: 0 }).optional(),
    body('isActive').isBoolean().optional(),
  ],
  validateRequest,
  async (req, res) => {
    const userId = req.auth.sub;
    const listing = await listingsService.updateListing(req.params.id, userId, req.body);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json(listing);
  }
);

// Delete listing
router.delete('/:id',
  param('id').isInt(),
  validateRequest,
  async (req, res) => {
    const userId = req.auth.sub;
    const success = await listingsService.deleteListing(req.params.id, userId);
    if (!success) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.status(204).send();
  }
);

export { router as listingsRouter };