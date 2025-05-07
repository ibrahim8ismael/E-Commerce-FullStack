const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  likeProduct,
  createProductReview,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
router.route('/:id/like').put(protect, likeProduct);
router.route('/:id/reviews').post(protect, createProductReview);

module.exports = router;