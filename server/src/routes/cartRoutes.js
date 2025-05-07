const express = require('express');
const router = express.Router();
const { 
  getCartItems, 
  addToCart, 
  removeFromCart,
  updateCartItem,
  clearCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getCartItems)
  .post(protect, addToCart)
  .delete(protect, clearCart);

router.route('/:id')
  .delete(protect, removeFromCart)
  .put(protect, updateCartItem);

module.exports = router;