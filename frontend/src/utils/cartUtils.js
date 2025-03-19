export const calculateCartTotal = (cart) => {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const taxPrice = subtotal * 0.1; // Assuming 10% tax
    const shippingPrice = subtotal > 500 ? 0 : 50; // Free shipping for orders over $500
    const totalPrice = subtotal + taxPrice + shippingPrice;
  
    return { totalItems, subtotal, taxPrice, shippingPrice, totalPrice };
  };
  