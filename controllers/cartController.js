// controllers/cartController.js
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // Assuming the user is logged in and we have access to userId

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product already exists in the user's cart
    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += quantity; // Update quantity if product is already in cart
      await cartItem.save();
      return res.status(200).json({ message: 'Product quantity updated', cartItem });
    } else {
      // Add new product to cart
      const newCartItem = new Cart({ userId, productId, quantity });
      await newCartItem.save();
      return res.status(201).json({ message: 'Product added to cart', newCartItem });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// controllers/cartController.js
export const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity) {
      return res.status(400).json({ message: 'Quantity is required' });
    }

    const cartItem = await Cart.findById(id);

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    return res.status(200).json({ message: 'Cart updated', cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// controllers/cartController.js
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await Cart.findByIdAndDelete(id);

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    return res.status(200).json({ message: 'Product removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

