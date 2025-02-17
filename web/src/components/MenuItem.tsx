import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useTranslation } from "react-i18next";
import { CartItem } from "./Cart";

type MenuItemProps = {
  item: {
    name: string;
    price: string;
    description: string;
    image: string;
    _id?: string;
  };
};

export const MenuItem = ({ item }: MenuItemProps) => {
  const [quantity, setQuantity] = useState(0);
  const { toast } = useToast();
  const { t } = useTranslation();

  // Define a mapping of product names to image URLs
  const productImages: { [key: string]: string } = {
    "Espresso": "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=500&h=500&fit=crop",
    "Cappuccino": "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&h=500&fit=crop",
    "Latte": "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=500&h=500&fit=crop",
    "Americano": "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=500&h=500&fit=crop",
    "Mocha": "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=500&h=500&fit=crop",
    "Tea": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&h=500&fit=crop",
    "Hot Chocolate": "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=500&h=500&fit=crop",
    "Croissant": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&h=500&fit=crop",
    "Muffin": "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&h=500&fit=crop",
    "Cake": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop"
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      // Get existing cart items
      const existingCart = localStorage.getItem('cart');
      const cartItems: CartItem[] = existingCart ? JSON.parse(existingCart) : [];
      
      // Check if item already exists in cart
      const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === item.name);
      
      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        cartItems[existingItemIndex].quantity += quantity;
      } else {
        // Add new item if it doesn't exist
        cartItems.push({
          name: item.name,
          price: item.price,
          quantity: quantity,
          _id: item._id
        });
      }
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(cartItems));

      // Dispatch a custom event to notify the Header component
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'cart',
        newValue: JSON.stringify(cartItems)
      }));

      toast({
        title: t("menu.addedToCart"),
        description: t("menu.itemsAdded", { 
          quantity, 
          name: item.name
        }),
      });
      
      setQuantity(0);
    }
  };

  // Get the image URL for the current item, or use a default image if not found
  const imageUrl = productImages[item.name] || "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={imageUrl}
          alt={item.name}
          className="w-full md:w-32 h-32 object-cover rounded-lg"
        />
        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">
                {item.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
            <span className="font-medium">${item.price}</span>
          </div>
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(0, quantity - 1))}
                className="h-8 w-8"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="h-8 w-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={handleAddToCart}
              disabled={quantity === 0}
              className="ml-auto"
            >
              {t("menu.addToCart")}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};