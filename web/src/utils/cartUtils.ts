/* eslint-disable @typescript-eslint/no-explicit-any */
import { CartItem } from "@/components/Cart";

export const createOrderItems = (items: CartItem[], goodsData: any[]) => {
  return items.map(item => {
    const good = goodsData.find(g => 
      g.good_name.toLowerCase().replace(/\s+/g, '') === 
      item.name.toLowerCase().replace(/\s+/g, '')
    );

    if (!good) {
      throw new Error(`Product not found: ${item.name}`);
    }

    return {
      productId: good._id,
      quantity: item.quantity,
      price: parseFloat(item.price),
      subtotal: item.quantity * parseFloat(item.price) // Adăugăm subtotal
    };
  });
};

export const submitOrder = async (orderData: any) => {
  try {
    const response = await fetch('http://localhost:4000/api/orders', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit order');
    }

    return response.json();
  } catch (error) {
    console.error('Submit order error:', error);
    throw error;
  }
};


export const formatProductName = (name: string): string => {
  // Convert names like "latte_special_fito" to "Latte Special Fito"
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};