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
  };
};

export const MenuItem = ({ item }: MenuItemProps) => {
  const [quantity, setQuantity] = useState(0);
  const { toast } = useToast();
  const { t } = useTranslation();

  // Convert item name to lowercase for consistent translation lookup
  const itemKey = item.name.toLowerCase().replace(/([A-Z])/g, " $1").trim().replace(/\s+/g, "");

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
          quantity: quantity
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
          name: t(`menu.items.${itemKey}`)
        }),
      });
      
      setQuantity(0);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={item.image}
          alt={t(`menu.items.${itemKey}`)}
          className="w-full md:w-32 h-32 object-cover rounded-lg"
        />
        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">
                {t(`menu.items.${itemKey}`)}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t(`menu.descriptions.${itemKey}`)}
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