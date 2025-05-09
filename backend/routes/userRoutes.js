const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  addToWishlist,
  removeFromWishlist,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(registerUser);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route('/wishlist').put(protect, addToWishlist);
router.route('/wishlist/:id').delete(protect, removeFromWishlist);

module.exports = router;